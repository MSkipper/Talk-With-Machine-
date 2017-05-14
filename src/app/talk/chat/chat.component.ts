import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

export interface IMessage {
  text: string,
  date: Date,
  isUser: boolean
}

@Component({
  selector: 'mt-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnChanges {

  @Output() queryCallback = new EventEmitter();
  @Input() message: IMessage;
  messages: Array<IMessage> = [];
  onSubmit: (value) => void;

  constructor() {
    this.onSubmit= (value) => {
      this.messages.push({
        text: value.query,
        date: new Date(),
        isUser: true
      });
      this.queryCallback.emit(value)
    };
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log(changes)
    if (this.message) {
      this.messages.push({
        text: this.message.text,
        date: new Date(),
        isUser: false
      });
    }
  }

}
