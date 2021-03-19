import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'https://localhost:44323/api/categories/getall';

  constructor(private httpClient: HttpClient) {}

  getCategories():Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl);
  }

  // getCategories(): Observable<ListResponseModel<Category>> {
  //   let newPath = this.apiUrl + "categories/getall";
  //   return this.httpClient.get<ListResponseModel<Category>>(newPath);
  // }

  // getAllCategoryClassy(categoryId: number) : Observable<ListResponseModel<Category>> {
  //   let newPath = this.apiUrl + "products/getbycategory?categoryId="+categoryId;
  //   return this.httpClient.get<ListResponseModel<Category>>(newPath);
  // }
}
