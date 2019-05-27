import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-home-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  @Input() title: string;
  @Input() now: boolean;
  @Input() start: number;
  @Input() width: number;
  @Input() dateFrom: Date;
  @Input() dateTo: Date;
}
