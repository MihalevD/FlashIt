import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { GamesTabComponent } from './games-tab/games-tab.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInComponent } from './login/log-in/log-in.component';
import { RegistrationComponent } from './registration/registration/registration.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'games', component: GamesTabComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}