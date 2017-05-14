import { Component, OnInit } from '@angular/core';
import {TalkService} from "./talk.service";
import {IMessage} from "./chat/chat.component";

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css'],
  providers: [TalkService]
})
export class TalkComponent implements OnInit {

  message: IMessage;
  sendQuery = (value) => {
    this.TalkService.sendQuery(value).subscribe(data => {
      this.TalkService.setConversationId(data.cs);
      this.message = {
        text: data.interaction_1_other,
        date: new Date(),
        isUser: false
      }
    });
  };

  constructor(private TalkService: TalkService) {
  }

  ngOnInit() {

  }

}
