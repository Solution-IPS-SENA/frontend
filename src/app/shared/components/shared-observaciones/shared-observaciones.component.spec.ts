import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedObservacionesComponent } from './shared-observaciones.component';

describe('SharedObservacionesComponent', () => {
  let component: SharedObservacionesComponent;
  let fixture: ComponentFixture<SharedObservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedObservacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
