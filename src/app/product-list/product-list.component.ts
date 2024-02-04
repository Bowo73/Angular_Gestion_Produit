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

  public product = new Product(0, '', '', 0, '');

  public products$: Observable<any[]> = of([]); // Initialisez avec une valeur par défaut vide
  public productForm: FormGroup;

  constructor(private productService: ProductService, private router: Router) {
    this.productForm = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl('', Validators.required),
      productTexture: new FormControl('', Validators.required),
      productGrammage: new FormControl('', [Validators.required, Validators.min(10), Validators.max(1000)]),
      productColor: new FormControl('')
    });
  }

  public onSubmit(): void {
    this.product = new Product(
      this.productForm.get('productId')?.value,
      this.productForm.get('productName')?.value,
      this.productForm.get('productTexture')?.value,
      this.productForm.get('productGrammage')?.value,
      this.productForm.get('productColor')?.value
    );

    // Ajouter le produit et rafraîchir la liste
    this.productService.addProduct(this.product).subscribe(
      () => {
        console.log('Produit ajouté avec succès.');
        this.refreshProductList();
        this.productForm.reset(); // Réinitialiser le formulaire après la soumission
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit:', error);
      }
    );
  }


  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  private refreshProductList(): void {
    this.products$ = this.productService.getProducts();
  }

  public redirectToDetailPage(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }
}
