import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  currentCategory: Category;
  // tsconfig.json içerisinde "strictPropertyInitialization":false, eklendiği için bu şekilde currentCategory oluşturabiliyoruz.
  // Yoksa aşağıdaki gibi yapmak gerekir.
  // currentCategory: Category = {categoryId:0,categoryName:""};

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    })
  };

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category: Category) {
    if (category == this.currentCategory) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  getAllCategoryClass() {
    if (!this.currentCategory) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }
  clearCurrentCategory()
  {
    this.currentCategory.categoryId =0;
  }
}
