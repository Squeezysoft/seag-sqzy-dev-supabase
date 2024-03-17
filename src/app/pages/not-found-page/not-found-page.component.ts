import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqzy-not-found-page',
  standalone: true,
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  title: string = '404 Not Found';
}
