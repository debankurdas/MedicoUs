import { Injectable } from '@angular/core';
import {AES, enc} from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncdecService {

  constructor() { }
  encrypt(value: string, key: string): string {
    return AES.encrypt(value, key).toString();
  }
  decrypt(value: string, key: string): string {
    const byte = AES.decrypt(value, key);
    return byte.toString(enc.Utf8);
  }
}
