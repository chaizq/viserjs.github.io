import { Chart, Tooltip, View, Edge, Point } from 'viser-react';
import * as React from 'react';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const label = ['name', {
  offset: -10,
  textStyle: {
    textAlign: 'left',
    rotate: 90
  },
}];

const style = {
  stroke: 'grey',
};

export default class App extends React.Component {
  state = {
    edgesData: [],
    nodesData: [],
  };

  componentDidMount() {
    $.getJSON('/assets/data/relationship-with-weight.json', (sourceData) => {
      const dv = new DataSet.View().source(sourceData, {
        type: 'graph',
        edges: d => d.links,
      });
      dv.transform({
        type: 'diagram.arc',
        marginRatio: 0.5,
      });
      this.setState({
        edgesData: dv.edges,
        nodesData: dv.nodes,
      });
    });
  }

  render() {
    const {
      edgesData,
      nodesData,
    } = this.state;

    return (
      <Chart forceFit={true} height={500}>
        <Tooltip showTitle={false} />
        <View data={edgesData}>
          <Edge position="x*y" shape="arc" color="source" opacity={0.5} tooltip="source*target" />
        </View>
        <View data={nodesData}>
          <Point position="x*y" size="value" color="id" opacity={0.5} style={style} label={label} shape="circle"/>
        </View>
      </Chart>
    );
  }
}




