import { AnimationTriggerMetadata, animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, JsonPipe, KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
const modules: Array<Type<unknown>> = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTooltipModule,
];
const services: Array<Type<unknown>> = [SupabaseService];

const driftInAnimationQuery = (triggerName: string, className: string): AnimationTriggerMetadata => {
  return trigger(triggerName, [
    transition(':enter', [
      query(className, [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        stagger(100, [animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))]),
      ]),
    ]),
  ]);
};

@Component({
  selector: 'sqzy-home-page',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    driftInAnimationQuery('driftInButtons', '.sqzy-animated-button'),
    driftInAnimationQuery('driftInCards', '.sqzy-container-card'),
  ],
})
export class HomePageComponent {
  readonly icons: Array<KeyValue<number, string>> = [
    {
      key: 0,
      value: 'github',
    },
    {
      key: 1,
      value: 'instagram',
    },
    {
      key: 2,
      value: 'twitch',
    },
    {
      key: 3,
      value: 'twitter',
    },
    {
      key: 4,
      value: 'youtube',
    },
  ];
  readonly streams$ = this.store.select(selectAllStreams);

  constructor(private readonly store: Store) {}

  async onThumbnailClicked(stream: Stream): Promise<void> {
    console.log('onThumbnailClicked:', stream);
  }
}
