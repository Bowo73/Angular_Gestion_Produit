// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../Model/product';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:5001/';

  public constructor(private _httpClient: HttpClient) { }

  private products: Product[]= [
    { productId: 1, productName: 'Produit 1', productTexture: 'Texture 1', productGrammage: 100, productColor: 'Rouge' },
    { productId: 2, productName: 'Produit 2', productTexture: 'Texture 2', productGrammage: 200, productColor: 'Bleu' },
    { productId: 3, productName: 'Produit 3', productTexture: 'Texture 3', productGrammage: 300, productColor: 'Vert' },
    { productId: 4, productName: 'Produit 4', productTexture: 'Texture 4', productGrammage: 400, productColor: 'Jaune' },
    { productId: 5, productName: 'Produit 5', productTexture: 'Texture 5', productGrammage: 500, productColor: 'Noir' },
    // Ajoutez d'autres produits ici
  ];

  private _products = this._httpClient.get<Product[]>('assets/products.json');

  addProduct(product:Product): Observable<Product> {

    return this._httpClient.post<any>(this.apiUrl, product);

  }

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<any[]>(this.apiUrl);
    }

  getProductById(productId: number): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/${productId}`);
  }

  updateProduct(productId: number, product: any): Observable<any> {
    return this._httpClient.put<any>(`${this.apiUrl}/${productId}`, product);

  }
}
