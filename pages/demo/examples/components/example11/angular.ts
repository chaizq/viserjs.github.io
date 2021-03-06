import 'zone.js';
import 'reflect-metadata';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');


const data = [
    { country: 'Europe', year: '1750', value: 163 },
    { country: 'Europe', year: '1800', value: 203 },
    { country: 'Europe', year: '1850', value: 276 },
    { country: 'Europe', year: '1900', value: 408 },
    { country: 'Europe', year: '1950', value: 547 },
    { country: 'Europe', year: '1999', value: 729 },
    { country: 'Europe', year: '2050', value: 628 },
    { country: 'Europe', year: '2100', value: 828 },
    { country: 'Asia', year: '1750', value: 502 },
    { country: 'Asia', year: '1800', value: 635 },
    { country: 'Asia', year: '1850', value: 809 },
    { country: 'Asia', year: '1900', value: 947 },
    { country: 'Asia', year: '1950', value: 1402 },
    { country: 'Asia', year: '1999', value: 3634 },
    { country: 'Asia', year: '2050', value: 5268 },
    { country: 'Asia', year: '2100', value: 7268 }
];

const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.2%',
}];

const repaintData = [
    { country: 'Europe', year: '1750', value: 2163 },
    { country: 'Europe', year: '1800', value: 2203 },
    { country: 'Europe', year: '1850', value: 2276 },
    { country: 'Europe', year: '1900', value: 2408 },
    { country: 'Europe', year: '1950', value: 2547 },
    { country: 'Europe', year: '1999', value: 2729 },
    { country: 'Europe', year: '2050', value: 2628 },
    { country: 'Europe', year: '2100', value: 2828 },
    { country: 'Asia', year: '1750', value: 2502 },
    { country: 'Asia', year: '1800', value: 2635 },
    { country: 'Asia', year: '1850', value: 2809 },
    { country: 'Asia', year: '1900', value: 2947 },
    { country: 'Asia', year: '1950', value: 21402 },
    { country: 'Asia', year: '1999', value: 23634 },
    { country: 'Asia', year: '2050', value: 25268 },
    { country: 'Asia', year: '2100', value: 27268 }
];

const ds = new DataSet();

@Component({
    selector: '#mount',
    template: `
   <div>
    <button (click)="handleClick()">switch density</button>
    <v-chart [forceFit]="true" [height]="height" renderer="svg" [padding]="[80, 80]">
      <v-tooltip></v-tooltip>
      <v-axis></v-axis>
      <v-legend></v-legend>
      <v-view [data]="data" [scale]="scale">
        <v-stack-bar position="year*percent" color="country" [style]="stackBarStyle" [label]="label" onLabelClick="onLabelClick"></v-stack-bar>
      </v-view>
    </v-chart>
  </div>
  `,
})
class AppComponent {
    public data: any[] = [];
    public scale: any = scale;
    public height: number = 400;
    public stackBarStyle: any = {
        stroke: '#fff',
        lineWidth: 1
    };
    public label: any[] = ['value', {
        density: 0.3,
        formatter: '$'
    }];
    public onLabelClick: any = (ev) => {
        console.log('label click', ev);
    };
    public handleClick: any = () => {
        const dt = this.key === 'data' ? repaintData : data;
        const dv = ds.createView().source(dt);
        dv.transform({
            type: 'percent',
            field: 'value',
            dimension: 'country',
            groupBy: ['year'],
            as: 'percent'
        });
        this.height = this.key === 'data' ? 600 : 400;
        this.stackBarStyle.lineWidth = this.key === 'data' ? 10 : 1;
        this.data = dv;
        this.key = this.key === 'data' ? 'repaintData' : 'data';
    }
    public key: string = 'data';
    public constructor() {
        const dv = ds.createView().source(data);
        dv.transform({
            type: 'percent',
            field: 'value',
            dimension: 'country',
            groupBy: ['year'],
            as: 'percent'
        });
        this.data = dv;
    }
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ViserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export default class AppModule { }
