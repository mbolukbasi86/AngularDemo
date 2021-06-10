import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
// import { ProductResponseModel } from 'src/app/models/productResponseModel';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // product: Product = { productId: 1, productName: 'Chang', categoryId: 1, unitPrice: 15.00, unitsInStock: 5 }

  products: Product[] = [];
  dataLoaded: boolean = false;
  filterText: string = "";

  //apiUrl: string = 'https://localhost:44303/api/Products/GetAll';
  // productResponseModel: ProductResponseModel = {
  //   data: this.products,
  //   message: "",
  //   success: true
  // };
  constructor(
    private productService: ProductService,
    private cartService:CartService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) { } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      }
      else {
        this.getProducts();
      }
    })

  }
  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data
      this.dataLoaded = true;
    });
  }

  addToChart(product: Product) {
      this.cartService.addToChart(product);
      this.toastrService.success("Added To Chart",product.productName,);
  }
}
