import { PlayComponent } from './play/play.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { GamesTabComponent } from './games-tab/games-tab.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingComponent } from './landing/landing.component';
import { LogInComponent } from './login/log-in/log-in.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { UsersComponent } from './users/users.component';
import { AuthService } from './auth.service';
import { AdminService } from './admin.service';
import { NoAuthService } from './no-auth.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomePageComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthService, AdminService],
  },
  { path: 'edit', component: EditComponent, canActivate: [AuthService] },
  { path: 'create', component: CreateComponent },
  {
    path: 'play/:gameName',
    component: PlayComponent,
    data: { gameName: '', gameId: '' },
  },
  { path: 'games', component: GamesTabComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LogInComponent, canActivate: [NoAuthService] },
  {
    path: 'signup',
    component: RegistrationComponent,
    canActivate: [NoAuthService],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
