import { Component, OnInit, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { Router, Route, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-mostrar-mapa',
  templateUrl: './mostrar-mapa.component.html',
  styleUrls: ['./mostrar-mapa.component.css']
})
export class MostrarMapaComponent implements OnInit {

  @Input() public coordenadasOrig: string;
  @Input() public coordenadasDest: string;


  titulo: string = 'Civil';
  lat: number = -34.8605773;
  lng: number = -58.3842011;
  zoom: number = 14;

  //  civil -34.8605773,-58.3842011

  directionDisplay;
  rutasAlternativas = [];
  distancia;
  tiempoDemora;
  tipo;

  private distanciaEntrePuntos;
  private puntoMarcar: string;
  private markers = [];
  private latLng;

  constructor(public mapsAPILoader: MapsAPILoader,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      param =>{
        console.log(param)
      }
    )

  }

}
