import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GroceriesList } from 'src/app/shared/models/groceries-list';
import { GroceriesService } from 'src/app/services/groceries.service';
import { ListGroceriesList } from 'src/app/shared/models/list-groceries-list.model';
import { map } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GroceriesDetailsComponent } from './groceries-details/groceries-details.component';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { TemplateFormButton } from 'src/app/shared/components/dynamic-form/dynamic-form-buttons/dynamic-form-buttons.component';
import { MessageService } from 'src/app/services/message.service';
import { AddGroceriesComponent } from './add-groceries/add-groceries.component';
import { GenerateGroceriesInput } from 'src/app/shared/models/requests.model';
import { isBefore, format } from 'date-fns';
import { toLocaleISOString } from 'src/app/utils/tools';
import * as _ from 'lodash';

@Component({
  selector: 'app-groceries-list',
  templateUrl: './groceries-list.component.html',
  styleUrls: ['./groceries-list.component.scss'],
})
export class GroceriesListComponent implements OnInit {
  globalFilter: FormControl = new FormControl('');

  dateRangeFields!: TemplateFormField[];
  dateRangeBtns!: TemplateFormButton[];
  dateRangeFieldsVisible = false;

  groceriesLists: ListGroceriesList[] = [];

  constructor(
    private groceriesService: GroceriesService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private tfb: TemplateFormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchGroceriesList();
  }

  fetchGroceriesList() {
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
        this.groceriesLists = response.reverse();
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
    this.dialog.open(GroceriesDetailsComponent, {
      data: item,
      width: '700px',
      maxHeight: '70vh',
    });
  }

  onAddGroceries() {
    const addGroceriesDialog = this.dialog.open(AddGroceriesComponent);

    addGroceriesDialog
      .afterClosed()
      .subscribe(
        (data: {
          range: { startDate: string; endDate: string };
          withFridge: boolean;
        }) => {
          if (!data) return;
          const input = {
            startDate: toLocaleISOString(data.range.startDate),
            endDate: toLocaleISOString(data.range.endDate),
            withFridge: data.withFridge,
          };
          this.generateGroceriesList(input);
        }
      );
  }

  generateGroceriesList(input: GenerateGroceriesInput) {
    let { startDate, endDate, withFridge } = input;

    if (isBefore(endDate, startDate)) {
      console.log("end date can't be before star date!");
      return;
    }

    this.groceriesService
      .generateGroceriesList({ startDate, endDate, withFridge })
      .subscribe(res => {
        console.log(res);
        this.groceriesLists.unshift({
          label: `${format(res.data.startDate, 'dd.MM.yyyy')} - ${format(
            res.data.endDate,
            'dd.MM.yyyy'
          )}`,
          ...res.data,
        });
        this.messageService.sendMessage('Groceries list generated!');
      });
  }
}
