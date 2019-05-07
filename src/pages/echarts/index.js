import React, { Component, Fragment } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Echarts extends Component {
    render() {
        return (
            <div id="main" style={{ width: 1000, height: 400 }}></div>
        )
    }
    componentDidMount() {
        this.renderCharts();
    }
    renderCharts(){
        var myChart = echarts.init(document.getElementById('main')); 
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
}

export default Echarts;