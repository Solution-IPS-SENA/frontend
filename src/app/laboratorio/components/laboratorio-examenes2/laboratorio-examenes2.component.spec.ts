import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioExamenes2Component } from './laboratorio-examenes2.component';

describe('LaboratorioExamenes2Component', () => {
  let component: LaboratorioExamenes2Component;
  let fixture: ComponentFixture<LaboratorioExamenes2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioExamenes2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioExamenes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
