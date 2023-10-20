import { Component, OnInit } from "@angular/core";

// Complements
import { NgForm } from "@angular/forms";
// Configurar rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
// Models
import { ApiResponse, User } from "src/app/models/user.model";
// Services
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public titleRegister: string;
  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.status = '';
    this.titleRegister = 'Registrate'
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
    console.log("Componente de register cargado")
  }

  onSubmit(registerForm: NgForm) {
    this._userService.register(this.user).subscribe({
      next: (response: ApiResponse) => {
        if ('message' in response) {
          this.status = response.message;
          registerForm.reset();
        } else {
          this.status = 'Registrado';
          registerForm.reset();
        }
      },
      error: (err) => {
        console.log(<User>err);
        this.status = err.message || "Error desconocido";
      }
    });
  }
}
