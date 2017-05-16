import {Component, OnInit, Input, Output, EventEmitter, OnChanges, Inject} from '@angular/core';

export interface IMessage {
  text: string,
  date: Date,
  isUser: boolean
}

export interface IWindow extends Window{
  responsiveVoice: any
}

@Component({
  selector: 'mt-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [{ provide: 'Window',  useValue: window }]
})

export class ChatComponent implements OnInit, OnChanges {

  @Output() queryCallback = new EventEmitter();
  @Input() message: IMessage;
  @Input() query: string;
  @Input() waitForResponse: boolean = false;
  messages: Array<IMessage> = [];
  constructor(@Inject('Window') private window: IWindow) {
  }

  // TODO Voice api service
  languages: Array<String> = [
    'UK English Female',
    'UK English Male',
    'US English Female',
    'Spanish Female',
    'French Female',
    'Deutsch Female',
    'Italian Female',
    'Greek Female',
    'Hungarian Female',
    'Turkish Female',
    'Russian Female',
    'Dutch Female',
    'Swedish Female',
    'Norwegian Female',
    'Japanese Female',
    'Korean Female',
    'Chinese Female',
    'Hindi Female',
    'Serbian Male',
    'Croatian Male',
    'Bosnian Male',
    'Romanian Male',
    'Catalan Male',
    'Australian Female',
    'Finnish Female',
    'Afrikaans Male',
    'Albanian Male',
    'Arabic Male',
    'Armenian Male',
    'Czech Female',
    'Danish Female',
    'Esperanto Male',
    'Hatian Creole Female',
    'Icelandic Male',
    'Indonesian Female',
    'Latin Female',
    'Latvian Male',
    'Macedonian Male',
    'Moldavian Male',
    'Montenegrin Male',
    'Polish Female',
    'Brazilian Portuguese Female',
    'Portuguese Female',
    'Serbo-Croatian Male',
    'Slovak Female',
    'Spanish Latin American Female',
    'Swahili Male',
    'Tamil Male',
    'Thai Female',
    'Vietnamese Male',
    'Welsh Male'
  ];

  private selectedLang: string;


  private onSubmit= (value) => {
  this.waitForResponse = true;
  this.messages.push({
    text: value.query,
    date: new Date(),
    isUser: true
  });
  this.queryCallback.emit(value);
  this.query = ''
};

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (this.message) {
      console.log(this.selectedLang)
      this.window.responsiveVoice.speak(this.message.text, this.selectedLang, {
        onend: () => {
          this.waitForResponse = false;
        }});
      this.messages.push({
        text: this.message.text,
        date: new Date(),
        isUser: false
      });
    }
  }

}
