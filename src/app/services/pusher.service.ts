import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

// this is here to discourage the instantiating of pusher any where its
// needed, better to reference it from one place
@Injectable()
export class PusherService {
  private pusher: any;

  constructor() {
    this.pusher = new Pusher('a3efab9105b5096ae733', {
      cluster: 'ap1',
      encrypted: true
    });
  }
  // any time it is needed we simply call this method
  getPusher() {
    return this.pusher;
  }

}
