import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNavBarComponent } from './shared-nav-bar.component';

describe('SharedNavBarComponent', () => {
  let component: SharedNavBarComponent;
  let fixture: ComponentFixture<SharedNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
