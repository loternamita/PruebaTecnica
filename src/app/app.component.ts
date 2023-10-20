import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title: string;
  public identity;
  public validarIdentidad;

  constructor(private userService: UserService){
    this.title = 'The W Social'
    this.identity = new User('','','','','','','','');
    this.validarIdentidad = false;
  }

  isEmptyObject(obj: any): boolean {
    for (let key in obj) {
      if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(){

    this.identity = this.userService.getIdentity();
    this.validarIdentidad = this.isEmptyObject(this.identity);

  }

  ngDoCheck(){
    this.identity = this.userService.getIdentity();
    this.validarIdentidad = this.isEmptyObject(this.identity);
  }

}
