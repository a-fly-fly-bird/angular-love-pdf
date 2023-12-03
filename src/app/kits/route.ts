import { Route } from '@angular/router';

export const KitsROUTES: Route[] = [
  {
    path: 'merge',
    loadComponent: () =>
      import('./merge/merge.component').then((mod) => mod.MergeComponent),
  },
  // ...
];
