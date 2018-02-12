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


class InterfaceController extends Controller {
    public function interfaceGoodsCatagoryAction() {
    	header("Access-Control-Allow-Origin: *");// 跨域请求操作
    	$rm = $this->di->get("rm");//返回到前端的约定规则 。$rm:详见 utils->ResultMessage.php
		$select_rows = json_decode($this->request->get('select_rows'));
		if(($select_rows != null) && (count($select_rows) > 0)){
			$conn	= null;
			$result = "";
			try{
				$conn = MySqlDB::getConnection();
		        $conn->begin();
				if(array_key_exists('id',$select_rows)){
					$sql = "select * from interface_info WHERE interface_info.id=".$select_rows->id;
				}else{
					$sql = "select * from interface_info";
				}
				$result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
				$conn->commit();
				$rm->setMessage($result);
				$rm->setCode(1);// 向前端返回当前行为操作的状态
			}catch(\Exception $ex){
				$conn->rollback();
				$rm->setCode(0);// 向前端返回当前行为操作的状态
				$rm->setMessage($name."失败 ".$ex);
			}finally{
				$conn = null;
			}
		}
		echo $rm->toJson();
    }
}
