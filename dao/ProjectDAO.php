<?php

require_once( __DIR__ . '/DAO.php');

class ProjectDAO extends DAO {

  public function selectAllWoorden(){

    $sql = "SELECT * FROM `memdb` ORDER BY `date` ASC";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

}

