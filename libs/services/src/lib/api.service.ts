import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService<T> {
  BASE_URL: string;
  constructor(
    private http: HttpClient,
    @Inject('ENV_CONFIG') private envConfig: any
  ) {
    this.BASE_URL = this.envConfig.API_URL;
  }

  getAll(apiPath: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.BASE_URL}/${apiPath}`);
  }

  getById(apiPath: string, id: any): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${apiPath}/${id}`);
  }

  create(apiPath: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}/${apiPath}`, item);
  }

  update(apiPath: string, id: string, item: T): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}/${apiPath}/${id}`, item);
  }

  delete(apiPath: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${apiPath}/${id}`);
  }
}
