import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaAntecedentes2Component } from './medicina-antecedentes-2.component';

describe('MedicinaAntecedentes2Component', () => {
  let component: MedicinaAntecedentes2Component;
  let fixture: ComponentFixture<MedicinaAntecedentes2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaAntecedentes2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaAntecedentes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
