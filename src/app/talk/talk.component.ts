import {Component, OnDestroy, OnInit} from '@angular/core';
import {TalkService} from "./talk.service";
import {IMessage, IQuery} from "./chat/chat.component";
import {document} from "ng2-bootstrap/utils/facade/browser";

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css'],
  providers: [TalkService]
})
export class TalkComponent implements OnInit, OnDestroy  {

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

  selectedLang: string;

  constructor(private TalkService: TalkService) {
    this.selectedLang = 'Polish Female';
  }

  ngOnInit() {
    document.body.className += ' chat';
  }

  ngOnDestroy() {
    document.body.className = document.body.className.replace('chat');
  }
}
