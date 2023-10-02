import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {env} from '..//env'
import { Observable } from 'rxjs';
import { ChatMessage, LoginUser, Search } from 'src/utilites/interfaces/interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  fetchAllMessages(): Observable<any> {  
    return this.http.get<any>(env.endpoint + '/messages');  
}
fetchAllUsersById(id:number): Observable<any> {  
  return this.http.post<any>(`${env.endpoint}/users/getAll`,{userId:id});  
}
fetchMessagesByUserId(id: number): Observable<any> {
  return this.http.get<any>(`${env.endpoint}/messages/${id}`);
}
fetchUsersByMorph(morph:Search): Observable<any> {
  return this.http.post<any>(`${env.endpoint}/users/search`,morph);
}
postMessage(message:ChatMessage): Observable<any> {
  return this.http.post<any>(`${env.endpoint}/messages`,message);
}
postLogin(login: LoginUser): Observable<any> {
  return this.http.post(
    `${env.endpoint}/users/login`,
    login
  );
}
postUser(register: LoginUser): Observable<any> {
  return this.http.post(`${env.endpoint}/users`, register);
}

}