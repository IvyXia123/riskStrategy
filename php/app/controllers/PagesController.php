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

class PagesController extends Controller {

    public function indexAction() {
        $page = $this->dispatcher->getParam("page");

        if($page == "map"){
            try {

                $user = $this->cookies->get('pu')->getValue();
                $user = str_replace("\0", "", $user);
                $time = date("Y-m-d H:i:s",time());
                $ip = $this->request->getServer("HTTP_X_FORWARDED_FOR");

                $conn = MySqlDB::getConnection();
                $values = array(
                    $user,
                    $time,
                    $ip
                );
                $colums = array("user_name", "access_time", "ip");

                $conn->insert("access_log", $values, $colums);

            } catch (\Exception $e) {

            }
        }

        $this->view->pick("pages/$page");
    }


    //   /pages/query
    public function queryAction(){
        try {
            $conn = MySqlDB::getConnection();
            $sql = "select * from student";
            $r 	= $conn->fetchAll($sql, Db::FETCH_ASSOC);


        } catch (Exception $e) {
            echo $e;
        }
        $conn = null;
        echo json_encode($r);
        echo "haha";
        //$this->view->disableLevel();
    }

    //   /pages/insert
    public function insertAction(){
        try {

            $x = $this->request->get("name");
            $y = $this->request->get("age");

            $conn = MySqlDB::getConnection();
            $values = array(
                $x,
                $y
            );
            $colums = array("name", "age");
            //表名，实际的值，列名
            $conn->insert("nameList", $values, $colums);
            echo "success";
        } catch (\Exception $e) {
            echo "faild";
        }
    }

    public function bAction(){
    	header("Access-Control-Allow-Origin: *");
		try {
            $conn = MySqlDB::getConnection();
            $sql = "select * from namelist";
            $r 	= $conn->fetchAll($sql, Db::FETCH_ASSOC);


        } catch (Exception $e) {
            echo $e;
        }
        $conn = null;
        echo json_encode($r);
    }


}
