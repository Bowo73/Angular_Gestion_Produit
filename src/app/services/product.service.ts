// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';

@Injectable({ providedIn: 'any' })
export class ProductService {

  private apiUrl = 'http://localhost:5252/api/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Ajouter d'autres en-têtes si nécessaire
      }),
      mode: 'no-cors' // Définir le mode de la demande sur "no-cors"
    };

    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: number): Observable<Product> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Ajouter d'autres en-têtes si nécessaire
      }),
      mode: 'no-cors' // Définir le mode de la demande sur "no-cors"
    };

    return this.httpClient.get<Product>(`${this.apiUrl}/${productId}`);
  }

  addProduct(product: Product): Observable<Product> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Ajouter d'autres en-têtes si nécessaire
      }),
      mode: 'no-cors' // Définir le mode de la demande sur "no-cors"
    };

    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(productId: number, product: Product): Observable<Product> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Ajouter d'autres en-têtes si nécessaire
      }),
      mode: 'no-cors' // Définir le mode de la demande sur "no-cors"
    };

    return this.httpClient.put<Product>(`${this.apiUrl}/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<void> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Ajouter d'autres en-têtes si nécessaire
      }),
      mode: 'no-cors' // Définir le mode de la demande sur "no-cors"
    };

    return this.httpClient.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
