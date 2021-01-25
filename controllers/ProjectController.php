<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/ProjectDAO.php';

class ProjectController extends Controller {

  private $ProjectDAO;

  function __construct() {
    $this->ProjectDAO = new ProjectDAO();
  }

  public function index() {
    $this->set('title', 'Intro');
  }

}
