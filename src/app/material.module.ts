
import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MatToolbarModule}          from '@angular/material/toolbar';
import { MatMenuModule}             from '@angular/material/menu';
import { MatIconModule}             from '@angular/material/icon';
import { MatSidenavModule}          from '@angular/material/sidenav';
import { MatCardModule}             from '@angular/material/card';
import { MatButtonModule}           from '@angular/material/button';
import { MatTabsModule}             from '@angular/material/tabs'; 
import { MatFormFieldModule}        from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule ,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule, 
    MatInputModule ,
    MatSelectModule
  ]
})
export class MaterialModule {}