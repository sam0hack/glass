<?php
require_once 'SamLocalhost/config.php';
require_once 'SamLocalhost/Graphics/head.php';
$controller  =  new Controller();


?>

<div id="spaces-main" class="pt-perspective">




    <section class=" home-page page-section">
        <div class="row metro-panel">
            <div class="large-12 columns">
                <div class="row menu-row">
                    <div class="large-12 columns">
                        <h1 class="site-name">
                            <a href="#">Sam Localhost</a>
                        </h1>

                        <div class="pull-right" id="hexClock">
                            <div id="hc"></div>
                            <br><br>
                            <div id="time"></div>



                        </div>
                    </div>

                </div>
                <div class="row">
                    <div id="before-tiles" class="large-12 columns">
                    </div>
                    <div class="four large-12 columns">
                        <div class="row">

                            <div class='twelve large-12 columns space  medium'>

                                <div class='color-3'>
                                    <span class='box-title'><i class='fa-folder fa'></i> &nbsp;Projects </span>
                                    <?php

                                    $currentFolders = $controller->ReadHost();

                                    $count=0;
                                    foreach ($currentFolders as $CF){

                                        echo "<span class='fa-folder fa text-left text-justify'><a class='ex3' id='iproject' target='_blank' href='/$CF'>$CF</a></span>&nbsp;&nbsp;&nbsp;";

                                    $count++;
                                    }


                                    ?>


                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="four large-4 columns">
                        <div class="row">

                        </div>
                    </div>


                    <div class="four large-12 columns">
                        <div class="row">

                            <div class='twelve large-12 columns space  medium'>

                                <div class='color-3'>
                                    <span class='box-title'><i class='fa-cloud fa'></i> &nbsp;PhpMyAdmin </span>



                                    <iframe src="http://localhost/phpmyadmin" height="500px"></iframe>

                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="four large-6 columns">
                        <div class="row">
                            <div class='twelve small-12 columns  space'>
                                <div class='color-5'>
                                    <span class='box-title'><i class='fa-hdd-o fa'></i> &nbsp;Php Info </span>
                                    <div class=''>

                                        PHP ini <strong><?php echo $controller->php_details()['ini']; ?></strong>
                                        <br>
                                        PHP Version <strong><?php echo $controller->php_details()['version']; ?></strong>
                                        <br>
                                        PHP sapi name <strong><?php echo $controller->php_details()['sapi']; ?></strong>

                                        <br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="four large-6 columns">
                        <div class="row">
                            <div class='twelve small-12 columns  space'>
                                <div class='color-8'>
                                    <span class='box-title'><i class='fa-hdd-o fa'></i> &nbsp;System Info </span>
                                    <div class=''>

                                           <?php echo $controller->getHDDStatus();

                                           echo"<br>";

                                           echo "Operating System ". "<strong>". $controller->OS()['OS']."</strong>";
                                           echo "<br>";
                                           echo "Operating Version ". "<strong>". $controller->OS()['OS_VERSION']."</strong>";

                                           echo "<br>";
                                           echo "Release name ". "<strong>". $controller->OS()['RELEASE_NAME']."</strong>";


                                           echo "<br>";
                                           echo "Machine type ". "<strong>". $controller->OS()['MACHINE_TYPE']."</strong>";


                                           echo "<br>";
                                           echo "Host name ". "<strong>". $controller->OS()['HOST_NAME']."</strong>";



                                           ?>
                                        <br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="after-tiles" class="large-12 columns">
                    </div>
                </div>
                <br><br><br><br>
                <div class="clearfix"></div>
                <div class="copyright">© <?php echo date('Y');?>

                    Made  <span class='fa-heart-o fa'></span> and PHP   <br> By <br>  ILM Techno Solution
                </div>
            </div>
        </div>

<?php require_once 'SamLocalhost/Graphics/footer.php'; ?>
    </section>

</div>


<?php require_once 'Graphics/footer.php';?>
