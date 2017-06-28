import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TerminalComponent } from './terminal/terminal.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    MainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
