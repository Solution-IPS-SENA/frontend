import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaAntecedentesOcupacionalesComponent } from './medicina-antecedentes-ocupacionales.component';

describe('MedicinaAntecedentesOcupacionalesComponent', () => {
  let component: MedicinaAntecedentesOcupacionalesComponent;
  let fixture: ComponentFixture<MedicinaAntecedentesOcupacionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaAntecedentesOcupacionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaAntecedentesOcupacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});