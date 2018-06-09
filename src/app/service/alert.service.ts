import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  static getMessage(statusCode: number) {
    switch (statusCode) {
      case 422:
        return 'common_message.duplicate';
    }
  }
}
