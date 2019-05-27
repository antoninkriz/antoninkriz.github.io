import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../../services/utils.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public projects: Project[];
  public content: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public utils: UtilsService
  ) {
    const paramRoute = this.activatedRoute.snapshot.params.title;

    this.http.get<ContentProjects>('/assets/contentProjects.json').subscribe(r => {
      if (r && r.projects) {
        this.projects = r.projects;

        if (paramRoute) {
          for (const p of this.projects) {
            if (utils.getId(p.title) === paramRoute) {
              this.content = p.content;
            }
          }
        }
      }
    });
  }
}

class Project {
  readonly title: string;
  readonly content: string;
}

class ContentProjects {
  readonly projects: Project[];
}
