import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, forkJoin, switchMap, tap } from 'rxjs';

export interface StoryboardImageState {
  isLoading: boolean;
  index: number;
  isHovered: boolean;
  safeUrls: Array<SafeUrl>;
}

const initialState: StoryboardImageState = {
  isLoading: false,
  index: 0,
  isHovered: false,
  safeUrls: [],
};

@Injectable()
export class StoryboardImageStore extends ComponentStore<StoryboardImageState> {
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly index$ = this.select((state) => state.index);
  readonly safeUrls$ = this.select((state) => state.safeUrls);
  readonly activeSafeUrl$ = this.select(this.index$, this.safeUrls$, (index, safeUrls) => {
    return safeUrls[index];
  });

  readonly vm$ = this.select(
    this.isLoading$,
    this.index$,
    this.activeSafeUrl$,
    this.safeUrls$,
    (isLoading, index, activeSafeUrl, safeUrls) => {
      return {
        isLoading,
        index,
        activeSafeUrl,
        safeUrls,
      };
    },
  );

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
  ) {
    super(initialState);
  }

  readonly incrementIndex = this.updater((state) => {
    return {
      ...state,
      index: (state.index + 1) % state.safeUrls.length,
    };
  });

  readonly fetchImageData = this.effect((urls$: Observable<Array<string>>) => {
    return urls$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((urls) => {
        const requests = urls.map((url) => this.http.get(url, { responseType: 'blob' }));
        return forkJoin(requests).pipe(
          switchMap((blobs: Array<Blob>) => {
            return forkJoin(blobs.map((blob) => this.readBlobFile$(blob)));
          }),
          tapResponse(
            (results: Array<string>) => {
              const safeUrls = results.map((result) => this.sanitizer.bypassSecurityTrustUrl(result));
              this.patchState({ safeUrls: safeUrls });
            },
            (error) => {
              console.error('Error fetching image data:', error);
            },
            () => {
              this.patchState({ isLoading: false });
            },
          ),
        );
      }),
    );
  });

  private readBlobFile$(blob: Blob): Observable<string> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        observer.next(<string>reader.result);
        observer.complete();
      };
      reader.onerror = (event: ProgressEvent<FileReader>) => {
        observer.error(reader.error);
      };
      reader.readAsDataURL(blob);
    });
  }
}
