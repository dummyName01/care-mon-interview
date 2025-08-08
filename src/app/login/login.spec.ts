import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Login } from './login';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { of, throwError } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [Login, CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind email and password inputs', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('input[name="email"]');
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('input[name="password"]');

    // Simulate user entering values
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'securepassword';
    passwordInput.dispatchEvent(new Event('input'));

    // Trigger change detection again
    fixture.detectChanges();
    tick();

    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('securepassword');
  }));
  it('should login and navigate to dashboard on success', fakeAsync(() => {
    component.email = 'test@example.com';
    component.password = 'password123';
    authServiceSpy.login.and.returnValue(of({}));

    component.onSubmit();
    tick();  // Simulate async passage of time

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

    it('should set loginError on failed login', fakeAsync(() => {
    const errorMessage = 'Invalid credentials';
    authServiceSpy.login.and.returnValue(throwError(() => new Error(errorMessage)));

    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';
    component.onSubmit();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(component.loginError).toBe(errorMessage);
    expect(component.error).toBeTrue();
  }));



});
