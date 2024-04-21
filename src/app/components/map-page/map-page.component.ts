import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MapTableComponent } from '../map-table/map-table.component';
import { CardComponent } from '../card/card.component';
import { CommunicationService } from '../../services/communication.service';


@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    MapComponent,
    MapTableComponent,
    CardComponent
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})

export class MapPageComponent implements OnInit {

  constructor(
    private communication: CommunicationService
  ) { }

  handleSelectedProject(selectedProject: { name: string, technology: string }) {
    // Handle the emitted values here
    console.log('Selected project:', selectedProject);
  }

  ngOnInit() {
    // Retrieve the selected project's name and technology
    const selectedProject = this.communication.selectedProject;
    if (selectedProject) {
      const { name, technology } = selectedProject;
      console.log('Selected Project Name:', name);
      console.log('Selected Project Technology:', technology);
    }
  }

}
