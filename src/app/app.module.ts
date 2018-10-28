import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MostrarMapaComponent } from './mostrar-mapa/mostrar-mapa.component';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  { path: 'detalle/civil'  , component: MostrarMapaComponent , data :{tipo:'civil'} },
  { path: 'detalle/evento' , component: MostrarMapaComponent , data :{tipo:'evento'}},
  { path: 'home'           , component: HomeComponent },
  { path: '**'             , component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MostrarMapaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyBvMSADcWCPCYXSfZC2gkRFpKfOIMNDwX4',  
      apiKey: 'AIzaSyCp3OmUot6QK-FqlR7mrpn7mIZ-mvG0K7o',  //Nico
      libraries: ["places"]
      }),
    RouterModule.forRoot(appRoutes,{'useHash': true})      
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
