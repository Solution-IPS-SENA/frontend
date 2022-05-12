import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometriaAntecedentesOcupacionalesComponent } from './optometria-antecedentes-ocupacionales.component';

describe('OptometriaAntecedentesOcupacionalesComponent', () => {
  let component: OptometriaAntecedentesOcupacionalesComponent;
  let fixture: ComponentFixture<OptometriaAntecedentesOcupacionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptometriaAntecedentesOcupacionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptometriaAntecedentesOcupacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
