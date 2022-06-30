import { SafePipe } from './safe.pipe';
import { PlayComponent } from './play.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [PlayComponent, SafePipe],
  imports: [CommonModule, RouterModule, SvgIconModule],
  exports: [PlayComponent],
})
export class PlayModule {}
