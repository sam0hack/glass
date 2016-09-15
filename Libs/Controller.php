<?php
require_once  'Helpers.php';
class Controller {



    public function ReadHost(){

        //Get Current Directory
        $get_current_dir = getcwd();

        $open_dir = opendir($get_current_dir);


        $Directory_list = array();
        while ($readDir=readdir($open_dir)) {

            if (is_dir($readDir) AND $readDir!='.' AND $readDir!='..' AND $readDir!='Libs' ) {

                $Directory_list[] = $readDir;

            }

        }

        return $Directory_list;
    }




    public function getHDDStatus(){

        $df = disk_free_space("/");
        $ds = disk_total_space("/");

        $df = HumanSize($df);
        $ds = HumanSize($ds);


        return "$df Free space /   Total Space  $ds";


    }


    public function OS(){


        $sys =array();
        $sys['OS'] =  php_uname('s');                //'s': Operating system name. eg. FreeBSD.
        $sys['HOST_NAME'] =  php_uname('n');        //'n': Host name. eg. localhost.example.com.
        $sys['RELEASE_NAME'] =  php_uname('r');    //'r': Release name. eg. 5.1.2-RELEASE.
        $sys['OS_VERSION'] =  php_uname('v');     //'v': Version information. Varies a lot between operating systems.
        $sys['MACHINE_TYPE'] =  php_uname('m');  //'m': Machine type. eg. i386.
        return  $sys;


    }



    public function php_details(){

        $phpD = array();
        $phpD['ini'] =  php_ini_loaded_file();

        $phpD['version'] = phpversion();


        $phpD['sapi'] =  php_sapi_name();


        return$phpD;



    }


    



}

?>
