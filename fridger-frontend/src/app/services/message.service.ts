import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new ReplaySubject<string>();

  constructor() { }

  sendMessage(message: string) {
    this.message.next(message)
  }
}
