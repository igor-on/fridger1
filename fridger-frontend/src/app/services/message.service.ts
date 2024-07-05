import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message = new ReplaySubject<Message>();

  constructor() {}

  sendMessage(message: Message | string) {
    let msg: Message = {
      severity: 'success',
      summary: 'success',
      detail: 'No message provided',
    };

    if (typeof message === 'string') {
      msg.detail = message;
    } else {
      msg = message;
    }

    this.message.next(msg);
  }
}
