import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MainComponent } from './wall/main/main.component';
import { IsAuthGuard } from './shared/guards/is-auth.guard';
import { NotAuthGuard } from './shared/guards/not-auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from "./profile/profile/profile.component";
import { WindowComponent } from "./chat/window/window.component";


const routes: Routes = [
  {component: LoginComponent, path: 'login', canActivate: [NotAuthGuard]},
  {component: RegisterComponent, path: 'register', canActivate: [NotAuthGuard]},
  {component: NavbarComponent, path: 'wall', canActivate: [IsAuthGuard],
    children: [
      {path: '', component: MainComponent,},
      {path: 'profile', component: ProfileComponent,},
      {path: 'chat', component: WindowComponent,},
    ]},
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
