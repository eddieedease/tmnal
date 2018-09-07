import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  HttpModule,
  JsonpModule
} from '@angular/http';

import { AppComponent } from './app.component';
import { TerminalComponent } from '././terminal/terminal.component';
import { MainComponent } from '././main/main.component';

// needies?
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
