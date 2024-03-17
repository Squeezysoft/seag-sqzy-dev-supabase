import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, fromEvent, timer } from 'rxjs';
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
export class StoryboardImageComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
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

  ngAfterViewInit(): void {
    this.setupHover();
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
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  onMouseEnter(event: MouseEvent): void {
    this.isHovered = true;
  }

  onMouseLeave(event: MouseEvent): void {
    this.isHovered = false;
  }

  private setupHover(): void {
    const enter$ = fromEvent(this.imageElementRef.nativeElement, 'mouseenter');
    const leave$ = fromEvent(this.imageElementRef.nativeElement, 'mouseleave');

    enter$.pipe(untilDestroyed(this)).subscribe(() => console.log('onMouseEnter'));
    leave$.pipe(untilDestroyed(this)).subscribe(() => console.log('onMouseLeave'));
  }

  private setupTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(0, this.duration).subscribe(() => {
      if (this.imageUrls.length > 0 && this.isHovered) {
        this.store.incrementIndex();
      }
    });
  }
}
