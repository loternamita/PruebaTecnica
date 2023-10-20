import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiResponse, User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public titleLogin: string;
  public user: User;
  public status: string;
  public message: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private userService: UserService

  ) {
    this.titleLogin = 'Identificate perro'
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    this.status = '';
    this.message = '';
    this.identity = new User('', '', '', '', '', '', '', '');;
    this.token = '';
  }

  ngOnInit(): void {
    console.log("Componente de login cargado")
  }

  onSubmit(loginForm: NgForm): void {
    //* Logear al usuario
    this.userService.signup(this.user).subscribe({
      next: (response: ApiResponse) => {
        if ('message' in response) {

          this.status = "Error";
          this.message = response.message;

        } else if ('user' in response) {

          this.identity = response.user;

          if (!this.identity) {
            this.status = 'Error';
            this.message = "No se encontro la informacion ingresada";
          } else {

            // Persistir datos del usuario
            localStorage.setItem('identity', JSON.stringify(this.identity));
            this.getToken();
            this.status = 'Success';
            loginForm.reset();
          }
        }
      },
      error: (err) => {
        if (err != null) {
          this.status = 'Error General';
          this.message = err.error.message;
        }
      }
    })
  }

  getToken() {
    //* Logear al usuario
    this.userService.signup(this.user, 'true').subscribe({
      next: (response: ApiResponse) => {

        if ('message' in response) {
          this.status = "Error";
          this.message = response.message;
        } else if ('token' in response) {

          this.token = response.token;
          if (this.token.length <= 0) {
            this.status = 'Error';
            this.message = 'No tiene acceso para ingresar';
          } else {
            // Persistir token del usuario
            localStorage.setItem('token', this.token);
            this.status = 'Success';
            console.log('Token generado: ', this.token);
          }
        }
      },
      error: (err) => {
        if (err != null) {
          this.status = 'Error General';
          this.message = err.error.message;
        }
      }
    })
  }
}
