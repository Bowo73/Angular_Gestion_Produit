// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../Model/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { id: 1, nom: 'Produit 1', texture: 'Texture 1', grammage: 100, couleur: 'Rouge' },
    { id: 2, nom: 'Produit 2', texture: 'Texture 2', grammage: 200, couleur: 'Bleu' },
    { id: 3, nom: 'Produit 3', texture: 'Texture 3', grammage: 300, couleur: 'Vert' },
    { id: 4, nom: 'Produit 4', texture: 'Texture 4', grammage: 400, couleur: 'Jaune' },
    { id: 5, nom: 'Produit 5', texture: 'Texture 5', grammage: 500, couleur: 'Noir' },
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
