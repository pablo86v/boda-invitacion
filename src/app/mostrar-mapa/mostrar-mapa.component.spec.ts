import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMapaComponent } from './mostrar-mapa.component';

describe('MostrarMapaComponent', () => {
  let component: MostrarMapaComponent;
  let fixture: ComponentFixture<MostrarMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
