$(document).ready(function () {
    $("iframe").each(function () {
        //Using closures to capture each one
        var iframe = $(this);
        iframe.on("load", function () { //Make sure it is fully loaded
            $(this).contents().find("body").html(this.src);
        });
    });