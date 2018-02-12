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


class RulesetController extends Controller {
    public function rulesetGoodsCatagoryAction() {
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
				// 查询当前规则集对应的关联规则数据 ？通过规则集id 获取 关联表（rule_group）中对应的规则id，通过查询到的关联规则id去 规则表（rule）中取到对应的整条数据。
				if(array_key_exists('product_id', $rows)){
					$id = $rows->product_id;
					$sql = "select g.*,gp.status from product AS p JOIN `group` AS g JOIN group_product AS gp WHERE p.id = $id AND gp.product_id = $id AND g.id = gp.group_id";
					$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
				}else{ // 查询整张表
					$sql = "select g.*,gp.status from `group` as g left join group_product as gp on gp.group_id=g.id";
	            	$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
				}
				$rm->setMessage($result);
			}
			if($name == "增加"){// 向group表中添加一条 新创建的规则集数据。默认不存在关联规则
				$obj = $this->formatData($rows);
				$result = $conn->insert("group",$obj['values'],$obj['colums']);
				if($result){
					$id = $conn->lastInsertId();// 获取规则集表中最后一条数据的主键id
					// relevance:存在当前新创建的规则集的关联规则id数组，  relevance格式：[1,2,3,...]
					if(array_key_exists('associatedData', $rows)){
						// 向关联表添加关联字段 (规则集id,规则id,规则状态,状态代号 )
						$colums = array("group_id","rule_id","enabled");
						for ($i = 0; $i < count($rows->associatedData); $i++) {
							$val = array(
								$id,
								$rows->associatedData[$i]->id,
								$rows->associatedData[$i]->enabled
							);
							$result = $conn->insert("rule_group", $val ,$colums);
			            }
					}
				}
				if($result){
					$rm->setMessage ("规则集数据创建成功!");
				}
			}
			if($name == "修改"){
				if(array_key_exists('addToRuleset', $rows)){// 由规则页面添加到某个规则集的操作， 1.修改规则集关联id数组，2.增加关联表数据（rule_group）
					// addToRuleset = {包含的规则个数，包含规则的id（1,2,3,），当前规则集id}；
					//1. 修改规则集表（group）指定数据的 （包含规则个数，包含规则）
					$rulesetId 			= $rows->addToRuleset->ruleset_id;
					$associationRule_id = $rows->addToRuleset->ruleset_list_id;
					$colums = array("rule_count","ruleset_list_id");
					$val 	= array($rows->addToRuleset->rule_count ,implode(",",$associationRule_id));
					$result = $conn->update("group",$colums,$val, "id = ".$rulesetId);
					//2. 向关联表（rule_group）中添加数据
					for($i = 0;$i < count($associationRule_id);$i++){
						$val = array(
							$rulesetId,
							$associationRule_id[$i],
							0
						);
						$colums = array("group_id","rule_id","enabled");
						$result = $conn->insert("rule_group",$val,$colums);
					}
					if($result){
						$rm->setMessage ("成功添加到规则集!");
					}
				}else{
					// 由规则集详情页面 提交的修改数据。 1.修改规则集关联id数据。2.可能会修改关联表（rule_group）	
					$obj = $this->formatData($rows);
//					return $rm->setMessage = $obj;
					$result = $conn->update("group", $obj['colums'], $obj['values'], "id = ".$rows->ruleset_id);
					if($result){
						// 需要修改关联表（group_product）数据 ?先删除所有关联数据，再增加。 (* 删除所有的关联数据的原因在于：不清楚用户是只修改了当前产品关联规则集的状态，还是直接删除|新增当前产品所关联的规则集)
						if(array_key_exists('associatedData', $rows)){
							// 先删除关联表（group_product）中所有当前产品关联的规则集数据。
							$sql = "delete from rule_group WHERE rule_group.group_id=".$rows->ruleset_id;
		            		$result = $conn->execute($sql, Db::FETCH_ASSOC);
							// 再将当前产品关联的所有规则集数据添加进关联表（group_product）中。
							$colums = array("group_id","rule_id","enabled");
							for ($i = 0; $i < count($rows->associatedData); $i++) {
								$val = array(
									$rows->ruleset_id,
									$rows->associatedData[$i]->id,
									$rows->associatedData[$i]->enabled
								);	
								$result = $conn->insert("rule_group", $val ,$colums);
				            }
						}
					}
					if($result){
						$rm->setMessage ("规则集修改成功!");
					}
				}
			}
			if($name == "删除"){
				// 删除当前规则集？ 先删除规则集表（group）中的数据，再删除关联表（rule_group）中对应的数据。
				$result = $conn->delete("group",[$rows->group_id],['id']);
			 	if($result){
			 		$result = $conn->delete("rule_group",[$rows->group_id],['group_id']);
			 	}
				if($result){
					$rm->setMessage ("规则集删除成功!");
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
			if($key == "associatedData"){
			}else if($key == "ruleset_id"){
			}else{
				array_push($colums,$key);
				array_push($values,$value);
			}
		}
		$obj = array('colums'=>$colums,'values'=>$values);
		return	$obj;
	}
}
