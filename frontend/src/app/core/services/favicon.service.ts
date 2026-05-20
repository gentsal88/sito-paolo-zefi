import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FaviconService {
  private defaultHref: string | null = null;

  setFavicon(href: string, type = 'image/x-icon') {
    const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.type = type;
      newLink.href = href;
      document.head.appendChild(newLink);
      return;
    }

    if (!this.defaultHref) this.defaultHref = link.href;
    link.href = href;
    link.type = type;
  }

  resetFavicon() {
    const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (link && this.defaultHref) {
      link.href = this.defaultHref;
    }
  }
}
