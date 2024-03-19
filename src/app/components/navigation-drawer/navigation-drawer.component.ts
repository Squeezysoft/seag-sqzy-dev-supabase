import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [RouterLink, RouterLinkActive];
const modules: Array<Type<unknown>> = [MatDividerModule, MatIconModule, MatListModule];
const services: Array<Type<unknown>> = [TranslateService];

interface ListItem {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  link: Array<string>;
}

interface ListCategory {
  id: number;
  header: string;
  items: Array<ListItem>;
}

@Component({
  selector: 'sqzy-navigation-drawer',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './navigation-drawer.component.html',
  styleUrl: './navigation-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationDrawerComponent {
  readonly categories: Array<ListCategory> = [
    {
      id: 0,
      header: 'Directory',
      items: [
        {
          id: 0,
          title: 'Dashboard',
          subtitle: 'View all existing VODs.',
          icon: 'dashboard',
          link: ['/'],
        },
        {
          id: 1,
          title: 'Favorites',
          subtitle: 'View your favorite VODs.',
          icon: 'favorite',
          link: ['/favorites'],
        },
      ],
    },
    {
      id: 1,
      header: 'System',
      items: [
        {
          id: 0,
          title: 'Settings',
          subtitle: 'Adjust your profile settings.',
          icon: 'settings',
          link: ['/settings'],
        },
        {
          id: 1,
          title: 'About',
          subtitle: 'Learn about this application.',
          icon: 'help',
          link: ['/about'],
        },
      ],
    },
  ];
}
