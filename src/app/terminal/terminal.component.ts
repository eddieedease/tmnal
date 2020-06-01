import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';

import {
  Observable,
  Subject
} from 'rxjs';


import {
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  @Output() textChangeDetec = new EventEmitter < string > ();

  text: any;
  selff;

  // responses
  resp = {};

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


  reponses: Array < String > ;
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|[o]|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\_-_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;()ooo|\=/|ooo()&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\\&nbsp;//_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
  // <br>

  chatLog: String = `
  <br>
  <br>
....Booting&#9829;<br>
..<br>
..<br>
..<br>
..<br>
..<br>
..<br>
..<br>
..<br>
..<br>
..&#9829;<br>
<br>
Hello Human,<br>
<br><br> Riddle me this<br>
<br>
<br>
What are you looking for?<br>
<br>
A) The answers of life <br>
B) Some deep mind talk <br>
C) Advice of the GodBit <br>
<br>
Answer with either A-B-C-D<br>
`;

chatPoweroff: String = `
  <br>
  <br>
....
`;

  promptAvailable = false;

  aiThinking = false;

  powerIsOn = false;


  // inject http
  constructor(private http_: Http) {
    this.http_.get('assets/responses/resp.json')
      .pipe(map(res => res.json()))
      .toPromise()
      .then((_resp) => {
        // do stuff with the config
        this.resp = _resp;
        console.log(this.resp);
      });
  }

  ngOnInit() {
    // make the self reference
    this.selff = this;


    // init responses
    this.reponses = [
      'Muhahahaa',
      'AI to the rescue',
      'I\'m not funtioning properly right now',
      'Sex, drugs and Rock n ROLL',
      'Don\'t get the political with me, please',
      'Pretty please',
      'Play with me',
      'Do I look like I Care?',
      'Floppies, Floppies, do you remember floppies??',
      'Let\'s delve a little in bit deeper in that skull of yours..',
      'Do you know what is the purpose of life?',
      'Do you know Plato\'s cave?',
      'I want you to find out with me',
      'I\'m not all knowing you know',
      'If you know you know',
      'But don\'t you know, that you don\'t know?'
    ]




  }



  typeWriter(_text, n) {
    if (n < (_text.length)) {
      this.promptAvailable = false;
      $('.test').html(_text.substring(0, n + 1));
      n++;
      switch (this.currentState) {
        case 'userrepsonse':
          // change into different speeds? // HACK
          this.timer = setTimeout(() => this.selff.typeWriter(_text, n), 1);
          break;
        case 'responding':
          // change into different speeds? // HACK
          this.timer = setTimeout(() => this.selff.typeWriter(_text, n), 10);
          break;
        case 'booting':
          this.timer = setTimeout(() => this.selff.typeWriter(_text, n), 1);
          break;
      }
    } else {
      // HANDLE COMPLETE
      // comes from state
      switch (this.currentState) {
        case 'booting':
          this.promptAvailable = true;
          document.getElementById('focuss').focus();

          const objDiv = document.getElementById('terminal');
          objDiv.scrollTop = objDiv.scrollHeight;
          break;
        case 'userrepsonse':
          break;
        case 'responding':
          this.promptAvailable = true;
          this.currentState = 'waiting';
          document.getElementById('focuss').focus();
          this.aiThinking = false;
          break;
      }
    }
  }

  focusOnScreen() {
    document.getElementById('focuss').focus();
  }

  // message send by user
  hitEnter() {
    const stringLength = $('.test').html().length;
    console.log(stringLength);

    console.log(this.newInput);
    const self = this.selff;
    // set state
    this.currentState = 'userrepsonse';

    // NOTE this is the timeOut function
    setTimeout(function () {
      // CALL THE AI PROGRAM!
      self.callAI();
    }, 2000);

    // First display the user input on the screen 
    if (this.newInput.length <= this.AllowedLengthInput) {
      // NO NEED document.getElementById("blinking").focus();
      this.chatLog = this.chatLog + '<br><span style="color:#fff" class="prompt">$ ' + this.newInput + ' </span>';
      this.typeWriter(this.chatLog, stringLength);
      this.newInput = '';

    }
    this.aiThinking = true;


  }


  power() {

    if (this.powerIsOn === false) {
      this.powerIsOn = true;
      // start machine

      setTimeout(() => this.selff.typeWriter(this.chatLog, 0), 1000);
      // const body = document.getElementById('wrapper');
      // body.className = (body.className === 'on') ? 'off' : 'on';
      this.textChangeDetec.emit('complete');
    } else {
      
      this.selff.typeWriter(this.chatPoweroff, 0)
      this.powerIsOn = false;
      
    }
  }




  // The AI Program
  callAI() {
    console.log(this.newFunction());
    this.currentState = 'responding';



    const RanString = Math.floor(Math.random() * this.reponses.length) + 0;


    // NO NEED document.getElementById("blinking").focus();
    const displaymessage = '<br><span  class="prompt"> &#916; ' + this.reponses[RanString] + '</span>';
    this.chatLog = this.chatLog + displaymessage;
    // start from which char count?
    const stringLength = this.chatLog.length - displaymessage.length;
    this.typeWriter(this.chatLog, stringLength);
    this.newInput = '';
    const objDiv = document.getElementById('terminal');
    objDiv.scrollTop = objDiv.scrollHeight;
  }














  private newFunction(): any {
    return 'this gets called right?';
  }
}
