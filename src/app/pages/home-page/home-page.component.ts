import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoryboardImageComponent } from '../../components';
import { TimeSpanPipe } from '../../directives';
import { Stream } from '../../models';
import { SupabaseService } from '../../services';
import { selectAllStreams } from '../../state';

const components: Array<Type<unknown>> = [StoryboardImageComponent];
const directives: Array<Type<unknown>> = [
  AsyncPipe,
  JsonPipe,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  TimeSpanPipe,
];
const modules: Array<Type<unknown>> = [MatCardModule, MatChipsModule, MatIconModule, MatListModule, MatTooltipModule];
const services: Array<Type<unknown>> = [SupabaseService];

@Component({
  selector: 'sqzy-home-page',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly streams$ = this.store.select(selectAllStreams);

  constructor(private readonly store: Store) {}

  async onThumbnailClicked(stream: Stream): Promise<void> {
    console.log('onThumbnailClicked:', stream);
  }
}
