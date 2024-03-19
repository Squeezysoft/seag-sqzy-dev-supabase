import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription, timer } from 'rxjs';
import { StoryboardImageStore } from './storyboard-image.store';

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [AsyncPipe];
const modules: Array<Type<unknown>> = [CommonModule, MatProgressSpinnerModule];
const services: Array<Type<unknown>> = [StoryboardImageStore];

@UntilDestroy()
@Component({
  selector: 'sqzy-storyboard-image',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './storyboard-image.component.html',
  styleUrl: './storyboard-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryboardImageComponent implements OnInit, OnChanges, OnDestroy {
  readonly vm$ = this.store.vm$;

  isHovered: boolean = false;
  timerSubscription: Subscription | null = null;

  @Input() imageUrls: Array<string> = [];
  @Input() duration: number = 1000;
  @Input() alt: string = 'Storyboard Image';
  @Input() width: number = 320;
  @Input() height: number = 180;

  @ViewChild('image') imageElementRef: ElementRef<HTMLImageElement>;

  constructor(private readonly store: StoryboardImageStore) {}

  ngOnInit(): void {
    this.setupTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { duration, imageUrls } = changes;

    if (duration && duration.currentValue) {
      this.setupTimer();
    }

    if (imageUrls && imageUrls.currentValue) {
      this.store.fetchImageData(this.imageUrls);
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  onMouseEnter(event: MouseEvent): void {
    this.isHovered = true;
  }

  onMouseLeave(event: MouseEvent): void {
    this.isHovered = false;
    this.store.resetIndex();
  }

  private clearTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private setupTimer(): void {
    this.clearTimer();
    this.timerSubscription = timer(0, this.duration).subscribe(() => {
      if (this.imageUrls.length > 0 && this.isHovered) {
        this.store.incrementIndex();
      }
    });
  }
}
