import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projects: Project[];
  public content: string;

  constructor(
    private http: HttpClient,
    public utils: UtilsService
  ) {
    this.http.get<ContentProjects>('/assets/contentProjects.json').subscribe(r => {
      if (r && r.projects) {
        this.projects = r.projects;
      }
    });
  }
}

class Project {
  readonly title: string;
  readonly folder: string;
  readonly description: string;
  readonly content: string;
}

class ContentProjects {
  readonly projects: Project[];
}
