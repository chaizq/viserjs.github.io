import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 } from 'viser-graph-ng';

const lightBlue = '#5b8ff9';
const lightOrange = '#5ad8a6';

   // 注册自定义名为 pie-node 的节点类型
GlobalG6.registerNode('pie-node', {
  drawShape: (cfg, group) => {
    const radius = cfg.size / 2; // 节点半径
    const inPercentage = cfg.inDegree / cfg.degree; // 入度占总度数的比例
    const inAngle = inPercentage * Math.PI * 2; // 入度在饼图中的夹角大小
    const inArcEnd = [ radius * Math.cos(inAngle), radius * Math.sin(inAngle) ]; // 入度饼图弧结束位置
    let isInBigArc = 1,
      isOutBigArc = 0;
    if (inAngle > Math.PI) {
      isInBigArc = 0;
      isOutBigArc = 1;
    }
       // 定义代表入度的扇形形状
    const fanIn = group.addShape('path', {
      attrs: {
        path: [
             [ 'M', radius, 0 ],
             [ 'A', radius, radius, 0, isInBigArc, 0, inArcEnd[0], inArcEnd[1] ],
             [ 'L', 0, 0 ],
             [ 'B' ]
        ],
        lineWidth: 0,
        fill: lightOrange
      }
    });
       // 定义代表出度的扇形形状
    group.addShape('path', {
      attrs: {
        path: [
             [ 'M', inArcEnd[0], inArcEnd[1] ],
             [ 'A', radius, radius, 0, isOutBigArc, 0, radius, 0 ],
             [ 'L', 0, 0 ],
             [ 'B' ]
        ],
        lineWidth: 0,
        fill: lightBlue
      }
    });
       // 返回 keyshape
    return fanIn;
  }
}, 'single-shape');

const data = {
  nodes: [
    {
      id: 'pie1',
      size: 80,
      inDegree: 80,
      degree: 360,
      x: 150,
      y: 150
    },
    {
      id: 'pie2',
      size: 80,
      inDegree: 280,
      degree: 360,
      x: 350,
      y: 150
    }
  ],
  edges: [
    {
      source: 'pie1',
      target: 'pie2'
    }
  ]
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
  linkCenter: true,
  defaultNode: {
    shape: 'pie-node'
  }
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height" [data]="graph.data" [defaultNode]="graph.defaultNode">
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
