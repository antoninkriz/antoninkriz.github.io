import { Injectable } from '@angular/core';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public getId(str: string, hashTag: boolean = false) {
    return (hashTag ? '#' : '') + str.replace(/ /gi, '-').replace(/[^a-zA-Z0-9-]/gi, '');
  }

  public scrollTo(id: string) {
    this.scroll.scrollTo({target: this.getId(id, true), offset: 0});
  }

  constructor(
    private scroll: ScrollToService
  ) {}
}
