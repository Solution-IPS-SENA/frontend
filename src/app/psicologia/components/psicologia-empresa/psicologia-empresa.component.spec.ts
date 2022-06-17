import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologiaEmpresaComponent } from './psicologia-empresa.component';

describe('PsicologiaEmpresaComponent', () => {
  let component: PsicologiaEmpresaComponent;
  let fixture: ComponentFixture<PsicologiaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicologiaEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
