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
    this.initTemplateForm();
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
        this.groceriesLists = response;
      });
  }

  initTemplateForm() {
    this.dateRangeFields = this.tfb.fields<{
      params: { startDate: string; endDate: string };
    }>({
      params: this.tfb.group({
        startDate: this.tfb.date({
          visible: true,
          params: {
            label: 'Start Date',
          },
        }),
        endDate: this.tfb.date({
          visible: true,
          params: {
            label: 'End Date',
          },
        }),
        withFridge: this.tfb.checkbox({
          visible: true,
          tip: {
            message: 'Include ingredients from fridge',
            position: 'above',
          },
          params: {
            label: 'With Fridge',
          },
          value: false,
        }),
      }),
    });

    this.dateRangeBtns = [
      {
        text: 'Generate',
        type: 'button',
        // color: 'black',
        onClick: (_, form) => {
          console.log('Generate clicked!');
          this.dateRangeFieldsVisible = false;
          this.generateGroceriesList(form);
        },
      },
    ];
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

  generateGroceriesList(form: FormGroup) {
    let { startDate, endDate, withFridge } = form.value.params;

    startDate = moment(startDate).format('yyyy-MM-DDTHH:mm:ss');
    endDate = moment(endDate).format('yyyy-MM-DDTHH:mm:ss');
    if (moment(endDate).isBefore(startDate)) {
      console.log("end date can't be before star date!");
      return;
    }
    this.groceriesService
      .generateGroceriesList({ startDate, endDate, withFridge })
      .subscribe(res => {
        console.log(res);
        this.groceriesLists.push({
          label: `${moment(res.data.startDate).format('DD.MM.YYYY')} - ${moment(
            res.data.endDate
          ).format('DD.MM.YYYY')}`,
          ...res.data,
        });
        this.messageService.sendMessage('Groceries list generated!');
      });
  }
}
