import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologiaCierreHistoriaComponent } from './psicologia-cierre-historia.component';

describe('PsicologiaCierreHistoriaComponent', () => {
  let component: PsicologiaCierreHistoriaComponent;
  let fixture: ComponentFixture<PsicologiaCierreHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicologiaCierreHistoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaCierreHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
