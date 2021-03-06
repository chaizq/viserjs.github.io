import 'zone.js';
import 'reflect-metadata';
import * as $ from 'jquery';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
const DataSet=require('@antv/data-set');
@Component({
  selector: '#mount',
  template: `
<div *ngIf="data.length">
  <div id="canvas1">
    <v-chart
      [forceFit]="true"
      height="400"
      [animate]="false"
      [padding]="[100,40,50,80]"
      [data]="dv"
      [scale]="scale1"
    >
      <v-axis></v-axis>
      <v-area position="date*price" shape="smooth" opacity="0.85"></v-area>
    </v-chart>
  </div>
  <div id="canvas2">
    <v-chart
      [forceFit]="true"
      height="100"
      [padding]="[5.40,60,80]"
      [data]="data"
      [scale]="scale2"
    >
      <v-axis dataKey="date"></v-axis>
      <v-axis dataKey="price" [show]="false"></v-axis>
      <v-area position="date*price" [active]="false" shape="smooth" opacity="0.85"></v-area>
      <v-brush type="x" [dragable]="true" [onBrushmove]="this.handleMove" [onDragmove]="this.handleMove"></v-brush>
    </v-chart>
  </div>
</div>
  `,
})
class AppComponent {
  data:any=[];
  date:any=[];
  ds:any={};
  scale1:any=[];
  scale2:any=[];
  dv:any={};
  constructor(){
    $.getJSON('/assets/data/sp500.json',data=>{
      const ds = new DataSet({
        state: {
          dates: null
        }
      });
      const totalDv = ds.createView().source(data);
      const scale1=[
        {
          dataKey:'date',
          tickCount: 10,
          type: 'time',
          mask: 'MMM D YYYY'
        },
        {
          dataKey:'price',
          min: totalDv.min('price'),
          max: totalDv.max('price')
        }
      ];
      const scale2=[
        {
          dataKey:'date',
          tickCount: 10,
          type: 'time',
          mask: 'YYYY'
        }
      ];
      this.data=data;
      this.ds=ds;
      this.scale1=scale1;
      this.scale2=scale2;
      this.getDv();
    });
  }
  getDv=()=>{
    const {ds,data,date}=this;
    const dv = ds.createView();
    dv.source(data).transform({
      type: 'filter',
      callback: function callback(obj) {
        // console.log(obj);
        if (date.length!==0) {
          return date.indexOf(obj.date) > -1;
        }
        return obj;
      }
    });
    this.dv=dv;
  }
  handleMove=(e)=>{
    const date=e.date;
    this.date=date;
    this.getDv();
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ViserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
