import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FxGlobalesProvider } from '../../providers/fxGlobales';
import { } from '@types/googlemaps';
import { } from 'googlemaps';
declare var google: any;
declare var $;



@Component({
  selector: 'mostrar-mapa',
  templateUrl: 'mostrar-mapa.html',
})
export class MostrarMapaPage {
  @Input() public coordenadasOrig: string;
  @Input() public coordenadasDest: string;


  titulo;

  directionDisplay;
  rutasAlternativas = [];
  distancia;
  tiempoDemora;

  private distanciaEntrePuntos;
  private puntoMarcar: string;
  private markers = [];
  private latLng;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public mapsAPILoader: MapsAPILoader,
    public fxG: FxGlobalesProvider,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {


  }

  ngOnInit() {
    this.titulo = this.navParams.get('titulo');
    console.log(this.navParams.get('punto'));
    if(this.navParams.get('punto'))
    {
      this.puntoMarcar = this.navParams.get('punto');

      this.mapsAPILoader.load().then(() => {
        this.directionDisplay = new google.maps.DirectionsRenderer;      

        this.iniciarMapaElegirPuntos();
      });
    }
    else
    {

      if (this.navParams.get('origen')) 
        this.coordenadasOrig = this.navParams.get('origen');
        
      if (this.navParams.get('destino')) 
        this.coordenadasDest = this.navParams.get('destino');
  
      if ((this.coordenadasOrig) && (this.coordenadasDest )){
        this.distanciaEntrePuntos = this.getKilometros(this.coordenadasOrig, this.coordenadasDest);
      }
      this.mapsAPILoader.load().then(() => {
        this.directionDisplay = new google.maps.DirectionsRenderer;       
        this.calcularRuta();
      });
    } 

  }

  rad = function (x) { 
    return x * Math.PI / 180; 
  }

  getKilometros = function (latLon1, latLon2) {
    var array_LatLon1 = (latLon1.toString()).split(',');
    var array_LatLon2 = (latLon2.toString()).split(',');

    var Lat1 = parseFloat(array_LatLon1[0]);
    var Lon1 = parseFloat(array_LatLon1[1]);
    var Lat2 = parseFloat(array_LatLon2[0]);
    var Lon2 = parseFloat(array_LatLon2[1]);

    var R = 6378.137; //Radio de la tierra en   km
    var dLat = this.rad(Lat2 - Lat1);

    var dLong = this.rad(Lon2 - Lon1);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
            Math.cos(this.rad(Lat1)) * Math.cos(this.rad(Lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
          
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3); //Retorna tres decimales
  }


  calcularRuta() {

    console.log("coordOrig:" + this.coordenadasOrig);
    console.log("coordDest:" + this.coordenadasDest);

    if (this.coordenadasOrig && this.coordenadasDest) {

      let aux = this.coordenadasOrig.split(",");
      let latOrigen, lngOrigen, latDestino, lngDestino
      latOrigen = aux[0];
      lngOrigen = aux[1];

      aux = this.coordenadasDest.split(",");
      latDestino = aux[0];
      lngDestino = aux[1];

      let self = this;
      let directionService = new google.maps.DirectionsService;

      let obj = $("#map")[0];

      let map = new google.maps.Map(obj, {
        zoom: 6,
        center: new google.maps.LatLng(latOrigen, lngOrigen)
        // componentRestrictions: {country: "ar"}
      });

      this.directionDisplay.setMap(map);
      let origen = new google.maps.LatLng(latOrigen, lngOrigen);
      let destino = new google.maps.LatLng(latDestino, lngDestino);

      directionService.route({
        origin: origen,
        destination: destino,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING
      },
        function (response, status) {
          console.log(response);
          if (status == google.maps.DirectionsStatus.OK) {
            self.directionDisplay.setDirections(response);
            self.rutasAlternativas = response.routes;
            self.distancia = response.routes[0].legs[0].distance.text;
            self.tiempoDemora = response.routes[0].legs[0].duration.text;           
          }
        });

    }
  }

  private iniciarMapaElegirPuntos()
  {
    let directionService = new google.maps.DirectionsService;

    let obj = $("#map")[0];

      let map = new google.maps.Map(obj, {
        zoom: 9,
        center: new google.maps.LatLng("-34.66335482005999", "-58.38523743182728")
      });
      this.directionDisplay.setMap(map);

      let marker;
      let self = this;

      map.addListener('click', function(e) {

        // console.log(e.latLng.lat());
        self.latLng = e.latLng.lat() +","+ e.latLng.lng();

        marker = new google.maps.Marker({
          position: e.latLng,
          title:"Hello World!"
        });

        
        //REMUEVO LOS MARKERS
        for (var i = 0; i < self.markers.length; i++ ) {
          self.markers[i].setMap(null);
        }
        self.markers.length = 0;

        marker.setMap(map);
        self.markers.push(marker);
      });
  }

  public aceptarPunto()
  {
    if(this.latLng)
    {
      this.fxG.iniciarSpinner();
  
      this.fxG.obtenerDireccionLegible(this.latLng).subscribe(
        data =>{ 
          if(data)
          {
            this.fxG.puntoMapa.next({
              punto: this.puntoMarcar,
              latLng: this.latLng,
              domicilio: data 
            });
            this.fxG.detenerSpinner();
            let index = this.viewCtrl.index;
            this.navCtrl.remove(index)
          }
        }
      );
    }
    else
      this.fxG.mostrarToast("Debe elegir algun punto del mapa");
  }



}
