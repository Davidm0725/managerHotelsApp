import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private http = inject(HttpClient)
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  addHotel(serviceEndpoint: string, hotel: any): Observable<any> {
    return this.http.post<any>(serviceEndpoint, hotel, this.httpOptions).pipe(
      catchError(this.handleError<any>('addHotel'))
    );
  }

  updateStatusHotel(serviceEndpoint: string, hotel: any): Observable<any> {
    return this.http.put(serviceEndpoint, hotel, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHotel'))
    );
  }

  getHotels(serviceEndpoint: string): Observable<any> {
    return this.http.get(serviceEndpoint);
  }

}
