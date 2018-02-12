<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Module
 *
 * @author zp
 */

namespace Hdb;

use Phalcon\Loader,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Mvc\View,
    Phalcon\Mvc\ModuleDefinitionInterface;
use Hdb\Plugins\ActionAcl;

class Module implements ModuleDefinitionInterface {

    /**
     * Register a specific autoloader for the module
     */
    public function registerAutoloaders(\Phalcon\DiInterface $dependencyInjector = null) {
        
    }

    /**
     * Register specific services for the module
     */
    public function registerServices(\Phalcon\DiInterface $di) {

//          $di->set('dispatcher', function() use ($di) {
//              $dispatcher = new Dispatcher();
//              //$dispatcher->setDefaultNamespace("Multiple\Backend\Controllers");
//
//              $eventsManager = $di->getShared('eventsManager');
//              $actionAcl = new ActionAcl($di);
//              $eventsManager->attach('dispatch', $actionAcl);
//
//              $dispatcher->setEventsManager($eventsManager);
//
//              return $dispatcher;
//          });
    }

}
