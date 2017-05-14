import { Injectable } from '@angular/core';
import {Response, Jsonp} from "@angular/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TalkService {

  private readonly apiKey: string = 'CC278bVNa8p1RrCAP11dpI4hRoQ';
  private cs: string;

  constructor( private jsonp: Jsonp) { }

  public sendQuery = (query) => {
    const url = 'http://www.cleverbot.com/getreply';
    return this.jsonp.request(url, { method: 'Get', params: {
      key: this.apiKey,
      input: query.query,
      cs: this.cs,
      callback: 'JSONP_CALLBACK'
    }}).map(this.extractQuery).catch(this.handleError)
  };

  public setConversationId = (cs) => {
    this.cs = cs
  };

  private extractQuery = (response: Response) => {
    const body = response.json();
    return body || { };
  };

  private handleError = (error: Response | any) => {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return [];
  }

}
