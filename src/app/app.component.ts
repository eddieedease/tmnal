import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  detecText = 'Listen rookie, I need you. To start press power';



  changeDetecText(_event){
    console.log('comes here?');
    this.detecText = 'Great, you\'re in';
  }
}
