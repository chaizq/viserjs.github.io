import { Chart, Tooltip, StackArea, StackLine, Legend, Axis } from 'viser-react';
import * as React from 'react';
import * as $ from 'jquery';

if (!$('#tooltip-custom-style').length) {
    $('head').append(`
<style id="tooltip-custom-style">
  #v-container {
    background-color: #ebf0f0
  }

  #v-container .g2-tooltip {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    color: rgb(87, 87, 87);
    font-size: 12px;
    line-height: 20px;
    padding: 10px 10px 6px 10px;
  }

  #v-container .g2-tooltip-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  #v-container .g2-tooltip-value {
    margin-left: 30px;
    display: inline;
    float: right;
  }

  #v-container .g2-tooltip-statistic {
    font-size: 14px;
    padding-bottom: 10px;
    margin-top: 10px;
    list-style-type: none;
  }

  #v-container .g2-tooltip-statistic-value {
    font-weight: 'bold';
    display: 'inline-block';
    float: right;
    margin-left: 30px
  }
</style>
    `);
}

export default class App extends React.Component {
    state = {
        data: []
    }
    componentDidMount() {
        $.getJSON('/assets/data/fertility.json', data => {
            this.setState({ data });
        });
    }
    render() {
        var colors = ['#1f9399', '#dcb17f', '#875630', '#fd9833', '#254297', '#d872be', '#185c75', '#52c09c', '#766d58', '#28b8bd', '#f5d08e', '#b68761', '#f69574'];
        return (
            <div id="v-container">
                <Chart
                    forceFit
                    height={500}
                    data={this.state.data}
                    padding="auto"
                >
                    <Tooltip
                        crosshairs="y"
                        htmlContent={function htmlContent(title, items) {
                            var html = '<div class="g2-tooltip">';
                            var titleDom = '<div class="g2-tooltip-title" style="margin-bottom: 4px;">' + title + '</div>';
                            var listDom = '<ul class="g2-tooltip-list">';
                            var sum = 0;
                            for (var i = 0; i < items.length; i++) {
                                var item = items[i];
                                var itemDom = '<li data-index={index}>' + '<span style="background-color:' + item.color + ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' + item.name + '<span class="g2-tooltip-value">' + item.value + '</span>' + '</li>';
                                listDom += itemDom;
                                sum += parseFloat(item.value);
                            }
                            listDom += '</ul>';
                            var sumDom = '<li class="g2-tooltip-statistic">总计：<span class="g2-tooltip-statistic-value">' + sum.toFixed(2) + '</span></li>';
                            return html + titleDom + sumDom + listDom + '</div>';
                        }}
                    />
                    <Axis />
                    <Legend />
                    <StackArea
                        position="year*value"
                        color={["country", colors]}
                    />
                    <StackLine
                        position="year*value"
                        color={["country", colors]}
                        opacity={[
                            'country',
                            function(country) {
                                if (country === 'China') return 1;
                                return 0.6;
                            }
                        ]}
                        style={{
                            lineCap: 'round'
                        }}
                    />
                </Chart>
            </div>
        );
    }
}
