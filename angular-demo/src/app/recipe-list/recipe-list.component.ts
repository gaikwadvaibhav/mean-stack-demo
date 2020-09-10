import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, AfterViewInit {

  recipeList: any;
  tableData: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource;

  @ViewChild('search') search: ElementRef<HTMLInputElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['recipeId', 'recipeName', 'description', 'calories', 'recipeCreatedDate', 'action'];

  total: number;
  recordPerPage: number;
  currentPage = 1;
  pageSizeOptions: string[];

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpService.get('getAllRecipe').subscribe((res: any) => {
      this.recipeList = res['data'];
      this.dataSource = new MatTableDataSource(this.recipeList);
      this.total = this.recipeList.length;
    }, (err) => {
      console.log('err', err);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.recordPerPage = pageData.pageSize;
  }


  edit(recipe, i?) {
    this.router.navigateByUrl(`add-recipe/${recipe.recipeName}`);
  }
  delete(recipe, i?) {
    this.httpService.post(`deleteRecipe`, { recipeName: recipe.recipeName }).subscribe((res) => {
      console.log('res', res);
      if (res) {
        const itemIndex = this.recipeList.findIndex(obj => obj['recipeName'] === recipe['recipeName']);
        this.recipeList.splice(itemIndex, 1);
        this.dataSource = new MatTableDataSource(this.recipeList);
      }
    }, (err) => {
      console.log('err', err);
    });
  }
}
