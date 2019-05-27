import {RouterModule} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {HomeComponent} from './components/home/home.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectComponent} from './components/project/project.component';

export const routing = RouterModule.forRoot([
  {
    path: 'who-am-i',
    component: HomeComponent,
    data: {state: 'who-am-i', animation: 'who-am-i'}
  },
  {
    path: 'about-me',
    component: AboutComponent,
    data: {state: 'about-me', animation: 'about-me'}
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {state: 'projects', animation: 'projects'}
  },
  {
    path: 'project/:title',
    component: ProjectComponent,
    data: {state: 'project', animation: 'project'}
  },
  {path: '**', redirectTo: 'who-am-i'}
]);
