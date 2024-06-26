import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClasseServiceService {
  SERVER_URL: string = "http://localhost:8082/eduSchool/classe";

  constructor(private httpClient: HttpClient) { }

  public createclasse(classe:any,certif:File) {
    let formData = new FormData();
      formData.append('nom',classe.nom);
      formData.append('niveau',classe.niveau);

    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL + '/add'}`,formData)
  }
  public getclasses() {
    return this.httpClient.get<{ classes: any }>(this.SERVER_URL + '/getAll');
  }

  public updateclasse(classe: { _id: any; }) {
    return this.httpClient.put<{ message: string }>(`${this.SERVER_URL + '/update'}/${classe._id}`, classe)
  }
  public getclasseById(id: any) {
    return this.httpClient.get<{ classe: any }>(`${this.SERVER_URL + '/getById'}/${id}`);
  }
  public deleteclasse(id: any) {
    return this.httpClient.delete<{ message: string }>(`${this.SERVER_URL + '/delete'}/${id}`)
  }

}
