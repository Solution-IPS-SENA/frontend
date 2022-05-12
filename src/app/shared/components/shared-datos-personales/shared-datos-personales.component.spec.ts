import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDatosPersonalesComponent } from './shared-datos-personales.component';

describe('SharedDatosPersonalesComponent', () => {
  let component: SharedDatosPersonalesComponent;
  let fixture: ComponentFixture<SharedDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedDatosPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
