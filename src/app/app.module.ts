import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarModule } from './main-navbar/main-navbar.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GamesTabComponent } from './games-tab/games-tab.component';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { FooterModule } from './footer/footer.module';
import { SvgIconModule } from './svg-icon/svg-icon.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    HomePageComponent,
    GamesTabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainNavbarModule,
    RegistrationModule,
    LoginModule,
    FooterModule,
    SvgIconModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
