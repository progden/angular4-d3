import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataService } from "./data-service.service";
import { D3ForceDraggingIComponent } from './d3-force-dragging-i/d3-force-dragging-i.component';
import { D3TransformTransitionsComponent } from './d3-transform-transitions/d3-transform-transitions.component';
import { D3SankeyDiagramComponent } from './d3-sankey-diagram/d3-sankey-diagram.component';
import { D3BoxPlotsComponent } from './d3-box-plots/d3-box-plots.component';

@NgModule({
  declarations: [
    AppComponent,
    D3ForceDraggingIComponent,
    D3TransformTransitionsComponent,
    D3SankeyDiagramComponent,
    D3BoxPlotsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
