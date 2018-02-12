<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MySqlDB
 *
 * @author zp
 */
namespace Hdb\Utils;

use \Phalcon\Db\Adapter\Pdo\Mysql;

class MySqlDB {

    function __construct() {
        
    }
    
    public static function  getConnection() {
//		$config = array(
//          "host" => "116.62.134.242",
//          "username" => "dev",
//          "password" => "DevWiFi@2016!",
//          "dbname" => "wind_cloud",
//          'charset' => 'UTF8',
//          "options" => array(
//              \PDO::ATTR_EMULATE_PREPARES => false
//              //PDO::ATTR_CASE => PDO::CASE_LOWER
//          )
//      );
		$config = array(
            "host" => "localhost",
            "username" => "root",
            "password" => "tttttt",
            "dbname" => "wind_cloud",
            'charset' => 'UTF8',
            "options" => array(
                \PDO::ATTR_EMULATE_PREPARES => false
                //PDO::ATTR_CASE => PDO::CASE_LOWER
            )
        );
        $connection = new \Phalcon\Db\Adapter\Pdo\Mysql($config);
        return $connection;
    }

}
