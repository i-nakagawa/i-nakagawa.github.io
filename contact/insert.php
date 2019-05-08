<?php

define('DB_DATABASE', 'sampledb');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('PDO_DSN', 'mysql:dbhost=localhost;dbname=' . DB_DATABASE);

try {
	// connect
  $db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  //insert
  $stmt = $db->prepare("insert into contact (name, email, tel, type, message, number) values (:name, :email, :tel, :type, :message, :number)");
 
  $stmt->bindParam(':name',$_POST['name'], PDO::PARAM_STR);
  $stmt->bindParam(':email',$_POST['email'], PDO::PARAM_STR);
  $stmt->bindParam(':tel',$_POST['tel'], PDO::PARAM_STR);
  $stmt->bindParam(':type',$_POST['type'], PDO::PARAM_STR);
  $stmt->bindParam(':message',$_POST['message'], PDO::PARAM_STR);
  $stmt->bindParam(':number',$_POST['number'], PDO::PARAM_STR);

  $stmt->execute();

  echo 'Connected to the database.';


} catch (PDOException $e){
  echo $e->getMessage(); 
  exit;
}