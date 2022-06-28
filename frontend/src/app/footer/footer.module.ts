import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, RouterModule, SvgIconModule],
  exports: [FooterComponent],
})
export class FooterModule {}
