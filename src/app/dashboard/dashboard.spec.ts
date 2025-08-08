import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { AuthService } from '../auth/auth-service';
import { provideRouter, Router, Routes } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Dashboard', () => {
  let component: Dashboard;
let fixture: ComponentFixture<Dashboard>;
let authServiceSpy: jasmine.SpyObj<AuthService>;
let router: Router;

const mockRoutes: Routes = [
  { path: 'login', loadComponent: () => import('../login/login').then(m => m.Login) },
];

beforeEach(async () => {
  console.error = (e) => fail('Test error: ' + e);

  authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

  await TestBed.configureTestingModule({
    imports: [Dashboard, HttpClientTestingModule],
    providers: [
      { provide: AuthService, useValue: authServiceSpy },
      provideRouter(mockRoutes),
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  fixture = TestBed.createComponent(Dashboard);
  component = fixture.componentInstance;
  router = TestBed.inject(Router); // ✅ single inject
});

it('should create the dashboard component', () => {
  expect(component).toBeTruthy();
});

it('should call logout and navigate to login', fakeAsync(() => {
  spyOn(router, 'navigate'); // ✅ attach spy to correct router

  component.logout(); // should call authService.logout and navigate
  tick(); // simulate setTimeout

  expect(authServiceSpy.logout).toHaveBeenCalled();
  expect(router.navigate).toHaveBeenCalledWith(['/login']);
}));

});
