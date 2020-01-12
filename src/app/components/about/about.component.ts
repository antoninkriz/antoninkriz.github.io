import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../../services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public listJobs: Event[] = [];
  public listAccomplishments: Event[] = [];
  public listEducation: Event[] = [];

  private prepareEvents(ev: Event[]): Event[] {
    const dateGetDays = (d: Date) => {
      return Math.floor(d.getTime() / 8.64e7);
    };

    let sDate = ev[0].from;
    let eDate = ev[0].to;
    ev.forEach((e) => {
      sDate = (e.from < sDate) ? e.from : sDate;
      eDate = (e.to > eDate) ? e.to : eDate;
    });

    const startDate = dateGetDays(sDate);
    const endDate = dateGetDays(eDate);
    const dateSpan = endDate - startDate;

    for (const e of ev) {
      const currentStart = dateGetDays(e.from);
      const currentEnd = dateGetDays(e.to);

      e.position.start = ((currentStart - startDate) / dateSpan) * 100;
      e.position.width = ((currentEnd - currentStart) / dateSpan) * 100;
    }

    return ev;
  }

  constructor(
    private http: HttpClient,
    public utils: UtilsService
  ) {

    this.http.get<ContentAbout>('/assets/contentAbout.json')
      .subscribe(r => {
        if (r) {
          if (r.listEducation && r.listEducation.length > 0) {
            const ev: Event[] = [];

            let i = 0;
            r.listEducation.forEach(e => ev.push(new Event(i++, e.from, e.to, e.image, e.title, e.stack, e.text)));

            this.listEducation = this.prepareEvents(ev);
          }

          if (r.listJobs && r.listJobs.length > 0) {
            const ev: Event[] = [];

            let i = 0;
            r.listJobs.forEach(e => ev.push(new Event(i++, e.from, e.to, e.image, e.title, e.stack, e.text)));

            this.listJobs = this.prepareEvents(ev);
          }

          if (r.listAccomplishments && r.listAccomplishments.length > 0) {
            const ev: Event[] = [];

            let i = 0;
            r.listAccomplishments.forEach(e => ev.push(new Event(i++, e.from, e.to, e.image, e.title, e.stack, e.text)));

            this.listAccomplishments = this.prepareEvents(ev);
          }
        }
      });
  }
}

class ContentAbout {
  readonly listEducation: EventJson[];
  readonly listAccomplishments: EventJson[];
  readonly listJobs: EventJson[];
}

abstract class EventJson {
  readonly from: string;
  readonly to: string;
  readonly image: string;
  readonly title: string;
  readonly stack: string[];
  readonly text: string;
}

class Event {
  readonly i: number;
  readonly from: Date;
  readonly to: Date;
  readonly now: boolean;
  readonly image: string;
  readonly title: string;
  readonly stack: string[];
  readonly text: string;
  readonly position = {
    width: 0,
    start: 0
  };

  constructor(i: number, from: string, to: string, image: string, title: string, stack: string[], text: string) {
    this.i = i;
    this.from = new Date(from);
    this.to = to === 'now' ? new Date() : new Date(to);
    this.now = to === 'now';
    this.image = image;
    this.title = title;
    this.stack = stack;
    this.text = text;
  }
}
