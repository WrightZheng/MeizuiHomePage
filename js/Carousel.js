/**
 * Created by ZZT on 2017/8/20.
 */
var $id = function(e) {
        return document.getElementById(e)
    },
    $getClass = function (e,c) {//e.childNodes返回值必是一个数组
        for(var i = 0,s = e.childNodes,t = [];i < s.length;i++){
            if($hasClass(s[i],c)) t.push(s[i])
        }
        return t;
    },
    $addEvent = function() {
        return document.addEventListener ?
            function(e, a, s) {//e 代表DOM对象；a代表事件监听类型，s代表函数体/方法
                if (e.length) for (var t = 0; t < e.length; t++) $addEvent(e[t], a, s);
                else e.addEventListener(a, s, !1);
            }: function(e, a, s) {
                if (e.length) for (var t = 0; t < e.length; t++) $addEvent(e[t], a, s);
                else e.attachEvent("on" + a,
                    function() {
                        return s.call(e, window.event)
                        //obj1.method1.call(obj2,argument1,argument2) 如上，call的作用就是把obj1的方法放到obj2上使用，后面的argument1..这些做为参数传入
                    })
            }
    } (),
    $addClass = function(e, a) {
        return $hasClass(e, a) ? void 0 : e.className = "" == e.className ? a: e.className + " " + a
    },
    $removeClass = function(e, a) {
        var s = new RegExp("(\\s|^)?" + a + "(\\s|$)", "i");
        e.className = e.className.replace(s, " ").replace(/^\s+|\s+$/, "")
    },
    $hasClass = function(e, a) {
        var s = new RegExp("(\\s|^)?" + a + "(\\s|$)", "i");
        return s.test(e.className)
    },
    Carousel = {
        cObj:$id("carousel"),
        h : $id("header"),
        u : $id("carousel").getElementsByTagName("ul"),
        d : $id("navBar").getElementsByTagName("span"),
        cTimer: null,
        loop:0,
        invoke:function () {
            var u = this.u[0],
                ul = parseInt(u.style.left),
                len = this.d.length;
            u.style.left = ( ul <= (-1920*(len-1)) ) ? ( 0+"px"):(( ul -1920)+"px");
            this.dotSet();
        },
        autoPlay:function () {
            var _this = this;
            this.cTimer = setInterval(function () {
                _this.invoke();
            },5000)
        },
        dotClick:function () {
            var d = this.d,
                u = this.u[0],
                _this = this;
            $addEvent(d,"click",function () {
                var i = parseInt(this.getAttribute("data-index"));
                u.style.left = -1920*i + "px";
                _this.dotSet(i);
            })
        },
        dotSet:function (t) {
            var d = this.d,
                len = this.d.length,
                s = this.loop;
            $removeClass(this.d[s],"navDotsOn");
            if(t === undefined){
                this.loop++;
                if(this.loop > (len-1)) this.loop = 0;
            }else {
                this.loop = t;
            }
            t = this.loop;
            $addClass(d[t],"navDotsOn");
            if(t === 0 || t === 2){
                $addClass(this.h,"theme-grad");
            }else {
                $removeClass(this.h,"theme-grad");
            }
        },
        init:function (t) {
            this.autoPlay();
            this.dotClick();
        }
    };
    Carousel.init();

