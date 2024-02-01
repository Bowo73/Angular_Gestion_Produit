import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import './product-list.component.scss';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../Model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product = new Product('', '', 0, '');

  products$: Observable<any[]> = of([]); // Initialisez avec une valeur par défaut vide

  public constructor(private productService: ProductService, private router: Router) {}

  public productForm: FormGroup = new FormGroup({
    productName: new FormControl(''),
    productTexture: new FormControl(''),
    productGrammage: new FormControl(''),
    productColor: new FormControl(''),
  });

  public onSubmit() {
    this.product = new Product(
      this.productForm.get('productName')?.value,
      this.productForm.get('productTexture')?.value,
      this.productForm.get('productGrammage')?.value,
      this.productForm.get('productColor')?.value
    );
    this.productService.addProduct(this.product);
  }


  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  redirectToDetailPage(productId: number): void {
    // Redirection vers la page de détail avec l'ID du produit
    this.router.navigate(['/product-detail', productId]);
  }


}
