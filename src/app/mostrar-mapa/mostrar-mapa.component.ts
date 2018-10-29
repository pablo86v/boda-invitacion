import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { } from 'googlemaps';

@Component({
  selector: 'app-mostrar-mapa',
  templateUrl: './mostrar-mapa.component.html',
  styleUrls: ['./mostrar-mapa.component.css']
})
export class MostrarMapaComponent implements OnInit {
  @ViewChild('AgmMap') map: any;
  lat;
  lng;
  titulo;
  parrafo;
  tipo;
  latCivil: number = -34.8605773;
  lngCivil: number = -58.3842011;
  latLunch: number = -34.801359;
  lngLunch: number = -58.390981;
  zoom: number = 14;
  idleMap: Subscription;

  // civil -34.8605773,-58.3842011
  // lunch -34.801359, -58.390981


  constructor(public mapsAPILoader: MapsAPILoader,
              private route: ActivatedRoute,
              private spinner : NgxSpinnerService){}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.spinner.show();
 
    this.route.params.subscribe(params => {
      this.tipo = params.tipo; 
      console.log("tipo:"+this.tipo)
      this.setCards(this.tipo); 
    });

    this.idleMap = (this.map._mapsWrapper as GoogleMapsAPIWrapper).subscribeToMapEvent('idle').subscribe(
      () => {
        setTimeout(() => { this.spinner.hide(); }, 2000);
      }
    );
  } 

  
  setCards(tipo){
    if(tipo == "civil"){
      this.tipo = "civil";
      this.lat = this.latCivil;
      this.lng = this.lngCivil;

    }else{
      
      this.parrafo = "";
      this.lat = this.latLunch;
      this.lng = this.lngLunch;
    }
  }


}
