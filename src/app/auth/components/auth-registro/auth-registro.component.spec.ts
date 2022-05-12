import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegistroComponent } from './auth-registro.component';

describe('AuthRegistroComponent', () => {
  let component: AuthRegistroComponent;
  let fixture: ComponentFixture<AuthRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
