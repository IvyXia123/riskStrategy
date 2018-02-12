var bar = function (i, o) {

    var b, bHeight, options = {}, _id;
    var bars, xscale, wrapper = $("<div></div>"), barsWrapper, xscaleWrapper;
    var barMargin = 30, startBarMargin = 5, barWidth = 3, marginTop=0;
    var barTipsWrapper = $("<div></div>");

    function initOption() {
        options.x = [];
        options.y = [];
        options.showAll = true;
//                    options.xs = [];//which x to show
//                    options.xm = options.x.length;//how many x to show

    }

    (function (jobj, os) {
        b = jobj;
        b.css("margin-top", "30px");
        //b.css("padding-top", "20px");
        bHeight = b.height();
        initOption();
        for (var o in os) {
            options[o] = os[o];
        }
        options.ymax = 0;
        if (options.y) {
            for (var i = 0; i < options.y.length; i++) {
                if (parseFloat(options.y[i]) > parseFloat(options.ymax))
                    options.ymax = options.y[i];
            }
        }
        //console.debug(options);

        var tmp = $("<b>" + options.x[Math.floor(options.x.length/2)] + "</b>").appendTo($("body"));
        tmp.css("font-size", "12px");
        tmp.css("visibility", "hidden");
        barMargin = tmp.width() + 20;
        tmp.remove();
        init();

    })(i, o);

    function init() {
        b.css("border-left", "1px solid #000");
        b.css("border-bottom", "1px solid #000");
        b.css("position", "relative");
//                    b.css("overflow-x", "scroll");
//                    b.css("overflow-y", "visible");
        initBarMargin();
        initYscale();
        initBar();
        initXscale();

        initWrapper();

        initTitle();
    }

    function initBar() {

        bars = $("<div></div>");
        bars.addClass("bars")
        bars.css("min-width", b.width());
        bars.css("height", bHeight);
        bars.css("position", "relative");

        bars.width(barMargin * options.x.length + startBarMargin);

        var barTipTop = 0;
        for (var i = 0; i < options.x.length; i++) {
            var l = i * barMargin + startBarMargin;
            if (i === 0) {
                l = startBarMargin;
            }
            l = l + "px";
            var d = $("<div></div>");

            d.width(barWidth);
            d.height(options.y[i] / options.yScaleMax * (bHeight));
            d.css("position", "absolute");
            d.css("left", l);
            d.css("bottom", -marginTop + "px");
            d.css("text-align", "center");
            d.css("background-color", "#3c93bd");
            bars.append(d);
            
            var tip = $("<span></span>").appendTo($("body"));
            if (options.t && options.t[i])
                tip.html(options.t[i]);
            else
                tip.html(options.y[i]);

            var top = tip.width() > tip.height() ? tip.width() : tip.height();
            tip.css("display", "inline-block");
            tip.css("font-size", "13px");
            tip.css("position", "absolute");
            tip.css("visibility", "hidden");
            
            tip.css("top", (-tip.height()/2 - 2) + "px");
            //tip.css("left", (barWidth-tip.width())/2 + "px");
            tip.css("left", (barWidth)/3 + "px");
            //tip.css("left", l);
            //tip.css("z-index", 9999);

            //tip.css("transform", "rotate(-45deg)");
            tip.appendTo(d);
            tip.addClass("bar-tip-top");
            //
            barTipTop = barTipTop > top ? barTipTop : top;
        }

        window.setTimeout(function () {
            //$(".bar-tip-top").css("top", -(barTipTop/2) + "px").css("visibility", "visible");
            $(".bar-tip-top").css("visibility", "visible").css("transform-origin", "0 0").css("transform", "rotate(-45deg)");
            $(".bar-tip-top").each(function(){
//                console.debug($(this).offset().top);
            });
        }, 100);
    }

    function initXscale() {

        xscale = $("<div></div>");

        xscale.height(30);
        xscale.css("position", "relative");
        xscale.css("line-height", "30px");
        xscale.css("font-size", "12px");
        //xscale.css("top", marginTop + "px");


        xscale.width(bars.width());

        for (var i = 0; i < options.x.length; i++) {
            var l = i * barMargin + startBarMargin;
            if (i === 0) {
                l = startBarMargin;
            }
            var tmp = $("<a>" + options.x[i] + "</a>").appendTo($("body")).css("font-size", "12px");
            tmp.css("visibility", "hidden");

            //l = (l + tmp.width()/2 )+ "px";
            //console.debug(barWidth);
            l = (l + barWidth / 2 - tmp.width() / 2) + "px";
            var s = $("<span></span>");
            s.html(options.x[i]);
            s.css("position", "absolute");
            s.css("left", l);
            xscale.append(s);
            tmp.remove();
        }
    }

    function initYscale() {
        if (options.unit) {
            var u = $("<div></div>");
            u.html(options.unit);
            u.appendTo(b);
            //u.html("单位: (" + options.unit + ")");
            u.css("position", "absolute");
            u.css("top", "-15px");
            //u.css("left", -(u.width() / 3) + "px");
            u.css("font-size", "10px");
        }
        var c = Math.ceil(options.ymax / 5);
        var base = [1, 2, 5];
        var loops = 0;
        var step = 0;
        var maysteps = [];

        //get scale step
        while (step === 0) {
            for (var i = 0; i < base.length; i++) {
                var s = base[i] * Math.pow(10, loops);
                if ((c - s) < 0) {
                    var pre = maysteps.pop();
                    step = Math.abs(c - s) > Math.abs(c - pre) ? pre : s;
                    break;
                }
                maysteps.push(s);
            }
            loops++;
        }
        //get y scales
        var scales = [step];
        while (scales[scales.length - 1] < options.ymax) {
            scales.push(step + scales[scales.length - 1]);
        }
        scales.push(step + scales[scales.length - 1]);//add one
        options.yScaleMax = scales[scales.length - 1];

//        for (var i = 0; i < scales.length; i++) {
//            var t = bHeight - scales[i] / scales[scales.length - 1] * bHeight;
//            var l = $("<div></div>");
//            l.appendTo(b);
//            l.height(1);
//            l.width(5);
//            l.css("position", "absolute");
//            l.css("border-top", "1px solid #000");
//            l.css("top", t);
//            l.css("left", (-l.width()) + "px");
//
//            var s = $("<div></div>");
//            s.html(scales[i]);
//            
//            s.appendTo($("body"));
//            s.css("position", "absolute");
//            s.css("font-size", "12px");
//            s.css("top", (t - s.height() / 2) + "px");
//            s.css("left", (-s.width() - 10) + "px");
//            s.appendTo(b);
//        }
        //console.debug(scales);
    }

    function initBarMargin() {

        if (options.showAll) {
            barMargin = Math.round(b.width() / (options.x.length));
        } else {
            if (barMargin * options.x.length + startBarMargin * 2 > b.width()) {
            } else {
                startBarMargin = (barMargin * 0.4 + startBarMargin * 2) / 2;
                barMargin = (b.width() - startBarMargin * 2) / (options.x.length);
            }
        }
        barWidth = barMargin * 0.6;
        startBarMargin = (barMargin * 0.4 + startBarMargin * 2) / 2;
    }

    function initWrapper() {
        
        var w = $("<div></div>");
        w.addClass("big-wrapper");
        w.css("position", "absolute");
        w.css("overflow-x", "scroll");
        //w.css("z-index", "999");
        w.width(b.width());
        
        var f = $("<div></div>");
        f.css("visibility", "hidden");
        f.appendTo(b);
        f.addClass("bar-wrapper");
        f.append(bars);
        f.append(xscale);
        
        //f.css("display", "none");
        //alert(bars.width() - f.width() - startBarMargin);
        
        
        //f.clone().appendTo(b).append(f).css("overflow-y", "visible");;
        
        
        
//        f.height(f.height() + 20);
//        f.css("position", "relative");
//        f.css("padding-top", "-20px");
        
//        barTipsWrapper.height(b.height() + 20).width(b.width());
//        barTipsWrapper.css("position", "absolute");
//        barTipsWrapper.css("top", "0px");
//        barTipsWrapper.addClass("bar-tips-wrapper");
        
        
        //barTipsWrapper.appendTo(w);
//        f.css("overflow", "hidden");
//        barTipsWrapper.css("overflow", "scroll");
//        
//        b.append(f);
//        b.append(barTipsWrapper);
//        
//        w.appendTo(b);
        f.css("overflow", "scroll");
        
         
        window.setTimeout(function(){
            
            f.css("visibility", "visible");
            f.scrollLeft(bars.width() - f.width());
            
        },300);
        
    }

    function initTitle() {
        if (options.title) {
            var title = $("<div></div>");
            title.html(options.title);
            title.appendTo(b);
            title.css("position", "absolute");
            title.css("left", (b.width() - title.width()) / 2 + "px");
            title.css("top", "-30px");
        }
    }


};