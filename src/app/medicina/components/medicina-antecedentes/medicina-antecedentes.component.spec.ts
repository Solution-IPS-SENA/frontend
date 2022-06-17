import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaAntecedentesComponent } from './medicina-antecedentes.component';

describe('MedicinaAntecedentesComponent', () => {
  let component: MedicinaAntecedentesComponent;
  let fixture: ComponentFixture<MedicinaAntecedentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaAntecedentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaAntecedentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
