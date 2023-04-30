import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private http = inject(HttpClient)
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor() { }

  // getSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
  //   return this.http.get(
  //     serviceEndpoint + `?page=${dataRq.page}&count=${dataRq.count}&sortType=${dataRq.sortType}`);
  // }

  // createSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
  //   return this.http.post(serviceEndpoint, JSON.stringify({ "Subscribers": [dataRq] }));
  // }

  // deleteSubscribers(serviceEndpoint: string): Observable<any> {
  //   return this.http.delete(serviceEndpoint);
  // }


  // updateSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
  //   return this.http.put(serviceEndpoint+`${dataRq.Id}`, JSON.stringify(dataRq));
  // }
  // getHeroes(heroesUrl: any): Observable<any[]> {
  //   return this.http.get<any[]>(heroesUrl)
  // }

  refreshDatasource(data:any): Observable<any[]> {
    let result: any[] = [];

    // let randomlyFilledList = this.getTenRandomElements();
    result.push(data);
    return of(result);
    // return result;
  }

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
