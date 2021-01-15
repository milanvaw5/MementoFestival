<?php
session_start();
ini_set('display_errors', true);
error_reporting(E_ALL);

$routes = array(
  'index' => array(
    'controller' => 'Mem',
    'action' => 'index'
  )
);

if(empty($_GET['page'])) {
  $_GET['page'] = 'index';
}
if(empty($routes[$_GET['page']])) {
  header('Location: index.php');
  exit();
}

if (file_exists("../.env")) {
  $variables = parse_ini_file("../.env", true);
  foreach ($variables as $key => $value) {
    putenv("$key=$value");
  }
}
$route = $routes[$_GET['page']];
$controllerName = $route['controller'] . 'Controller';

require_once __DIR__ . '/controllers/' . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();
$controllerObj->render();
