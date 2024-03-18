import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ThemeSelectorComponent } from './components';
import { Stream } from './models';
import { SupabaseService } from './services';
import { streamInitAction } from './state';

interface ListItem {
  title: string;
  subtitle: string;
  icon: string;
  link: Array<string>;
}

interface ListCategory {
  header: string;
  items: Array<ListItem>;
}

const components: Array<Type<unknown>> = [ThemeSelectorComponent];
const directives: Array<Type<unknown>> = [LetDirective, RouterLink, RouterLinkActive, RouterOutlet];
const modules: Array<Type<unknown>> = [
  ClipboardModule,
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
];
const services: Array<Type<unknown>> = [SupabaseService];

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
  readonly currentLocation: string = this.router.url;
  readonly navigationCategories: Array<ListCategory> = [
    {
      header: 'Directory',
      items: [
        {
          title: 'Dashboard',
          subtitle: 'View all existing VODs.',
          icon: 'dashboard',
          link: ['/dashboard'],
        },
        {
          title: 'Favorites',
          subtitle: 'View your favorite VODs.',
          icon: 'favorite',
          link: ['/favorites'],
        },
      ],
    },
    {
      header: 'System',
      items: [
        {
          title: 'Settings',
          subtitle: 'Adjust your profile settings.',
          icon: 'settings',
          link: ['/settings'],
        },
        {
          title: 'About',
          subtitle: 'Learn about this application.',
          icon: 'help',
          link: ['/about'],
        },
      ],
    },
  ];
  readonly title: string = 'Seagull Archive';

  @ViewChild('drawer', { static: true }) drawer: MatDrawer;

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly snackBar: MatSnackBar,
    private readonly store: Store,
    private readonly supabaseService: SupabaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.registerIcons();

    this.supabaseService.getRealtime('rooms', 'status');

    const table = 'streams';
    const query = `
      *,
      chapters (
        id,
        offset,
        duration,
        game:games ( id, title, description, slug, thumbnailUrl )
      ),
      tags ( id, name )
    `;
    const streams = await this.supabaseService.getDatabaseRows<Stream>(table, query);
    streams.forEach((stream) => {
      stream.thumbnailUrls = [...Array(6).keys()].map((i) => {
        const path = `${stream.broadcastId}/${stream.broadcastId}-storyboard-${i}.jpg`;
        return this.supabaseService.getStorageUrl('thumbnails', path);
      });
    });
    console.log('AppComponent.ngOnInit.streams:', streams);
    this.store.dispatch(streamInitAction({ streams: streams }));
  }

  onBookmarkClicked(): void {
    console.log('Bookmark');
  }

  onClipboardCopied(): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
    };
    this.snackBar.open('Copied URL to clipboard.', undefined, config);
  }

  onFavoritesClicked(): void {
    console.log('Favorites');
  }

  onSettingsClicked(): void {
    console.log('Settings');
  }

  async onToggleDrawerClicked(): Promise<void> {
    await this.drawer.toggle();
  }

  private registerIcons(): void {
    const icons = new Map<string, string>([
      ['github', 'assets/images/svg/github.svg'],
      ['instagram', 'assets/images/svg/instagram.svg'],
      ['twitch', 'assets/images/svg/twitch.svg'],
      ['twitter', 'assets/images/svg/twitter.svg'],
      ['youtube', 'assets/images/svg/youtube.svg'],
    ]);
    for (const [name, path] of icons) {
      this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(path));
    }
  }
}
