import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  private readonly primaryTitle: string = 'Seagull Archive';

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);
    if (routeTitle !== undefined) {
      this.title.setTitle(`${this.primaryTitle} | ${routeTitle}`);
    }
  }
}
