import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  formGroup: FormGroup;
  params: any;
  file: any;
  fileName;
  constructor(private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activeRoute: ActivatedRoute

  ) {
    this.formGroup = this.fb.group({
      recipeId: [''],
      recipeName: [''],
      description: [''],
      calories: [''],
      recipeCreatedDate: [''],
      recipeImage: [''],
      ingredientNames: ['']
      // ingredientNames: this.fb.array([])
    });
    // this.addForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      console.log('params', params)
      this.params = params;
      if (this.params) {

        this.httpService.post('getOneRecipe', { recipeName: params.recipeId }).subscribe((res: any) => {
          console.log('res', res);
          let response = res.data[0];
          const arr = response.recipeImage.split('/');
          delete response['recipeImage']
          this.fileName = arr[arr.length - 1];
          console.log('response', response)
          this.formGroup.patchValue(response);


        }, (err) => {
          console.log('err', err);
        });
      }

    });
  }


  addForm() {
    // this.forms.push(this.fb.group({
      // ingredient: ['']
    // }));
  }

  // get forms() {
  //   return this.formGroup.controls.ingredientNames as FormArray;
  // }

  onFileInput(e) {
    console.log('e', e.target.files[0]);
    this.file = e.target.files[0];
  }

  async uploadFile(payload) {
    let imageUrl = '';
    let fd = new FormData();
    fd.append('image', this.file);
    this.httpService.post('upload-file', fd).subscribe((res: any) => {
      console.log('res', res);
      imageUrl = res.url;
      payload.recipeImage = imageUrl;
      this.saveForm(payload);
    }, (err) => {
      console.log('err', err);
      this.saveForm(payload);
    });
  }

  onSubmit(formValue) {
    let payload = JSON.parse(JSON.stringify(formValue));
    if (this.file) {
      this.uploadFile(payload);
    } else {
      this.saveForm(payload);
    }
  }

  saveForm(payload) {

    console.log('this.params.recipeId', this.params.recipeId)
    if (this.params.recipeId) {
      this.httpService.post('updateRecipe', payload).subscribe((res) => {
        console.log('res', res);
        this.router.navigateByUrl('recipe-list');
      }, (err) => {
      });
    } else {
      console.log('formValue', payload);
      this.httpService.post('add-recipe', payload).subscribe((res) => {
        console.log('res', res);
        this.router.navigateByUrl('recipe-list');
      }, (err) => {
        console.log('err', err);
      });
    }
  }


}
