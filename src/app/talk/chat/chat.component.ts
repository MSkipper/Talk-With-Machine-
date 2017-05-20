import {Component, OnInit, Input, Output, EventEmitter, OnChanges, Inject} from '@angular/core';

export interface IMessage {
  text: string,
  date: Date,
  isUser: boolean
}

export interface IQuery {
  query: string
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
  @Input() selectedLang: string;
  messages: Array<IMessage> = [];

  constructor(@Inject('Window') private window: IWindow) {
  }

  @Input() onSubmit = (value) => {
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
    if (changes.message) {
      if (this.message) {
        this.speak(this.message.text,this.selectedLang);
        this.messages.push({
          text: this.message.text,
          date: new Date(),
          isUser: false
        });
      }
    }
  }

  @Input()
  speak(text: string, lang: string ) {
    this.window.responsiveVoice.speak(text, lang, {
      onend: () => {
        this.waitForResponse = false;
      }
    });
  }

}
