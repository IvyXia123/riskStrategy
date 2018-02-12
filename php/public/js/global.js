var g = {};
g.dayPass = false;
g.hourPass = false;

g.base = "/";
g.maxWidth;

g.w = $(window).width();
g.h = $(window).height();
g.timeout = 10000;

var p = {};

var p0 = {id:"map"};
p.map = p0;

var p1 = {id:"chart1"};
p.chart1 = p1;

var p2 = {id:"echart"};
p.echart = p2;



function formatDate(d) {
    d.date = new Date();
    d.month = d.date.format("yyyy年MM月");
    d.month2 = d.date.format("yyyyMM");
    d.fdate = d.date.format("yyyy-MM-dd");
//    d.yestoday = d.date.add('d', -1).format("yyyy-MM-dd");
//    d.date.add('d', 1);
//    d.seven = d.date.add('d', -7).format("yyyy-MM-dd");
//    d.date.add('d', 7);
    d.time = d.date.format("yyyy-MM-dd hh:mm:ss");
    d.hour = d.date.getHours();
    d.mins = d.date.getMinutes();
    d.day = new Date(d.fdate).getDate();
    d.dayPass = false;
    d.hourPass = false;

    return d;
}

formatDate(g);

function dateInterval() {
    var tmp = {};
    formatDate(tmp);
    if (tmp.fdate !== g.fdate) {
        g.dayPass = true;
        g = tmp;
    }
    if (tmp.hour !== g.hour) {
        //alert(tmp.hour + "-" + g.hour);
        g.hour = tmp.hour;
        g.hourPass = true;
    }
}

g.loadPage = function (pageId, noAnimation, param, force, leftToRight) {
    $.showIndicator();
    window.setTimeout(function(){
        g.loadPageAction(pageId, noAnimation, param, force, leftToRight);
    },100);
};


g.loadPageAction = function (pageId, noAnimation, param, force, leftToRight) {
    $.showIndicator();
    if(p.intervals){
        for(var interval in p.intervals){
            //console.debug("clearInterval: " + p.intervals[interval]);
            window.clearInterval(p.intervals[interval]);
        }
    }

    if (!noAnimation)
        noAnimation = false;

    p[pageId].param = param;
    var html = $("#" + pageId).html();

    var closer = function () {
        $.hideIndicator();
    };

    var afterLoad = function(){
        try {
            if (p[pageId] && p[pageId].initPage) {
                p[pageId].initPage(closer);
            }
        } catch (e) {
            console.error(e);
        } finally {
            window.setTimeout(function(){
                closer();
            }, 1000*10);
        }
    };


    var load = function () {
        $.router.loadPage({
            url: "#" + pageId,
            noAnimation: noAnimation,
            replace: false,
            leftToRight:leftToRight
        });
        if(noAnimation){
            //console.debug("no animation");
            afterLoad();
        }else {
            $(document).one("pageAnimationEnd", "#"+pageId, function (e, pageId, $page) {
                console.debug("has animation");
                for(var i in p){
                	if(i != pageId){
                		if(p[i].timer){
                			clearInterval(p[i].timer);
                		}
                	}
                }
                afterLoad();
            });
        }
    };

    if (force || !html || html.length === 0) {//force to load page
        $.ajax({
            url: "/pages/" + pageId,
            async: false,
            type: 'get',
            success: function (text, textStatus) {
                $("#" + pageId).children().remove();
                $("#" + pageId).html(text);
                load();
            }
        });
    }else{
        load();
    }
    //$('.page').trigger("click");
};



g.queryData = function (date, url, callback) {
    date = date.replace(/-/g, '');
    $.ajax({
        url: url,
        async: true,
        type: 'POST',
        timeout: g.timeout,
        data: {day: date},
        xhrFields: {
            withCredentials: false
        },
        success: function (text, textStatus) {
            try {
                var o = JSON.parse(text);
                callback(o);
            } catch (e) {
                //console.error(e);
                $.hideIndicator();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.hideIndicator();
            $.toast("获取数据超时");
        }
    });
};

g.parseFloat = function (record, value, x) {
    return parseFloat(value).toFixed(2);
};

var termType = String(navigator.platform).toLocaleLowerCase();
if (termType === "iphone" || termType.indexOf("linux") >= 0) {//phone
    g.terminal = "phone";
    g.maxWidth = g.w;
} else if (termType.indexOf("mac") >= 0 || termType.indexOf("win") >= 0) {
    g.terminal = "pc";
    g.maxWidth = 1100;
}


g.alert = function (message) {
    alert(message);
};


