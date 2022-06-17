import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometriaAgudezaVisualComponent } from './optometria-agudeza-visual.component';

describe('OptometriaAgudezaVisualComponent', () => {
  let component: OptometriaAgudezaVisualComponent;
  let fixture: ComponentFixture<OptometriaAgudezaVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptometriaAgudezaVisualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptometriaAgudezaVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
