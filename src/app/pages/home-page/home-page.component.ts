import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { StoryboardImageComponent } from '../../components';
import { TimeSpanPipe } from '../../directives';
import { Stream } from '../../models';
import { SupabaseService } from '../../services';
import { streamInitAction } from '../../state';

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
export class HomePageComponent implements OnInit {
  streamsSubject: BehaviorSubject<Array<Stream>> = new BehaviorSubject<Array<Stream>>([]);
  streams$ = this.streamsSubject.asObservable();

  constructor(
    private readonly store: Store,
    private readonly supabaseService: SupabaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    // this.supabaseService.getRealtime('rooms', 'status');

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
    console.log('streams:', streams);
    this.streamsSubject.next(streams);
    this.store.dispatch(streamInitAction({ streams: streams }));
  }

  async onThumbnailClicked(stream: Stream): Promise<void> {
    console.log('onThumbnailClicked:', stream);
  }
}
