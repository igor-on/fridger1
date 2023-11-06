import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { PlannedRecipe } from 'src/app/common/plannedRecipe';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import * as moment from 'moment';

@Component({
  selector: 'app-recipe-calendar',
  templateUrl: './recipe-calendar.component.html',
  styleUrls: ['./recipe-calendar.component.scss'],
})
export class RecipeCalendarComponent implements OnInit {
  // references the #calendar in the template
  @ViewChild('calendar') calendar!: FullCalendarComponent;

  recipes!: Recipe[];

  calendarOptions: CalendarOptions = {
    timeZone: 'locale',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      center: 'addEventButton',
    },
    editable: true,
    events: this.fetchEvents.bind(this),
    customButtons: {
      addEventButton: {
        text: 'add event...',
        click: this.openDialog.bind(this),
      },
    },
    eventDragStart: v => console.log(v.event.toPlainObject()),
    eventDrop: this.updateEventOnDrag.bind(this),
    eventResizeStart: v => console.log(v.event.toPlainObject()),
    eventResize: v => console.log(v.event.toPlainObject()),
    eventClick: this.handleEventClick.bind(this),
    eventAdd: undefined,
  };
  constructor(
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.recipes = this.route.snapshot.data['recipes'] ?? [];
  }

  updateEventOnDrag(v: EventDropArg) {
    console.log(v.event.toPlainObject());
    const eventObj = v.event.toPlainObject();

    const isoLocale = moment(eventObj['start']).format('YYYY-MM-DDThh:mm:ss');

    console.log(eventObj['start']);
    // console.log(isoLocale);

    const data = {
      id: Number.parseFloat(eventObj['id']),
      plannedDate: eventObj['start'],
    };

    this.calendarService.updatePlannedRecipe(data).subscribe(result => {
      console.log(result);
    });
  }

  fetchEvents(info: any, successCallback: any, failureCallback: any) {
    this.calendarService
      .getPlannedRecipes()
      .subscribe((result: PlannedRecipe[]) => {
        if (result === undefined || result.length === 0) {
          failureCallback(new Error('cannot find recipes!'));
        }

        successCallback(
          Array.prototype.slice.call(result).map((v: PlannedRecipe) => {
            return {
              id: v.id!.toString(),
              title: v.recipe.name,
              start: v.plannedDate,
            };
          })
        );
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: this.recipes,
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (result: {
          date: string;
          title: string;
          recipe: Recipe;
          done: boolean;
        }) => {
          console.log('The dialog was closed: ', result);

          const plannedRecipe: PlannedRecipe = {
            plannedDate: result.date,
            recipe: {
              id: result.recipe.id,
            },
            done: result.done,
          };

          this.calendarService
            .createPlannedRecipe(plannedRecipe)
            .subscribe(result => {
              console.log(result);
              this.calendar.getApi().refetchEvents();
            });
        }
      );
  }

  handleEventClick(args: any) {
    console.log(args);
  }

  test() {
    // this.calendar.getApi().getEvents()[0].set;
  }
}
