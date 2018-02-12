<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Hdb\Controllers;

use Phalcon\Mvc\Controller;
use Hdb\Utils\MySqlDB;
use Phalcon\Db;


class ProductController extends Controller {
    public function productGoodsCatagoryAction() {
    	header("Access-Control-Allow-Origin: *");// 跨域请求操作
    	$rm = $this->di->get("rm");//返回到前端的约定规则 。$rm:详见 utils->ResultMessage.php
    	$result = "";
    	$insert_rows = json_decode($this->request->get('insert_rows'));
    	$delete_rows = json_decode($this->request->get('delete_rows'));
		$update_rows = json_decode($this->request->get('update_rows'));
		$select_rows = json_decode($this->request->get('select_rows'));
		// 当前操作执行哪种行为？
		if(($insert_rows != null) && (count($insert_rows) > 0)){
			$result = $this->utaCtionSheet("增加",$insert_rows,$rm);
		}
		if(($delete_rows != null) && (count($delete_rows) > 0)){
			$result = $this->utaCtionSheet("删除",$delete_rows,$rm);
		}
		if(($update_rows != null) && (count($update_rows) > 0)){
			$result = $this->utaCtionSheet("修改",$update_rows,$rm);
		}
		if(($select_rows != null) && (count($select_rows) > 0)){
			$result = $this->utaCtionSheet("查询",$select_rows,$rm);
		}
		
		echo $rm->toJson();
    }
	// 4中行为的具体操作	(行为，参数，返回到前端的约定规则)  
	function utaCtionSheet($name,$rows,$rm){
		$result = ""; // 行为操作完成时的返回值
		$conn	= null;
		try{
			$conn = MySqlDB::getConnection();
	        $conn->begin();
			if($name == "查询"){
				// 查询当前产品对应的关联规则集数据 ？通过产品id 获取 关联表（group_product）中对应的规则集id，通过查询到的关联规则集id去 规则集表（group）中取到对应的整条数据。
				if(array_key_exists('product_id', $rows)){
					$id = $rows->product_id;
					if($id  == 'group_product'){
						$sql = "select * from group_product";
					}else{
						$sql = "select g.* from product AS p JOIN `group` AS g JOIN group_product AS gp WHERE p.id = $id AND gp.product_id = $id AND g.id = gp.group_id";
					}
					$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
				}else{ // 查询整张表
					$sql = "select * from product";
	            	$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
				}
				$rm->setMessage($result);
			}
			if($name == "增加"){
				// 向product表中添加一条 新创建的产品数据。默认不存在关联规则集
				$obj = $this->formatData($rows);
				$result = $conn->insert("product",$obj['values'],$obj['colums']);
				if($result){
					$id = $conn->lastInsertId(); // 获取当前添加到产品表（product）的主键id
					// newVal:存在当前新创建的产品的关联规则集id数组，  relevance格式：[1,2,3,...]
					if(array_key_exists('newVal', $rows)){
						// 向关联表添加关联字段 (产品id,规则集id,规则集状态,状态代号 )
						$colums = array("product_id","group_id","status");
						for ($i = 0; $i < count($rows->newVal); $i++) {
							$val = array(
								$id,
								$rows->newVal[$i]->id,
								$rows->newVal[$i]->state
							);	
							$result = $conn->insert("group_product",$val,$colums);
			            }
					}
					if($result){
						$rm->setMessage("创建产品成功！");
					}
				}
			}
			if($name == "修改"){
				// 只修改产品表（product）？ 更新所有可修改字段
				$obj = $this->formatData($rows);
				$result = $conn->update("product", $obj['colums'], $obj['values'], "id = ".$rows->product_id);
				if($result){
					// 需要修改关联表（group_product）数据 ?先删除所有关联数据，再增加。 (* 删除所有的关联数据的原因在于：不清楚用户是只修改了当前产品关联规则集的状态，还是直接删除|新增当前产品所关联的规则集)
					if(array_key_exists('associatedData', $rows)){
						$colums = array("product_id","group_id","status");
						// 先删除关联表（group_product）中所有当前产品关联的规则集数据。
						$sql = "delete from group_product WHERE group_product.product_id=".$rows->product_id;
	            		$result = $conn->execute($sql, Db::FETCH_ASSOC);
						// 再将当前产品关联的所有规则集数据添加进关联表（group_product）中。
						for ($i = 0; $i < count($rows->associatedData); $i++) {
							$val = array(
								$rows->product_id,
								$rows->associatedData[$i]->id,
								$rows->associatedData[$i]->state
							);	
							$conn->insert("group_product", $val ,$colums);
			            }
					}
					if($result){
						$rm->setMessage("修改成功!");
					}
				}
			}
			if($name == "删除"){
				// 删除当前产品？ 先删除产品表（product）中的数据，再删除关联表（group_product）中对应的数据。
				$sql = "delete from product WHERE product.id=".$rows->product_id;
        		$result = $conn->execute($sql, Db::FETCH_ASSOC);
			 	if($result){
			 		$sql = "delete from group_product WHERE group_product.product_id=".$rows->product_id;
        			$result = $conn->execute($sql, Db::FETCH_ASSOC);
					if($result){
						$rm->setMessage ("产品删除成功!");
					}
			 	}
			}
			$conn->commit();
			$rm->setCode(1);// 向前端返回当前行为操作的状态
		}catch(Exception $ex){
			$conn->rollback();
			$rm->setCode(0);// 向前端返回当前行为操作的状态
			$rm->setMessage($name."失败 ");
		}finally{
			$conn = null;
		}
	}

	function formatData($data){
		$values = [];
		$colums = [];
		foreach($data as $key=>$value){
			if($key == "associatedData"){
			}else if($key == 'product_id'){
			}else{
				array_push($colums,$key);
				array_push($values,$value);
			}
		}
		$obj = array('colums'=>$colums,'values'=>$values);
		return	$obj;
	}
}
