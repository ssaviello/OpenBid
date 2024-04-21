import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  selectedProject: { 
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    technology: string;
    stories: string; } | null = null;

  constructor() { }

}
