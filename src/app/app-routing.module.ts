import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProductComponent }, //pathMatch:"full" >> eski versiyonlarda path verilmezse sapıtabiliyor,onun için bunu koyuyoruz..!
  { path: "products", component: ProductComponent },
  { path: "products/category/:categoryId", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
