import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { BiddersComponent } from './components/bidders/bidders.component';
import { MapComponent } from './components/map/map.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [
    { path: '',title:"LogIn Page", component: LoginComponent },
    { path: 'client',title:"Clients", component: ClientComponent },
    { path: 'map',title:"Map", component: MapPageComponent },
    { path: 'viewer',title:"Viewer", component: ViewerComponent },
    { path: 'bidders',title:"Bidders", component: BiddersComponent }
];
