import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {MarkdownModule, MarkdownService, MarkedOptions} from 'ngx-markdown';
import {Angulartics2Module} from 'angulartics2';

import {routing} from './app.routing';
import {AppComponent} from './app.component';
import {AboutComponent} from './components/about/about.component';
import {EventComponent} from './components/about/event/event.component';
import {LineComponent} from './components/about/line/line.component';
import {HomeComponent} from './components/home/home.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectComponent} from './components/project/project.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EventComponent,
    LineComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectComponent
  ],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
    Angulartics2Module.forRoot(),
    ScrollToModule.forRoot(),
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          sanitize: true,
          smartLists: true,
          smartypants: true,
        },
      },
    })
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  private static readonly replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
  };

  private static cleanUrl(href) {
    try {
      const proto = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();

      if (proto.indexOf('javascript:') === 0 || proto.indexOf('vbscript:') === 0 || proto.indexOf('data:') === 0) {
        return null;
      }

      return encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }
  }

  private static escapeText(html) {
    if (/[&<>"']/.test(html)) {
      return html.replace(/[&<>"']/g, (c) => AppModule.replacements[c]);
    }

    return html;
  }

  constructor(private markdownService: MarkdownService) {
    this.markdownService.renderer.heading = (text, level, raw, slugger) => {
      if (level > 3) {
        return `<h1>!INVALID LEVEL ${level} HEADING! (${text})</h1>`;
      }

      if (this.markdownService.options.headerIds) {
        return '<h'
          + (level + 1)
          + ' id="'
          + this.markdownService.options.headerPrefix
          + slugger.slug(raw)
          + '">'
          + text
          + '</h'
          + level
          + '>\n';
      }

      return '<h' + (level + 1) + '>' + text + '</h' + level + '>\n';
    };

    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      href = AppModule.cleanUrl(href);
      title = AppModule.escapeText(title);
      text = AppModule.escapeText(text);

      return `
<figure class="img">
  <div class="img__content">
    <div class="img__wrapper">
      <img alt="${text}" src="${href}" />
    </div>
    ${title ? `
    <figcaption class="img__caption">
      <span class="img__caption__text">${title}</span>
      ${text ? `<span class="img__caption__text">${text}</span>` : ''}
    </figcaption>
    ` : ''}
  </div>
</figure>`;
    };
  }
}
