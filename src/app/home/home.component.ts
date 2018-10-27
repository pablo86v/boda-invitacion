import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
declare var $;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {




  ngOnInit(){
    var fecha1 = moment().format('YYYY-MM-DD');
    var fecha2 = moment('2018-11-17');
    $("#miFecha").append(fecha2.diff(fecha1, 'days'));
    console.log("Faltan:" + fecha2.diff(fecha1, 'days'))
    
  }

  goTo(value){
    location.href = value;
  }


}