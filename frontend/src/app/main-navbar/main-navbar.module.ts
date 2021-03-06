import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainNavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainNavbarComponent],
})
export class MainNavbarModule {}
