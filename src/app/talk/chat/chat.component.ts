import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, Inject, AfterContentInit,
    AfterContentChecked, AfterViewInit
} from '@angular/core';
import {ChatService} from "./chat.service";

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
  providers: [{ provide: 'Window',  useValue: window }, ChatService]
})

export class ChatComponent implements OnInit, OnChanges, AfterViewInit {

  @Output() queryCallback = new EventEmitter();
  @Input() message: IMessage;
  @Input() query: string;
  @Input() waitForResponse: boolean = false;
  @Input() selectedLang: string;
  @Input() messages: Array<IMessage> = [];

  constructor(@Inject('Window') private window: IWindow, private chatService: ChatService) {
  }

  @Input() onSubmit = (value) => {
    this.waitForResponse = true;
    this.messages.push({
      text: value.query,
      date: new Date(),
      isUser: true
    });
    this.queryCallback.emit(value);
    this.query = '';
    this.scrollToBottom()
};

  ngAfterViewInit() {
    this.window.scrollTo(0,document.body.scrollHeight);
  }

  ngOnInit() {
    this.messages = JSON.parse(this.chatService.getArchive()) || [];
  }

  ngOnChanges(changes) {
    if (changes.message) {
      if (this.message) {
        this.speak(this.message.text,this.selectedLang);
        const msg = {
          text: this.message.text,
          date: new Date(),
          isUser: false
        };
        this.messages.push(msg);
        this.chatService.setArchive(this.messages);
        this.scrollToBottom()
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

  private scrollToBottom = () => {
    setTimeout(function() {
      this.window.scrollTo(0,document.body.scrollHeight);
    });
  }

}
