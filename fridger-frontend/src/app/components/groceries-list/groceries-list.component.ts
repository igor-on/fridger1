import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GroceriesList } from 'src/app/shared/models/groceries-list';
import { GroceriesService } from 'src/app/services/groceries.service';
import { ListGroceriesList } from 'src/app/shared/models/list-groceries-list.model';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GroceriesDetailsComponent } from './groceries-details/groceries-details.component';

@Component({
  selector: 'app-groceries-list',
  templateUrl: './groceries-list.component.html',
  styleUrls: ['./groceries-list.component.scss'],
})
export class GroceriesListComponent implements OnInit {
  globalFilter: FormControl = new FormControl('');

  startDate: string = moment(new Date()).subtract(7, 'days').toISOString(true);
  endDate: string = moment(new Date()).toISOString(true);

  groceriesLists: ListGroceriesList[] = [];

  constructor(
    private groceriesService: GroceriesService,
    private dialog: MatDialog
  ) {
    console.log('startDate: ', this.startDate);
    console.log('endDate: ', this.endDate);
  }

  ngOnInit(): void {
    this.groceriesService
      .getGroceriesList()
      .pipe(
        map(response => {
          return response.data.map(gl => {
            return {
              label: `${moment(gl.startDate).format('DD.MM.YYYY')} - ${moment(
                gl.endDate
              ).format('DD.MM.YYYY')}`,
              ...gl,
            };
          });
        })
      )
      .subscribe((response: ListGroceriesList[]) => {
        this.groceriesLists = response;
      });
  }

  getGlobalFilteredGroceries() {
    const filterText = this.globalFilter.value;

    return this.globalFilter.value == null || this.globalFilter.value === ''
      ? this.groceriesLists
      : this.groceriesLists.filter(groceries =>
          this._filterPredicate(groceries, filterText)
        );
  }

  private _filterPredicate(data: GroceriesList, filter: string): boolean {
    filter = filter.toLowerCase();

    const endDateIncludes = data.endDate.toLowerCase().includes(filter);
    const startDateIncludes = data.startDate.toLowerCase().includes(filter);
    const ingredientIncludes =
      data.ingredients
        .map(gi => gi.ingredientName.toLowerCase())
        .filter(i => i.includes(filter)).length > 0;

    return endDateIncludes || startDateIncludes || ingredientIncludes;
  }

  itemClicked(item: ListGroceriesList) {
    console.log('item clicked: ', item);
    const dialogRef = this.dialog.open(GroceriesDetailsComponent, {
      data: item,
    });
  }

  onGenerate() {
    // console.log('Generate clicked!');
    // this.startDate = moment(this.startDate).format('yyyy-MM-DDTHH:mm:ss');
    // this.endDate = moment(this.endDate).format('yyyy-MM-DDTHH:mm:ss');
    // this.groceriesListStart = this.startDate;
    // this.groceriesListEnd = this.endDate;
    // if (moment(this.endDate).isBefore(this.startDate)) {
    //   console.log("end date can't be before star date!");
    //   return;
    // }
    // this.groceriesService
    //   .generateGroceriesList(this.startDate, this.endDate)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.groceriesList = res.data!;
    //   });
  }
}
