import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { selectStream } from '../../state';

const directives: Array<Type<unknown>> = [AsyncPipe, JsonPipe];
const modules: Array<Type<unknown>> = [MatChipsModule, MatIconModule, MatListModule];

@Component({
  selector: 'sqzy-stream-page',
  standalone: true,
  imports: [...directives, ...modules],
  templateUrl: './stream-page.component.html',
  styleUrl: './stream-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamPageComponent {
  readonly stream$ = this.store.select(selectStream);

  constructor(private readonly store: Store) {}
}
