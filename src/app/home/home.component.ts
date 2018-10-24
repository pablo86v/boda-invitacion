import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
declare var $;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  cars: any[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];

  ngOnInit(){
    var fecha1 = moment().format('YYYY-MM-DD');
    var fecha2 = moment('2018-11-17');
    $("#miFecha").append(fecha2.diff(fecha1, 'days'));
    console.log("Faltan:" + fecha2.diff(fecha1, 'days'))
    
  }


}