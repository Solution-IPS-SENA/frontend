import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometriaSintomasComponent } from './optometria-sintomas.component';

describe('OptometriaSintomasComponent', () => {
  let component: OptometriaSintomasComponent;
  let fixture: ComponentFixture<OptometriaSintomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptometriaSintomasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptometriaSintomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
