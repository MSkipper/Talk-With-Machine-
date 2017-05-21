import { Injectable } from '@angular/core';
import {IMessage} from "./chat.component";


@Injectable()
export class ChatService {

    private archive: Array<IMessage> = [];

    constructor() {
    }

    public setArchive = (messages: IMessage[]) => {
      this.archive = messages;
      localStorage.setItem('archive', JSON.stringify(this.archive));
    };

    public getArchive = () => {
        return localStorage.getItem('archive')
    };

    public clearArchive = () => {
        localStorage.removeItem('archive')
    };
}
