import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpan',
  standalone: true,
})
export class TimeSpanPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return `${hours}:${this.padTime(minutes)}:${this.padTime(seconds)}`;
  }

  private padTime(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
