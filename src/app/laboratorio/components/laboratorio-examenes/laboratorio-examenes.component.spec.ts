import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioExamenesComponent } from './laboratorio-examenes.component';

describe('LaboratorioExamenesComponent', () => {
  let component: LaboratorioExamenesComponent;
  let fixture: ComponentFixture<LaboratorioExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioExamenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
