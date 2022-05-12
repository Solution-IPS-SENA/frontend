import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPaginacionComponent } from './shared-paginacion.component';

describe('SharedPaginacionComponent', () => {
  let component: SharedPaginacionComponent;
  let fixture: ComponentFixture<SharedPaginacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedPaginacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPaginacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
