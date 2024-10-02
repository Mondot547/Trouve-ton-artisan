import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArtisanListComponent } from './pages/artisan-list/artisan-list.component';
import { ArtisanProfileComponent } from './pages/artisan-profile/artisan-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'artisans-list',
    component: ArtisanListComponent,
  },
  //category routes
  {
    path: 'batiment',
    component: CategoryComponent,
    data: { category: 'Bâtiment' },
  },
  {
    path: 'services',
    component: CategoryComponent,
    data: { category: 'Services' },
  },
  {
    path: 'fabrication',
    component: CategoryComponent,
    data: { category: 'Fabrication' },
  },
  {
    path: 'alimentation',
    component: CategoryComponent,
    data: { category: 'Alimentation' },
  },
  {
    path: 'artisan/:id',
    component: ArtisanProfileComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
