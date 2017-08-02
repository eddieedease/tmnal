import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  text: any;
  selff;

  timer;
  newInput: String;
  AllowedLengthInput = 32;

  chatLogg: String = "................................<br>";

  chatLog: String = `
..............................<br>
.....T___......<br>
.....|[o]|.....<br>
.....\_-_/.....<br>
()ooo|\=/|ooo()<br>
.....|___|.....<br>
.....//.\\.....<br>
...._\\.//_....<br>`;

  promptAvailable = false;

  constructor() {}

  ngOnInit() {

    this.selff = this;
    //this.typeWriter(this.text, 0);
    this.typeWriter(this.chatLog, 0);
  }



  typeWriter(_text, n) {
    if (n < (_text.length)) {
      this.promptAvailable = false;
      $('.test').html(_text.substring(0, n + 1));
      n++;

      this.timer = setTimeout(() => this.selff.typeWriter(_text, n), 7);
    } else {
      console.log('finished with typing');
      this.promptAvailable = true;
      document.getElementById("focuss").focus();
    }
  }

  hitEnter() {
    let stringLength = $('.test').html().length;
    console.log(stringLength);
    console.log(this.newInput);
    if (this.newInput.length <= this.AllowedLengthInput) {
    document.getElementById("blinking").focus();
      
      this.chatLog = this.chatLog + '<br><span style="color:#00fe00" class="prompt">$  </span>' + this.newInput;
      this.typeWriter(this.chatLog, stringLength);
      this.newInput = "";
    }

  }












}
