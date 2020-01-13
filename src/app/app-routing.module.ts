import { RouterModule, Routes } from '@angular/router';
import { HOME_PATH } from './shared';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

// Route-Definitionen fuer den Root-Router
const routes: Routes = [
    {
        path: '',
        redirectTo: HOME_PATH,
        // redirect erfordert pathMatch full
        pathMatch: 'full',
    },
    {
        path: HOME_PATH,
        component: HomeComponent,
    },
    {
        path: 'kunden',
        // Lazy Loading durch dynamische Imports
        // loadChildren statt component wie bei 'home'
        loadChildren: () =>
            import('./kunde/kunde-routing.module').then(
                mod => mod.KundeRoutingModule,
            ),
    },
];

@NgModule({
    exports: [RouterModule],
    // https://angular.io/guide/router
    // https://next.angular.io/api/router/RouterModule
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
