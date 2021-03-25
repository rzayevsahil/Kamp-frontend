import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // product1 = { productId: 1, productName: 'Bardak', categoryId: 1, unitPrice: 5, unitsInStock: 5 };
  // product2 = { productId: 2, productName: 'Laptop', categoryId: 1, unitPrice: 5, unitsInStock: 5 };
  // product3 = { productId: 3, productName: 'Mouse', categoryId: 1, unitPrice: 5, unitsInStock: 5 };
  // product4 = { productId: 4, productName: 'Keyboard', categoryId: 1, unitPrice: 5, unitsInStock: 5 };
  // product5 = { productId: 5, productName: 'Camera', categoryId: 1, unitPrice: 5, unitsInStock: 5 };

  products: Product[] = [];
  dataLoaded = false;
  filterText = '';
  //  productResponseModel:ProductResponseModel={
  //    data:this.products,
  //    message:"",
  //    success:true
  //  };
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService:CartService
  ) {} //servisi kullanmak için bunu yapıyoruz

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    // this.httpClient
    //   .get<ProductResponseModel>(this.apiUrl)
    //   .subscribe((response) => {
    //     this.products=response.data
    //   });
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }

  addToCart(product: Product) {
    //console.log(product);
    //logicikleri buraya yazarız
    //==bu js de string 1 ile int 1 i aynı kabul eder o yüzden === yaptığımızada veri tipine de bakar
    if (product.productId===1) {
      this.toastrService.error("Hata","Ürün sepete eklenemez")
    } else {
      this.toastrService.success('Sepete eklendi',product.productName)
      this.cartService.addToCart(product); 
    }
    
  }
}
