import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should have the correct welcome message', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.mensajeBienvenida).toEqual('¡Bienvenido a mi aplicación Angular!');
  });

  it('should set the current date and time', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const now = new Date();
    expect(app.fechaActual.getFullYear()).toBe(now.getFullYear());
    expect(app.fechaActual.getMonth()).toBe(now.getMonth());
    expect(app.fechaActual.getDate()).toBe(now.getDate());
  });

});
