import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [];
const modules: Array<Type<unknown>> = [
  MatBadgeModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTooltipModule,
];
const services: Array<Type<unknown>> = [];

@Component({
  selector: 'sqzy-account-selector',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './account-selector.component.html',
  styleUrl: './account-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSelectorComponent {
  notificationCount: number = 69;
}
