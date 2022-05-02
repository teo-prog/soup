import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoupGameComponent } from './views/soup-game/soup-game.component';
import { NoSpacesDirective } from './directives/no-spaces.directive';

@NgModule({
  declarations: [
    AppComponent,
    SoupGameComponent,
    NoSpacesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,                         
    ReactiveFormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
