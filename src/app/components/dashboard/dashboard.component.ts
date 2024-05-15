import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  listProduct: Product[] = []
  loading: boolean = false;
  page: number = 1;
  pageSize: number = 3;
  totalPages: number = 262;

  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id])
  }

  deleteProduct(id: number) {
    const that = this;
    if (confirm('¿Está seguro de eliminar?')) {
      this._productService.deleteProduct(id).subscribe({
        next: (result) => {
          that.getProducts();
        },
        error: (e) => {
          console.log('Error', e)
        }
      })
    }
  }

  getProducts(page: number = 1) {
    this.loading = true;
    this._productService.getProducts(page, this.pageSize).subscribe({
      next: (result: any) => {
        this.listProduct = result.result
        this.totalPages = result.totalPages;
        this.loading = false;
      },
      error: (e) => {
        console.log('Error', e)
        this.loading = false;
      }
    })
  }

}