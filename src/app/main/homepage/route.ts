import { Route } from '@angular/router';
import { HomepageComponent } from './homepage.component';

export const HomepageROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: HomepageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./card-list/card-list.component').then(
            (mod) => mod.CardListComponent,
          ),
      },
      {
        path: 'kits',
        pathMatch: 'prefix',
        loadChildren: () =>
          import('../../kits/route').then((mod) => mod.KitsROUTES),
      },
    ],
  },
];
