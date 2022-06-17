import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometriaHallazgosComponent } from './optometria-hallazgos.component';

describe('OptometriaHallazgosComponent', () => {
  let component: OptometriaHallazgosComponent;
  let fixture: ComponentFixture<OptometriaHallazgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptometriaHallazgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptometriaHallazgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
