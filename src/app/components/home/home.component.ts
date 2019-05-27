import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public copiedShow: boolean;
  public contentText: string;
  public contentMail: string;

  public showCopied() {
    if (this.copiedShow) {
      return;
    }

    if (this.clipboard.isSupported) {
      this.clipboard.copyFromContent(this.contentMail);

      this.copiedShow = true;
      setTimeout(() => {
        this.copiedShow = false;
      }, 500);
    } else {
      window.open(`mailto:${this.contentMail}`);
    }
  }

  constructor(
    private http: HttpClient,
    private clipboard: ClipboardService
  ) {
    this.http.get<ContentHome>('/assets/contentHome.json').subscribe(r => {
      if (r && r.text && r.mail) {
        this.contentMail = r.mail.join('');
        this.contentText = r.text;
      }
    });
  }
}

class ContentHome {
  readonly mail: string[];
  readonly text: string;
}
