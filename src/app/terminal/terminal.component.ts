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

  // STATES
  // 'booting' --> Bootingup
  // 'waiting' --> Waiting for player input
  // 'thinking' --> Thinking about the AI response
  // 'responding' --> Responding to text input
  // 'userresponse' --> quick lines for user response
  // MORE SPECIAL STATES AWAITINGGGGGG WHOOOOSH
  currentState: String = 'booting';

  timer;
  newInput: String;
  AllowedLengthInput = 40;

  
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

  aiThinking = false;

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
      switch (this.currentState) {
        case "userrepsonse":
          // change into different speeds? // HACK
          this.timer = setTimeout(() => this.selff.typeWriter(_text, n), 1);
          break;
        case "responding":
          // change into different speeds? // HACK
          this.timer = setTimeout(() => this.selff.typeWriter(_text, n), 10);
          break;
        case "booting":
          this.timer = setTimeout(() => this.selff.typeWriter(_text, n), 1);
          break;
      }
    } else {
      // HANDLE COMPLETE
      // comes from state
      switch (this.currentState) {
        case 'booting':
        this.promptAvailable = true;
          break;
        case 'userrepsonse':
          break;
        case 'responding':
          this.promptAvailable = true;
          this.currentState = 'waiting';
          document.getElementById("focuss").focus();
          break;
      }
    }
  }

  hitEnter() {
    let stringLength = $('.test').html().length;
    console.log(stringLength);

    console.log(this.newInput);
    let self = this.selff;
    // set state
    this.currentState ='userrepsonse';
    
    // NOTE this is the timeOut function
    setTimeout(function () {
      // CALL THE AI PROGRAM!
      self.callAI();
    }, 3500);

    // First display the user input on the screen 
    if (this.newInput.length <= this.AllowedLengthInput) {
      // NO NEED document.getElementById("blinking").focus();
      this.chatLog = this.chatLog + '<br><span style="color:#00fe00" class="prompt">$ ' + this.newInput + ' </span>';
      this.typeWriter(this.chatLog, stringLength);
      this.newInput = "";
    }
    this.aiThinking = true;


  }




  // The AI Program
  callAI(){
      console.log("this gets called right?");
      this.currentState ='responding';

      // NO NEED document.getElementById("blinking").focus();
      let displaymessage = '<br><span  class="prompt">Mu hahahahahaha TAKE OVER</span>';
      
      this.chatLog = this.chatLog + displaymessage;
      // start from which char count?
      let stringLength = this.chatLog.length - displaymessage.length;

      this.typeWriter(this.chatLog, stringLength);
      this.newInput = "";
    
  }
  












}
