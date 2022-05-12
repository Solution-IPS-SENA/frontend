import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPrincipalDatosPersonalesComponent } from './shared-principal-datos-personales.component';

describe('SharedPrincipalDatosPersonalesComponent', () => {
  let component: SharedPrincipalDatosPersonalesComponent;
  let fixture: ComponentFixture<SharedPrincipalDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedPrincipalDatosPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPrincipalDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
