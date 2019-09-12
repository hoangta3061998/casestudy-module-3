import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: {displayName: string, email: string};
  private endPoint = 'http://localhost:2000'; // normally you use environment.ts
  private channel: any;

  constructor(private pusherService: PusherService, private http: HttpClient) {
    this.channel = this.pusherService.getPusher().subscribe('chat-group');
  }

  join(param): Observable<any> {
    return this.http.post(`${this.endPoint}/join`, param)
      .pipe(tap(data => {
        this.user = param;
      }));
  }

  sendMessage(message: string): Observable<any> {
    const param = {
      message,
      type: 'human',
      ...this.user
    };
    return this.http.post(`${this.endPoint}/message`, param);
  }

  getChannel() {
    return this.channel;
  }
}
