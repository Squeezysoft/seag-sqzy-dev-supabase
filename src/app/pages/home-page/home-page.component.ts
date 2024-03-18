import { AnimationTriggerMetadata, animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { StreamListItemComponent } from '../../components';
import { SupabaseService } from '../../services';
import { selectAllStreams } from '../../state';

const components: Array<Type<unknown>> = [StreamListItemComponent];
const directives: Array<Type<unknown>> = [AsyncPipe];
const modules: Array<Type<unknown>> = [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule];
const services: Array<Type<unknown>> = [SupabaseService];

const driftInAnimationQuery = (triggerName: string, selectorName: string): AnimationTriggerMetadata => {
  return trigger(triggerName, [
    transition(':enter', [
      query(selectorName, [
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
    { key: 0, value: 'github' },
    { key: 1, value: 'instagram' },
    { key: 2, value: 'twitch' },
    { key: 3, value: 'twitter' },
    { key: 4, value: 'youtube' },
  ];
  readonly streams$ = this.store.select(selectAllStreams);

  constructor(private readonly store: Store) {}
}
