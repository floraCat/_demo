<?php

if(@$_GET["page"]){
	include("".$_GET["page"].".html");
}else{
	include("_0enter.html");
}
?>

