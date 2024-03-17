import { Component, OnInit, Type } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Stream } from './models';
import { SupabaseService } from './services';

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [RouterOutlet];
const modules: Array<Type<unknown>> = [MatCardModule];
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
  constructor(
    private readonly store: Store,
    private readonly supabaseService: SupabaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    //this.supabaseService.getRealtime('rooms', 'status');

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
  }
}
