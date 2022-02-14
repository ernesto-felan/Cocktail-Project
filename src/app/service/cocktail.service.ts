import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private API_URI_BASE: string = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getCocktailsByFirstLetter(letter: string): Observable<any> {
    return this.http.get<any>(this.API_URI_BASE + 'search.php?f=' + letter)
      .pipe(
        tap(_ => console.log(`fetched cocktails by the letter: ${letter}`)),
        catchError(this.handleError<any>('getCocktailsByFirstLetter', []))
      );
  }

  getCocktailsByName(name: string): Observable<any> {
    return this.http.get<any>(this.API_URI_BASE + 'search.php?s=' + name)
      .pipe(
        tap(_ => console.log(`fetched cocktails by the letter: ${name}`)),
        catchError(this.handleError<any>('getCocktailsByName', []))
      );
  }

  getCocktailsByCategory(category: string): Observable<any> {
    return this.http.get<any>(this.API_URI_BASE + 'filter.php?c=' + category)
      .pipe(
        tap(_ => console.log(`fetched cocktails by the category: ${category}`)),
        catchError(this.handleError<any>('getCocktailsByCategory', []))
      );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_URI_BASE + 'list.php?c=list')
      .pipe(
        tap(_ => console.log(`fetched categories`)),
        catchError(this.handleError<any>('getCategories', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
