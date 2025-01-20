import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
  }

  isMouseDevice(): boolean {
    return !this.isTouchDevice();
  }
}
