// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
//import './product-detail.component.scss';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product: any = {}; // Initialisez avec un objet vide ou un modèle de produit

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du produit à partir de l'URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.productId = parseInt(idParam,10);
        this.getProductDetails(this.productId);
      } else {
        console.error('ID du produit introuvable dans les paramètres de l\'URL');

      }
    });
  }

  loadProductDetails(): void {
    // Charger les détails du produit à partir du service
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        product => {
          this.product = product;
        },
        error => {
          console.error('Une erreur s\'est produite lors du chargement des détails du produit', error);
        }
      );
    }
  }

  private getProductDetails(productId: number): void {
    // Appelez votre service pour obtenir les détails du produit par ID
    this.productService.getProductById(productId).subscribe(
      (product) => {
        console.log('Product details:', product);
        this.product = product;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du produit:', error);
      }
    );
  }

  saveProduct(): void {
    // Enregistrez le produit en utilisant le service
    this.productService.updateProduct(this.product);
    // Vous pouvez également rediriger l'utilisateur vers la liste des produits après l'enregistrement
    this.router.navigate(['/products']);
  }
}
