var HWKJ = {};

HWKJ.Ajax = {
    /*
	 * ajax请求 
	 * @param {String} url 请求地址
	 * @param {Obje} [data] 请求参数
	 * @param {Function} [success] 成功回掉函数
	 * @param {Function} [error] 失败回掉函数
	 * @param {Objec} [params] ajax参数
	 * @param {Objec} [Boolean] checkAjaxing 是否开启提交中验证（二次验证），默认true
	 */
    ajax: function (url, data, success, error, params, checkAjaxing) {
        //获取触发对象
        var e = getEvent();
        var obj = null;
        if (e) {
            obj = e.target || e.srcElement;
        }

        //是否验证二次提交
        if (checkAjaxing != false) {
            checkAjaxing = true;
        }

        //验证二次提交
        if (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string' && checkAjaxing) {
            //退出请求
            if ($(obj).attr("data-ajax") && $(obj).attr("data-ajax") == "ajaxing") {
                console.log("二次请求被阻止:" + url);
                return false;
            }

            //增加请求中标识
            $(obj).attr("data-ajax", "ajaxing");
        }

        var objParams = $.extend({
            url: url,
            data: data || {},
            type: 'POST',
            dataType: 'json',
            success: function (result, status, xhr) { 
                if (typeof (success) == "function") {
                    success(result, status, xhr);
                }

                //移除请求中标识
                if (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string' && checkAjaxing) {
                    $(obj).removeAttr("data-ajax");
                }
            },
            error: function (result, status, xhr) { 
                if (typeof (error) == "function") {
                    error(result, status, xhr);
                }

                //移除请求中标识
                if (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string' && checkAjaxing) {
                    $(obj).removeAttr("data-ajax");
                }
            }
        }, params);

        $.ajax(objParams);
    },
    /*
	 * form转Ajax请求
	 * @param {String} formSelector form选择器
	 * @param {Function} [success] 成功回掉函数
	 * @param {Function} [error] 失败回掉函数
	 * @param {Objec} [params] ajax参数
	 * @param {Objec} [Boolean] checkAjaxing 是否开启提交中验证（二次验证），默认true
	 */
    formAjax: function (formSelector, success, error, params, checkAjaxing) {
        if ($(formSelector).valid()) {
            var url = $(formSelector).attr("action");
            var data = $(formSelector).serialize();
            var objParams = $.extend({
                type: $(formSelector).attr("method") || "POST"
            }, params);

            this.ajax(url, data, success, error, objParams, checkAjaxing);
        }
    },
    /*
	 * ajax请求，返回值必须为MsgModel、封装了消息提示
	 * @param {String} url 请求地址
	 * @param {Obje} [data] 请求参数
	 * @param {Function} [success] 成功回掉函数
	 * @param {Objec} [params] ajax参数
	 * @param {Objec} [Boolean] checkAjaxing 是否开启提交中验证（二次验证），默认true
	 */
    msgAjax: function (url, data, success, params, checkAjaxing) {
        //获取触发对象
        var e = getEvent();
        var obj = null;
        if (e) {
            obj = e.target || e.srcElement;
        }

        //是否验证二次提交
        if (checkAjaxing != false) {
            checkAjaxing = true;
        }

        //验证二次提交
        if (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string' && checkAjaxing) {
            //退出请求
            if ($(obj).attr("data-ajax") && $(obj).attr("data-ajax") == "ajaxing") {
                console.log("二次请求被阻止:" + url);
                return false;
            }

            //增加请求中标识
            $(obj).attr("data-ajax", "ajaxing");
        }

        var objParams = $.extend({
            url: url,
            data: data || {},
            type: 'POST',
            dataType: 'json',
            success: function (result, status, xhr) {
                if (result.Result) {
                    if (typeof (success) == "function") {
                        success(result, status, xhr);
                    }
                } else {
                    HWKJ.Alert.alert(result.Content, "操作提示", "error");
                }

                //移除请求中标识
                if (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string' && checkAjaxing) {
                    $(obj).removeAttr("data-ajax");
                }
            },
            error: function (result, status, xhr) {
                HWKJ.Alert.alert(result.responseText, "操作提示", "error");

                //移除请求中标识
                if (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string' && checkAjaxing) {
                    $(obj).removeAttr("data-ajax");
                }
            }
        }, params);

        $.ajax(objParams);
    },
    /*
	 * form转Ajax请求，返回值必须为MsgModel、封装了消息提示
	 * @param {String} formSelector form选择器
	 * @param {Function} [success] 成功回掉函数
	 * @param {Objec} [params] ajax参数
	 * @param {Objec} [Boolean] checkAjaxing 是否开启提交中验证（二次验证），默认true
	 */
    msgFormAjax: function (formSelector, success, params, checkAjaxing) {
        if ($(formSelector).valid()) {
            var url = $(formSelector).attr("action");
            var data = $(formSelector).serialize();
            var objParams = $.extend({
                type: $(formSelector).attr("method") || "POST"
            }, params);

            this.msgAjax(url, data, success, objParams, checkAjaxing);

        }
    }
}

//绘制路径图
function drawPathSVG(container, data, title) {

    var maxXAxis = $(container).width();
    var maxYAxis = $(container).height()-80;

    //数据
    var lineData = data; 
    var maxY = d3.max(lineData, function (d) {
        return d.y;
    });
 
    var maxX = d3.max(lineData, function (d) {
        return d.x;
    });

    //定义Y轴比例尺
    var yScale = d3.scaleLinear()
        .domain([0, (maxY+5)])
        .range([maxYAxis,20]);

    //定义X轴比例尺
    var xScale = d3.scaleLinear()
        .domain([0,(maxX+5)])
        .range([40, maxXAxis]);

    //定义Y轴
    var yAxis = d3.axisLeft(yScale)
        .ticks(10);

    //定义X轴
    var xAxis = d3.axisBottom(xScale)
        .ticks(10);

    var lineFunction = d3.line()
        .x(function (d) {
            return xScale(d.x);
        })
        .y(function (d) {
            return yScale(d.y);
        })
        .curve(d3.curveLinear);

    //svg容器
    var svgContainer = d3.select(container)
        .append("svg")
        .attr("width", maxXAxis)
        .attr("height", maxYAxis)
        .attr("class", 'svgContainer')
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    //绘制标题
    // svgContainer.append('text')
    //     .text(title)
    //     .attr('dy', "20");
    
    var prev = $(container).prev();
    prev.text(title+" (单位:cm)");
    prev.css({
        fontSize: "17px",
        fontWeight: "bold"
    });

    //把path扔到容器中，并给d赋属性
    var lineGraph = svgContainer.append("path")
        .attr("d", lineFunction(lineData))
        .attr("stroke", "rgb(32, 141, 199)")
        .attr("stroke-width", 2)
        .attr("transform", "translate(0,-20)")
        .attr("fill", "none");

    //绘制Y轴
    svgContainer.append("g")
        .attr("transform", "translate(40,-20)")
        .call(yAxis);

    //绘制X轴
    svgContainer.append("g")
        .attr("transform", "translate(0," + (maxYAxis - 20) + ")")
        .call(xAxis);
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

//统计数据
function bindEcharts(jqId,data){
 
    var myChart = echarts.init($(jqId)[0]);
  
    var option = {
        title: {
            text: (data.Title || " - ")
        },
        tooltip: {},
        legend: {
            data: data.Lengend 
        },
        xAxis: {
            data: data.XAxis 
        },
        color : ['#208dc7'],
        calculable: true,
        yAxis: {},
        series: [{
            name: data.Lengend,
            type: 'bar',
            data: data.YAxis
        }]
    };
  
    myChart.setOption(option); 
 }

$(function () {

    $("body").niceScroll({
        cursorwidth: "10px"
    });

})