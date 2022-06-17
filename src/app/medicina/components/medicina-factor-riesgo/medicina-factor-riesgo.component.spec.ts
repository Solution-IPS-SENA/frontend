import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaFactorRiesgoComponent } from './medicina-factor-riesgo.component';

describe('MedicinaFactorRiesgoComponent', () => {
  let component: MedicinaFactorRiesgoComponent;
  let fixture: ComponentFixture<MedicinaFactorRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaFactorRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaFactorRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
