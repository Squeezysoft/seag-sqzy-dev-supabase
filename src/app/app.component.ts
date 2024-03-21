import { ChangeDetectionStrategy, Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AccountSelectorComponent,
  LanguageSelectorComponent,
  NavigationDrawerComponent,
  ThemeSelectorComponent,
} from './components';
import { SupabaseService } from './services';

const components: Array<Type<unknown>> = [
  AccountSelectorComponent,
  LanguageSelectorComponent,
  NavigationDrawerComponent,
  ThemeSelectorComponent,
];
const directives: Array<Type<unknown>> = [RouterLink, RouterLinkActive, RouterOutlet];
const modules: Array<Type<unknown>> = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  TranslateModule,
];
const services: Array<Type<unknown>> = [];

@Component({
  selector: 'sqzy-app',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly title: string = 'Seagull Archive';

  @ViewChild('drawer', { static: true }) drawer: MatDrawer;

  constructor(private readonly supabaseService: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.drawer.toggle();

    this.supabaseService.getRealtime('rooms', 'status');
  }

  async onToggleDrawerClicked(): Promise<void> {
    await this.drawer.toggle();
  }
}
