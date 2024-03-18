import { ClipboardModule } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TimeSpanPipe } from '../../directives';
import { Stream } from '../../models';
import { StoryboardImageComponent } from '../storyboard-image/storyboard-image.component';

const components: Array<Type<unknown>> = [StoryboardImageComponent];
const directives: Array<Type<unknown>> = [RouterLink, RouterLinkActive, TimeSpanPipe];
const modules: Array<Type<unknown>> = [
  ClipboardModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
];
const services: Array<Type<unknown>> = [];

@Component({
  selector: 'sqzy-stream-list-item',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './stream-list-item.component.html',
  styleUrl: './stream-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamListItemComponent {
  @Input() stream: Stream;

  constructor(private readonly snackBar: MatSnackBar) {}

  onClipboardCopied(): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
    };
    this.snackBar.open('Copied URL to clipboard.', undefined, config);
  }

  onFavoriteClicked(): void {
    console.log('onFavoriteClicked');
  }

  onThumbnailClicked(): void {
    console.log('onThumbnailClicked');
  }
}
