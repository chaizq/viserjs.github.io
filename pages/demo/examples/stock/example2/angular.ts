import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
import * as $ from 'jquery';

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre" [scale]="scale">
      <v-tooltip [crosshairs]="tooltip.crosshairs"></v-tooltip>
      <v-axis dataKey="mean" [show]="false"></v-axis>
      <v-axis dataKey="stockRange" [show]="false"></v-axis>
      <v-area position="date*range"></v-area>
      <v-candle position="date*stockRange" [color]="color" tooltip="start*end*highest*lowest"></v-candle>
      <v-line position="date*mean" color="#FACC14"></v-line>
    </v-chart>
  </div>
  `
})

class AppComponent {
  forceFit: boolean= true;
  height: number = 600;
  data = [];
  scale = [{
    dataKey: 'date',
    type: 'time',
    nice: false,
    mask: 'MM-DD',
    tickCount: 10
  }, {
    dataKey: 'range',
    min: 20,
    max: 35,
    nice: false,
    tickInterval: 2
  }, {
    dataKey: 'mean',
    min: 20,
    max: 35,
    nice: false
  }, {
    dataKey: 'stockRange',
    min: 20,
    max: 35,
    nice: false
  }];

  dataPre = {
    transform: [{
      type: 'map',
      callback: (obj: any) => {
        obj.stockRange = [ obj.start, obj.end, obj.highest, obj.lowest ];
        return obj;
      }
    }]
  };

  tooltip = {
    crosshairs: {
      type: 'line'
    }
  };
  color = ['trend', val => {
    if (val === 'up') {
      return '#f04864';
    }

    if (val === 'down') {
      return '#2fc25b';
    }
  }];

  constructor() {
    $.getJSON('/data/stock-2.json', (data) => {
      this.data = data;
    });
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);