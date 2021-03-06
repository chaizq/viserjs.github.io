import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 } from 'viser-graph-ng';

GlobalG6.registerEdge('line-arrow', {
  getPath(points) {
    const startPoint = points[0];
    const endPoint = points[1];
    return [
      [ 'M', startPoint.x, startPoint.y ],
      [ 'L', endPoint.x / 3 + 2 / 3 * startPoint.x, startPoint.y ],
      [ 'L', endPoint.x / 3 + 2 / 3 * startPoint.x, endPoint.y ],
      [ 'L', endPoint.x, endPoint.y ]];
  },
  getShapeStyle(cfg) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const controlPoints = this.getControlPoints(cfg);
    let points = [ startPoint ]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const path = this.getPath(points);
    const style = GlobalG6.Util.mix({}, GlobalG6.Global.defaultEdge.style, {
      stroke: '#BBB',
      lineWidth: 1,
      path,
      startArrow: {
        path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
        d: 6
      },
      endArrow: {
        path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
        d: 6
      }
    }, cfg.style);
    return style;
  }
}, 'line');

const data = {
  nodes: [{
    id: '7',
    x: 150,
    y: 100,
    size: 40,
    anchorPoints: [[ 1, 0.5 ], [ 1, 0 ]]
  }, {
    id: '8',
    x: 300,
    y: 200,
    size: 40,
    anchorPoints: [[ 0, 0.5 ], [ 0, 1 ]]
  }],
  edges: [{
    source: '7',
    target: '8',
    sourceAnchor: 0,
    targetAnchor: 0
  }]
};

const graph = {
  data,
  type: 'graph',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  modes: {
    // 支持的 behavior
    default: [ 'drag-node', 'drag-canvas' ]
  },
  defaultNode: {
    shape: 'circle',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    },
    linkPoints: {
      left: true,
      right: true,
      fill: '#fff',
      stroke: '#1890FF',
      size: 3
    }
  },
  defaultEdge: {
    shape: 'line-arrow',
    style: {
      stroke: '#F6BD16'
    }
  }
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height" [data]="graph.data" [modes]="graph.modes"
    [defaultNode]="graph.defaultNode" [defaultEdge]="graph.defaultEdge">
    </v-graph>
  </div>
  `
})

class AppComponent {
  data = data;
  graph = graph;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserGraphModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export default class AppModule {}
