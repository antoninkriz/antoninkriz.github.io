import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-home-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() image: string;
  @Input() title: string;
  @Input() text: string;
  @Input() stack: string[];
  @Input() dateFrom: Date;
  @Input() dateTo: Date;
}
