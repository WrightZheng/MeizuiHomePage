/**
 * Created by ZZT on 2017/8/20.
 */
$(document).ready(function () {
    var showTab = null;
    var hideTab = null;
    var cName = null;//为甚么我把cName做全局变量，并且只在语句1里定义一次，
    // 就不会出现触发语句2 是多个产品栏同时出现情况，初步猜想与clearTimeOut和
    //语句3未能实现有关；还有就是变量污染问题(这个是关键原因！！)
    $("li.headerNavProduct").mouseenter(function () {
        cName = $(this).attr("data-tab");//语句1
        showTabs(cName);
    }).mouseleave(function () {
        hideTabs(cName);
        $("#productListTab").mouseenter(function () {//语句2
            clearTimeout(hideTab);
            $("."+cName).css("display","block");
        }).mouseleave(function () {
            hideTabs(cName);//语句3
        });
    });
    $("#productListTab").find("li").mouseenter(function () {
        $(this).siblings().css("opacity",0.3);
    }).mouseleave(function () {
        $(this).siblings().css("opacity",1);
    });
    //导航栏背景、字体颜色变化，产品栏出现
    function showTabs(cName) {
        showTab = setTimeout(function () {
            $("#headerNavTab").addClass("theme-grad theme-white");
            $("#productListTab").slideDown("slow","swing");
            $("."+cName).css("display","block");
            imgShow(cName);
        },200);
        clearTimeout(hideTab);
    }
    //导航栏背景、字体颜色复原，产品栏消失
    function hideTabs(cName) {
        hideTab = setTimeout(function hider() {
            $("#headerNavTab").removeClass("theme-grad theme-white");
            $("#productListTab").css("display","none");
        },200);
        $("."+cName).css("display","none");
        clearTimeout(showTab);
    }
    //产品栏商品图片出现
    function imgShow(cName) {
        var t = $("."+cName).find("li");
        var s = t.length;
        t.css({"opacity":0,"marginLeft":"30px"});
        for (var i = 0;i<s;i++){
            t.eq(i).animate({"opacity":1,"marginLeft":0},500);
        }
    }
    //产品栏商品图片浏览
    function imgHover(cName) {
        var t = $("."+cName).find("li");
        t.mouseenter(function () {
            $(this).siblings().css("opacity",0.1);
        }).mouseleave(function () {
            t.css("opacity",1);
        });
    }

});


