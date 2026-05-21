import { signal } from '@angular/core';

export const adminState = {
  articles: signal<any[]>([]),
  loading: signal(false),
};
