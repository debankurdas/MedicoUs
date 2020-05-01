import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/common/service/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryForm: FormGroup;
  @Output() addCategory = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private categoryService: CategoryService) { }
  ngOnInit() {
    this.categoryForm = this.fb.group({
      category : this.fb.array([this.formBuilder()])
    });
  }

  formBuilder() {
    return this.fb.group({
      categoryName: new FormControl('', Validators.required)
    });
  }

  addControl() {
    const category = this.categoryForm.controls.category as FormArray;
    category.push(this.formBuilder());
  }
  removeControl(i: number) {
    const category = this.categoryForm.controls.category as FormArray;
    category.removeAt(i);
  }

  saveCategory() {
    this.addCategory.emit(this.categoryForm.controls.category.value);

  }

}
