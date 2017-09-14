/**
 * Created by ZZT on 2017/9/3.
 */
var indexWrap = {
    proPhoneHover:function (){
        var timer = null;
        for (var e = $id("proPhone"),s = e.childNodes,t = [],i = 0,c;i < s.length;i++){
            $hasClass(s[i],"proPhone") && t.push(s[i]);
        }
        $addEvent(t,"mouseover",function () {
            var l = new Array(2);
            e = this.childNodes[0].getElementsByTagName("div")[0].getElementsByTagName("img");
            e[0].style.paddingLeft = "40px";
            e[1].style.paddingLeft = "40px";
            mover(e,[0,80]);
            $addEvent(t,"mouseout",function () {
                clearInterval(timer);
                mover(e,[40,40]);
            })
        });
        function mover(e,t) {
          if(e.length){
              for(var i = 0;i< e.length;i++){
                  mover(e[i],t[i]);
              }
          }else {
              clearInterval(e.timer);
              e.timer = setInterval(function () {
                  var pl = parseInt(e.style.paddingLeft);
                  var sp = ( t - pl )/10;
                  sp = sp > 0 ? Math.ceil(sp) : Math.floor(sp);
                  e.style.paddingLeft = pl + sp + "px";
                  if( sp === 0){
                      clearInterval(e.timer);
                  }
              },30);
          }
        }
    },
    morePhoneTab:function () {
      var w = $id("morePhoneWrap"),
          d = $id("morePhoneNavDotsWarp"),
          u = w.getElementsByTagName("ul")[0],
          t = $getClass(w,"morePhonesBnt"),
          s = $getClass(d,"morePhoneNavDot"),
          loop = 0;
      $addEvent(t,"click",function () {
          var sl = parseInt(u.style.left),n;
          if(this.id == "bntL") n = 1;
          else n = -1;
          sl = sl + n * 1280;
          if(sl <= 0 && sl > -3840){
              u.style.left = sl + "px";
              $removeClass(s[loop],"dotsOn");
              loop = loop - n;
              $addClass(s[loop],"dotsOn");
          }
      });
      $addEvent(s,"click",function () {
          var i = this.getAttribute("data-index");
          if(i != loop){
              var n = loop-i;
              var sl = parseInt(u.style.left);
              u.style.left = sl + n * 1280 + "px";

              $removeClass(s[loop],"dotsOn");
              loop = i;
              $addClass(s[loop],"dotsOn");

          }
      })
    },
    quickNavs:function () {
        var t = $id("backToTop");
        var e = $id("mzRightNav");
        var q = $id("quickNavWrap");
        window.onscroll = function sdd() {
            var s = document.documentElement.scrollTop || window.pageYOffset;
            if(s >300){
                q.style.display = "block";
                if(s>400){
                    e.style.display = "block";
                }else {
                    e.style.display = "none"
                }
            }else {
                q.style.display = "none"
            }
        };
        $addEvent(t,"click",function () {
            var s ,
                timer = setInterval(function () {
                    s = window.pageYOffset || document.documentElement.scrollTop;
                    document.documentElement.scrollTop = s - 50;
                    document.body.scrollTop = s -50;
                    if( s < 60){
                        document.documentElement.scrollTop = 0;
                        clearInterval(timer);
                        e.style.display = "none"
                    }
                },10);
        })
    },
    init:function () {
        this.proPhoneHover();
        this.morePhoneTab();
        this.quickNavs();
    }
};
indexWrap.init();


