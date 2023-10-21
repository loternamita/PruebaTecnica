import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Complements
import { FormsModule } from "@angular/forms";

//Componentes
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
