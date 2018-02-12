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


class RuleController extends Controller {
    public function ruleGoodsCatagoryAction() {
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
				// 查询当前规则对应的关联规则集数据 ？通过规则id 获取 关联表（rule_group）中对应的规则集id，通过查询到的关联规则集id去 规则集表（group）中取到对应的整条数据。
				if(array_key_exists('ruleset_id', $rows)){
					if($rows->ruleset_id == '*'){
						$sql = "select * from rule_group";
	            		$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
					}else{
						$id = $rows->ruleset_id;
						$sql = "select r.*,rg.enabled from rule AS r JOIN `group` AS g JOIN rule_group AS rg WHERE g.id = $id AND rg.group_id = $id AND r.id = rg.rule_id";
						$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
					}
				}else{ // 查询整张表
					if(array_key_exists('rule_id', $rows)){
						$sql = "select * from rule WHERE rule.rule_id = ".$rows->rule_id;
	            		$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
					}else{
						$sql = "select * from rule";
	            		$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
					}
				}
				$rm->setMessage($result);
			}
			if($name == "增加"){
				$obj = $this->formatData($rows);
				//return $rm->setMessage = $obj;
				$result = $conn->insert("rule",$obj['values'],$obj['colums']);
				if($result){
					$id = $conn->lastInsertId();
					$conn->update("rule",["rule_id"],[$id], "id = ".$id);
					$rm->setMessage ("新增成功");
				}
			}
			if($name == "修改"){// 只修改规则表（rule）？ 更新所有可修改字段
				if(array_key_exists('associative_arr', $rows)){ // 将当前规则添加到指定规则集
					$result = $conn->update("group", ['rule_count'], [$rows->rule_count], "id = ".$rows->ruleset_id);
					if($result){
						// 再将当前产品关联的所有规则集数据添加进关联表（group_product）中。
						$colums = array("group_id","rule_id","enabled");
						for ($i = 0; $i < count($rows->associative_arr); $i++) {
							$val = array(
								$rows->ruleset_id,
								$rows->associative_arr[$i]->id,
								$rows->associative_arr[$i]->state
							);	
							$result = $conn->insert("rule_group", $val ,$colums);
			            }
					}
				}else{
					$obj = $this->formatData($rows);
					$result = $conn->update("rule", $obj['colums'], $obj['values'], "id = ".$rows->rule_id);
				}
				if($result){
					$rm->setMessage ("修改成功");
				}
			}
			if($name == "删除"){
				// 删除当前规则？ 先删除规则表（rule）中的数据，再删除关联表（rule_group）中对应的数据。
                $result = $conn->delete("rule","id = ".$rows->id);
				if($result){
					$rm->setMessage ("删除成功");
				}
			}
			$conn->commit();
			$rm->setCode(1);// 向前端返回当前行为操作的状态
		}catch(\Exception $ex){
			$conn->rollback();
			$rm->setCode(0);// 向前端返回当前行为操作的状态
			$rm->setMessage($name."失败 ".$ex);
		}finally{
			$conn = null;
		}
	}
	function formatData($data){
		$values = [];
		$colums = [];
		foreach($data as $key=>$value){
			 if(strlen($value."") == 0){
			 	array_push($values,null);
				array_push($colums,$key);
			 }else{
				array_push($values,$value);
				array_push($colums,$key);
			}
		}
		$obj = array('colums'=>$colums,'values'=>$values);
		return	$obj;
	}
}
