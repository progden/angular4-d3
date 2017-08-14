import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { D3PaintComponent } from './d3-paint/d3-paint.component';
import {DataService} from "./data-service.service";

@NgModule({
  declarations: [
    AppComponent,
    D3PaintComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
