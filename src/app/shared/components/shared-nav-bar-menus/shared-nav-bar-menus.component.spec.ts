import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNavBarMenusComponent } from './shared-nav-bar-menus.component';

describe('SharedNavBarMenusComponent', () => {
  let component: SharedNavBarMenusComponent;
  let fixture: ComponentFixture<SharedNavBarMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedNavBarMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedNavBarMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
