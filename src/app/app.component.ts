import {Component, HostListener, OnInit} from '@angular/core';
import {trigger, animate, style, query, transition} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          { optional: true }
        ),
        query(
          ':leave',
          [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  private static readonly mobileMaxWidth: number = 991;

  public showFullTitle: boolean;

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    this.showFullTitle = window.innerWidth > AppComponent.mobileMaxWidth;
  }
}
