import { Route } from '@angular/router';

export const KitsROUTES: Route[] = [
  {
    path: 'merge',
    pathMatch: 'full',
    loadComponent: () =>
      import('./merge/merge.component').then((mod) => mod.MergeComponent),
  },
  {
    path: 'split',
    pathMatch: 'full',
    loadComponent: () =>
      import('./split/split.component').then((mod) => mod.SplitComponent),
  },
  {
    path: 'organize',
    pathMatch: 'full',
    loadComponent: () =>
      import('./organize/organize.component').then(
        (mod) => mod.OrganizeComponent,
      ),
  },
];
