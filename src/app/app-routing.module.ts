import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthPermissionsGuard } from './commons/guards/auth-permissions.guard';
import { IsloggedGuard } from './commons/guards/islogged.guard';
import { NavigationComponent } from './generic-componets/navigation/navigation.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [IsloggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [IsloggedGuard] },
  { path: 'dashboard', component: NavigationComponent, canActivate: [AuthPermissionsGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
