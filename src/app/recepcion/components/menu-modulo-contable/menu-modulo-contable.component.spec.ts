import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModuloContableComponent } from './menu-modulo-contable.component';

describe('MenuModuloContableComponent', () => {
  let component: MenuModuloContableComponent;
  let fixture: ComponentFixture<MenuModuloContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuModuloContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModuloContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
