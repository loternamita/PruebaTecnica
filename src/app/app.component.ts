import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  valorNuevo = 'Hola mundooooo';
  mensajeBienvenida = '¡Bienvenido a mi aplicación Angular!';
  fechaActual = new Date();
  valorNuevo20 = '18.0';
}
