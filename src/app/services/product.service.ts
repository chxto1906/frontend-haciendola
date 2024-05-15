import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductUpdate } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products'
  }

  getProducts(page: number=1, pageSize: number = 5): Observable<{result:Product[]}> {
    try{
        return this.http.get<{result:Product[]}>(`${this.myAppUrl}${this.myApiUrl}?page=${page}&pageSize=${pageSize}`).pipe(share())
    }catch(e){
      console.log('======',e)
    }
    return new Observable()
    
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  createProduct(product: ProductUpdate): Observable<{error: boolean, result: any, message: string}> {
    return this.http.post<{error: boolean, result: any, message: string}>(`${this.myAppUrl}${this.myApiUrl}`, product)
  }

  updateProduct(id: number, product: ProductUpdate): Observable<{error: boolean, result: any, message: string}> {
    return this.http.put<{error: boolean, result: any, message: string}>(`${this.myAppUrl}${this.myApiUrl}/${id}`, product)
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
}