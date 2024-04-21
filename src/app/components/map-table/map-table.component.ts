import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommunicationService } from '../../services/communication.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { ExpandComponent } from '../expand/expand.component';


export interface ProjectData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  technology: string;
  stories: string;
}

export interface IMarker {
  x: number;
  y: number;
}

@Component({
  selector: 'app-map-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginator,
    MatSort,
    CardComponent,
    CommonModule,
    MapComponent,
  ],
  templateUrl: './map-table.component.html',
  styleUrl: './map-table.component.css'
})

export class MapTableComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'latitude', 'longitude', 'technology', 'stories'];
  dataSource: MatTableDataSource<ProjectData>;
  selectedProjects: ProjectData[] = []; // Assuming you have this array populated with selected projects
  filteredProjects: ProjectData[] = [];
  showComponent:boolean = false;
  latitude: number[] = [];
  longitude: number[] = [];
  markers: IMarker[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() selectedProject: EventEmitter<{ name: string, technology: string, latitude: number, longitude: number }> = new EventEmitter();

  projects: ProjectData[] = [
    {id: '1', name: 'Building 1', latitude: 41.386672, longitude: 2.165197, technology: 'Concrete', stories: '5'},
    {id: '2', name: 'Building 2', latitude: 41.396293, longitude: 2.181622, technology: 'Concrete', stories: '4'},
    {id: '3', name: 'Building 3', latitude: 41.391623, longitude: 2.158347, technology: 'Concrete', stories: '5'},
    {id: '4', name: 'Building 4', latitude: 41.399357, longitude: 2.177642, technology: 'Concrete', stories: '7'},
  ];

  constructor(
    private communication: CommunicationService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.projects);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.logDisplayedItemsOnInit();
    }, 1000); // 1000 milliseconds delay (1 second)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Subscribe to page event of the paginator
    this.paginator.page.subscribe(() => {
      this.logDisplayedItems();
    });
  }
  

  logDisplayedItemsOnInit() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, this.paginator.length);

    const currentPageItems = this.dataSource.data.slice(startIndex, endIndex);
    this.filteredProjects = []; // Fix: Clear the array before pushing selected projects
    this.showComponent = false;
    currentPageItems.forEach(item => {
      this.communication.selectedProject = { 
        id: item.id,
        name: item.name, 
        technology: item.technology, 
        latitude: item.latitude, 
        longitude: item.longitude,
        stories: item.stories};
      this.filteredProjects.push(this.communication.selectedProject); // Fix: Push selected project to the array
      
    });
    
    this.markers = this.filteredProjects.map(item => {
      return { x: item.latitude, y: item.longitude };
    });
    console.log('Selected project:', this.markers);
    this.showComponent = true;
  }

  logDisplayedItems() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, this.paginator.length);

    const currentPageItems = this.dataSource.data.slice(startIndex, endIndex);
    this.filteredProjects = []; // Fix: Clear the array before pushing selected projects
    this.showComponent = false;
    currentPageItems.forEach(item => {
      this.communication.selectedProject = { 
        id: item.id,
        name: item.name, 
        technology: item.technology, 
        latitude: item.latitude, 
        longitude: item.longitude,
        stories: item.stories};
      this.filteredProjects.push(this.communication.selectedProject); // Fix: Push selected project to the array
    });

    this.markers = this.filteredProjects.map(item => {
      return { x: item.latitude, y: item.longitude };
    });

    console.log('Selected project:', this.markers);
    this.showComponent = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   // Emit selected project's name and technology
   selectProject(project: ProjectData) {
    this.selectedProject.emit({ name: project.name, technology: project.technology, latitude: project.latitude, longitude: project.longitude});
  }
}