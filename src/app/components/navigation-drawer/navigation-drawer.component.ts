import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [RouterLink, RouterLinkActive];
const modules: Array<Type<unknown>> = [MatDividerModule, MatIconModule, MatListModule, TranslateModule];
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
      header: 'navbar.category.directory',
      items: [
        {
          id: 0,
          title: 'navbar.item.dashboard.title',
          subtitle: 'navbar.item.dashboard.subtitle',
          icon: 'dashboard',
          link: ['/'],
        },
        {
          id: 1,
          title: 'navbar.item.favorites.title',
          subtitle: 'navbar.item.favorites.subtitle',
          icon: 'favorite',
          link: ['/favorites'],
        },
      ],
    },
    {
      id: 1,
      header: 'navbar.category.system',
      items: [
        {
          id: 0,
          title: 'navbar.item.settings.title',
          subtitle: 'navbar.item.settings.subtitle',
          icon: 'settings',
          link: ['/settings'],
        },
        {
          id: 1,
          title: 'navbar.item.about.title',
          subtitle: 'navbar.item.about.subtitle',
          icon: 'help',
          link: ['/about'],
        },
      ],
    },
  ];
}
