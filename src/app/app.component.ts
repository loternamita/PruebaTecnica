import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  mensajeBienvenida = '¡Bienvenido a mi aplicación Angular!';
  fechaActual = new Date();

}
