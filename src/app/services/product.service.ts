// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../Model/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { id: 1, name: 'Produit 1', texture: 'Texture 1', grammage: 500, color: 'Rouge' },
    // Ajoutez d'autres produits ici
  ];

  public addProduct(p: Product): void {
    this.products.push();
  }

  getProducts(): Observable<any[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<any> {
    return of(this.products.find(product => product.id === id));
  }

  updateProduct(product: any): void {
    // Ajout ou mise à jour du produit
    // Assurez-vous d'implémenter la logique nécessaire ici
  }
}
