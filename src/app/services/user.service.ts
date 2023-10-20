import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

// Models
import { ApiResponse, User } from '../models/user.model';
import { GLOBAL } from "../util/global";

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.identity = new User('','','','','','','','');
    this.token = '';
  }

  register(userRegister: User): Observable<ApiResponse> {

    let params = JSON.stringify(userRegister);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');

    return this._http.post<ApiResponse>(this.url + 'register', params, { headers: headers });
  }

  signup(userBody: User, gettoken = ''): Observable<ApiResponse> {

    // Mezcla superficial de userBody y { gettoken }
    let requestBody = { ...userBody, gettoken };

    if (gettoken != null) {
      requestBody.gettoken = gettoken;
    }

    let params = JSON.stringify(requestBody);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post<ApiResponse>(this.url + 'login', params, { headers: headers });
  }

  getIdentity(){
    let storageData = localStorage.getItem('identity');
    let identity;

    if (storageData) {
      identity = JSON.parse(storageData);
      this.identity = identity;
    }else{
      this.identity = new User('','','','','','','','');
    }

    return this.identity;
  }

  getToken(){
    let storageData = localStorage.getItem('token');

    if (storageData) {
      this.token = storageData;
    }else{
      this.token = '';
    }

    return this.token;
  }
}



