import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificacionesRemisionComponent } from './certificaciones-remision.component';

describe('CertificacionesRemisionComponent', () => {
  let component: CertificacionesRemisionComponent;
  let fixture: ComponentFixture<CertificacionesRemisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificacionesRemisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificacionesRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
