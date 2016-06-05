<?php




/*
 * HumanSize()
 * @return human readable format of bytes
 * @c0d3 bY Nitrogen
 */
function HumanSize($Bytes)
{
    $Type=array("", "KB", "MB", "GB", "TB", "PT", "exa", "zetta", "yotta");
    $Index=0;
    while($Bytes>=1024)
    {
        $Bytes/=1024;
        $Index++;
    }
    return("".intval($Bytes)." ".$Type[$Index]);
}

?>