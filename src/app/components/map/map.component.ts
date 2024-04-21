import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LatLngExpression, Map } from 'leaflet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent {

  @Input() coordinates!: { x: number, y: number }[];
  @Input() createLine!: boolean;

  private map!: Map;
  private googleSat: any;
  private markers: any[] = [];
  private polyline: any = null; // Store the polyline object
  collectionData: any;
  private isBrowser: boolean = false;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initMap();
    }
  }

  private initMap(): void {
    const mapContainer = this.renderer.createElement('div');
    this.renderer.addClass(mapContainer, 'map-frame');
    this.renderer.appendChild(this.elementRef.nativeElement, mapContainer);

    import('leaflet').then(L => {
      this.map = L.map(mapContainer).setView([0, 0], 13);
      this.googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
      this.googleSat.addTo(this.map);

      const myIcon = L.icon({
        iconUrl: 'assets/images/marker-icon.png'
      });

      // Add markers
      this.coordinates.forEach(coord => {
        const marker = L.marker([coord.x, coord.y], { icon: myIcon }).addTo(this.map);
        marker.bindPopup(`
              <b>Building</b><br>
              <a href="/viewer">Go to the building</a>
            `).openPopup();
        this.markers.push(marker);
      });

      // Create polyline if specified
      if (this.createLine && this.markers.length > 1) {
        const latLngs = this.markers.map(marker => marker.getLatLng());
        this.polyline = L.polyline(latLngs, { color: 'white', className: "path", weight: 6}).addTo(this.map);
      }

      this.fitBounds();
    }).catch(error => {
      console.error('Error loading Leaflet', error);
    });
  }

  private fitBounds(): void {
    if (this.markers.length === 0 || !this.map) {
      console.log('No markers to fit bounds');
      return;
    }

    if (!window['L']) {
      console.error('Leaflet library not available.');
      return;
    }

    const L = window['L'];

    const markerGroup = L.featureGroup(this.markers);
    const bounds = markerGroup.getBounds();
    this.map.fitBounds(bounds);
  }

}
