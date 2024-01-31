// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import './product-list.component.scss';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<any[]> = of([]); // Initialisez avec une valeur par défaut vide

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  redirectToDetailPage(productId: number): void {
    // Redirection vers la page de détail avec l'ID du produit
    this.router.navigate(['/product-detail', productId]);
  }
}
