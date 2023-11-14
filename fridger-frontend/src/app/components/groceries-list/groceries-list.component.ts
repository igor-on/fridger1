import { Component } from '@angular/core';
import * as moment from 'moment';
import { GroceriesService } from 'src/app/services/groceries.service';

@Component({
  selector: 'app-groceries-list',
  templateUrl: './groceries-list.component.html',
  styleUrls: ['./groceries-list.component.scss'],
})
export class GroceriesListComponent {
  startDate: string = moment(new Date()).subtract(7, 'days').toISOString(true);
  endDate: string = moment(new Date()).toISOString(true);

  groceriesListStart: string | undefined;
  groceriesListEnd: string | undefined;

  groceriesList: { ingredientName: string; quantity: number; unit: string }[] =
    [];

  constructor(private groceriesService: GroceriesService) {
    console.log('startDate: ', this.startDate);
    console.log('endDate: ', this.endDate);
  }

  onGenerate() {
    console.log('Generate clicked!');
    this.startDate = moment(this.startDate).format('yyyy-MM-DDTHH:mm:ss');
    this.endDate = moment(this.endDate).format('yyyy-MM-DDTHH:mm:ss');

    this.groceriesListStart = this.startDate;
    this.groceriesListEnd = this.endDate;

    if (moment(this.endDate).isBefore(this.startDate)) {
      console.log("end date can't be before star date!");
      return;
    }

    this.groceriesService
      .getGroceriesList(this.startDate, this.endDate)
      .subscribe(res => {
        console.log(res);
        this.groceriesList = res.data;
      });
  }
}
