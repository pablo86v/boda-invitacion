import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpDataService } from '../http-data.service';
import { ActivatedRoute } from '@angular/router';
declare let swal: any;
declare var $;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre;
  apellido;
  pageLocation

  constructor(public httpServ : HttpDataService,private route: ActivatedRoute){}


  ngOnInit(){
    var fecha1 = moment().format('YYYY-MM-DD');
    var fecha2 = moment('2018-11-17');
    $("#miFecha").append(fecha2.diff(fecha1, 'days'));
    // console.log("Faltan:" + fecha2.diff(fecha1, 'days'))
    
  }

  ngAfterViewInit(){
    this.route.params.subscribe(params => {
      this.pageLocation = params['pageLocation'] ;
      console.log("pageLoc:" + this.pageLocation)
      if(this.pageLocation) location.href = "#" + this.pageLocation;
    });
    
  }

  easterEgg(){
    let clave = prompt("Encontraste el huevo de pascua! Si nos conocés, ingresá nuestro número para acceder.", "Ingrese la clave");
    if (clave != null && clave.toString().trim() == "7" ) {
        this.httpServ.getAll().subscribe(
          data => {
            let txt = "";
            let items: any[] = data;
            items.forEach(element => {
              txt+=element.nombre + " " + element.apellido + "\n"
            });
            alert(txt);
          }
        )
    }
  }

  
  enviar(){
    
    let obj = { nombre : this.nombre, apellido : this.apellido}
    console.log(obj)
    this.httpServ.insert(obj).subscribe(
      data=> swal("Genial!", "Gracias por confirmar...nos vemos el sábado!", "success")
    )
  }
  
  
}