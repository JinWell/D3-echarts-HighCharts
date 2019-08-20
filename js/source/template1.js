//绑定左侧相关基本信息
function bindLeftData(data,pat){ 
    new Vue({
        el:"#leftBaseInfo",
        data:{
            items:data
        }
    }); 

    new Vue({
        el:"#pat",
        data:{
            Name:"欧阳小路",
            Sex:"女"
        }
    }); 
}

//绑定左侧分析结果
function bindLeftAnalysis(data){
    new Vue({
        el:"#rightContainer_bottom_li",
        data:{
            items:data
        }
    }); 
}

//得分统计
function gradeCharts(){
 
   var myChart = echarts.init($("#echart_gradeRecord")[0]);
 
   var option = {
       title: {
           text: '得分记录'
       },
       tooltip: {},
       legend: {
           data:['销量']
       },
       xAxis: {
           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
       },
       color : ['#208dc7'],
       calculable: true,
       yAxis: {},
       series: [{
           name: '销量',
           type: 'bar',
           data: [5, 20, 36, 10, 10, 20]
       }]
   };
 
   myChart.setOption(option); 
}


//运动轨迹
function sportCharts(){
 
    var myChart = echarts.init($("#echart_sportRecord")[0]);
  
    var option = {
        title: {
            text: '滚动轨迹'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        color : ['#208dc7'],
        calculable: true,
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
  
    myChart.setOption(option); 
 }


 //运动轨迹
function percentageofSports(){
 
    var myChart = echarts.init($("#echart_Percentageofsports")[0]);
  
    var option = {
        title: {
            text: '运动占比'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        color : ['#208dc7'],
        calculable: true,
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
  
    myChart.setOption(option); 
 }