import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
import * as $ from 'jquery';

const scale = [{
  dataKey: 'carat',
  sync: true,
}, {
  dataKey: 'price',
  sync: true,
}, {
  dataKey: 'cut',
  sync: true,
}];

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="400" [data]="data" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-legend></v-legend>
      <v-axis></v-axis>
      <v-facet type="list" [fields]="fields" [cols]="3" [padding]="30">
        <v-facet-view>
          <v-point position="carat*price" color="cut" [opacity]="0.3" [size]="3" shape="circle"></v-point>
        </v-facet-view>
      </v-facet>
    </v-chart>
  </div>
  `
})
export class AppComponent {
  forceFit: boolean = true;
  height: number = 400;
  data = [];
  scale = scale;
  fields = ['cut'];

  constructor() {
    $.getJSON('/assets/data/diamond.json', (data) => {
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
  bootstrap: [AppComponent]
})

export default class AppModule { }

