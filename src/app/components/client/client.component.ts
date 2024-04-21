import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { ExpandComponent } from '../expand/expand.component';
import { ProjectTableUserComponent } from '../project-table-user/project-table-user.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    MapComponent,
    ExpandComponent,
    ProjectTableUserComponent
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

}
