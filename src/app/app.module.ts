import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Complements
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

//Rutas
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }