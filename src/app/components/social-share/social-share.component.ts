import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [];
const modules: Array<Type<unknown>> = [MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatMenuModule];
const services: Array<Type<unknown>> = [];

@Component({
  selector: 'sqzy-social-share',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialShareComponent {
  constructor(private readonly bottomSheetRef: MatBottomSheetRef<SocialShareComponent>) {}

  onNavigationClicked(): void {
    this.bottomSheetRef.dismiss();
  }
}
