import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoupGameComponent } from './views/soup-game/soup-game.component';

const routes: Routes = [
  { path: 'home', component: SoupGameComponent },
  { path: '', component: SoupGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
