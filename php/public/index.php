<?php
/*引导程序 
 * 1.设置自动加载器
 * 2.配置依赖注入
 * 3.处理应用请求
 * */
use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Hdb\Plugins\ActionAcl,
    Hdb\Utils\ResultMessage,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Crypt,
    Phalcon\Events\Event,
    Phalcon\Mvc\Router;
	

try {

    $loader = new Loader();
    $loader->registerNamespaces(
            array(
                'Hdb\Utils' => '../app/utils/',
                'Hdb\Plugins' => '../app/plugins/',
                'Hdb\Controllers' => '../app/controllers/',
            )
    );
    $loader->registerDirs(array(
        '../app/controllers/',
        '../app/models/',
        '../app/conf/'
    ));
    $loader->register();
	// 依赖注入容器，其中注入了phalcon的大多数组件
    $di = new FactoryDefault();
	// 注册视图服务，指导框架去指定的目录寻找视图文件。由于视图并非php类，所以不能被自动加载器加载
    $di->set('view', function () {
        $view = new View();
        $view->setViewsDir('../app/views/');
        return $view;
    });

    $di->set('dispatcher', function() use ($di) {
        $dispatcher = new Dispatcher();
        $dispatcher->setDefaultNamespace("Hdb\Controllers");
		
		$eventsManager = $di->getShared('eventsManager');
//      $actionAcl = new ActionAcl($di);
//      $eventsManager->attach('dispatch', $actionAcl);

        $eventsManager->attach(
            "dispatch:beforeException", function (Event $event, Dispatcher $dispatcher, Exception $exception) {
                if ($exception instanceof DispatchException) {
                    $dispatcher->forward(
                        [
                            "controller" => "index",
                            "action" => "index",
                        ]
                    );

                    return false;
                }

                switch ($exception->getCode()) {
                    case Dispatcher::EXCEPTION_HANDLER_NOT_FOUND:
                    case Dispatcher::EXCEPTION_ACTION_NOT_FOUND:
                        $dispatcher->forward(
                            [
                                "controller" => "index",
                                "action" => "index",
                            ]
                        );
                        return false;
                }
            }
        );
        $dispatcher->setEventsManager($eventsManager);
		return $dispatcher;
    });
	
 	// 路由   
    $di->set('router', function () {

        $router = new Router();
//        $router->add("/", array(
//            'controller' => 'index',
//            'action' => 'index',
//            'page' => 1
//        ));
			$router->notFound(
			    [
			        "controller" => "index",
			        "action"     => "index",
			    ]
			);

        return $router;
    });

    $di->set('crypt', function() {
        $crypt = new Crypt();
        $crypt->setKey('zhaopeng');
        return $crypt;
    });
    
    $di->set('rm', function() {
        return new ResultMessage();
    });

	// 处理应用请求，分发动作。
    $application = new Application($di);
    echo $application->handle()->getContent();
	
} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}