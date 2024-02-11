import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product = new Product();

  public products$: Observable<any[]> = of([]); // Initialisez avec une valeur par défaut vide
  public productForm: FormGroup;

  constructor(private productService: ProductService, private router: Router) {
    this.productForm = new FormGroup({
      productId: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      productTexture: new FormControl('', Validators.required),
      productGrammage: new FormControl('', [Validators.required, Validators.min(10), Validators.max(1000)]),
      productColor: new FormControl('', Validators.required)
    });
  }

  public onSubmit() {
    this.product = new Product();
    this.product.productId = this.productForm.value.productId!;
    this.product.productName = this.productForm.value.productName!;
    this.product.productTexture = this.productForm.value.productTexture;
    this.product.productGrammage = this.productForm.value.productGrammage;
    this.product.productColor = this.productForm.value.productColor;
    this.productService.addProduct(this.product);
    this.refreshProductList();
  }

  ngOnInit(): void {
    this.refreshProductList();
  }

  private refreshProductList(): void {
    this.products$ = this.productService.getProducts();
  }

  public redirectToDetailPage(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }
}
