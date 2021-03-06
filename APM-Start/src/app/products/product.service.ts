import {Injectable} from "@angular/core";
import {IProducts} from "./products";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {tap, catchError} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts() : Observable<IProducts[]> {
    return  this.http.get<IProducts[]>(this.productUrl).pipe(
      tap(data => console.log('All:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent) {
      errorMessage = `An error occured`;
    } else {
      errorMessage = "else error part"
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}

