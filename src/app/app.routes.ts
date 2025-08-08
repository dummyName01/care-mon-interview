import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth/auth-guard';
import { List } from './list/list';
import { Home } from './dashboard/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            { path: '', component: Home }, // default inside dashboard
            { path: 'list', component: List }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
