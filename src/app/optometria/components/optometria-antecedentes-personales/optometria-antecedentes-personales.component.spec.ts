import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometriaAntecedentesPersonalesComponent } from './optometria-antecedentes-personales.component';

describe('OptometriaAntecedentesPersonalesComponent', () => {
  let component: OptometriaAntecedentesPersonalesComponent;
  let fixture: ComponentFixture<OptometriaAntecedentesPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptometriaAntecedentesPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptometriaAntecedentesPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
