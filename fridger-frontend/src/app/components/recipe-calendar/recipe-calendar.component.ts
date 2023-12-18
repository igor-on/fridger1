import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  CalendarOptions,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import {
  CalendarService,
  PostPlannedRecipeResponse,
} from 'src/app/services/calendar.service';
import { PlannedRecipe } from 'src/app/common/plannedRecipe';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-calendar',
  templateUrl: './recipe-calendar.component.html',
  styleUrls: ['./recipe-calendar.component.scss'],
})
export class RecipeCalendarComponent implements OnInit {
  // references the #calendar in the template
  @ViewChild('calendar') calendar!: FullCalendarComponent;

  recipes!: Recipe[];
  plannedRecipes!: PlannedRecipe[];

  calendarOptions: CalendarOptions = {
    timeZone: 'locale',
    locale: 'en-Gb',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    defaultTimedEventDuration: '00:00',
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      center: 'addEventButton',
      start: 'title,dayGridWeek,dayGridMonth',
    },
    editable: true,
    events: this.fetchEvents.bind(this),
    customButtons: {
      addEventButton: {
        text: 'add event...',
        click: e => this.openDialog(undefined),
      },
    },
    eventDragStart: v => console.log(v.event.toPlainObject()),
    eventDrop: this.updateEventOnDrag.bind(this),
    eventResizeStart: v => console.log(v.event.toPlainObject()),
    eventResize: v => console.log(v.event.toPlainObject()),
    eventClick: e => this.openDialog(Number.parseInt(e.event.id)),
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

        this.plannedRecipes = result;
        console.log(this.plannedRecipes);

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

  openDialog(eventId: number | undefined): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: {
        recipes: this.recipes,
        plannedRecipe:
          eventId !== undefined
            ? this.plannedRecipes.find(v => v.id === eventId)
            : null,
      },
      position: {
        top: '8rem',
      },
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

          // No Thanks clicked
          if (!result) {
            return;
          }

          console.log(dialogRef.componentInstance.data);

          const plannedRecipe: PlannedRecipe = {
            plannedDate: result.date,
            recipe: {
              id: result.recipe.id,
              name: '',
              description: '',
              instructions: '',
              imageUrl: '',
              link: '',
              recipeIngredients: [],
              favorite: false,
            },
            done: result.done,
          };

          console.log('plannedRecipe: ', plannedRecipe);

          if (eventId) {
            console.log('Updating...');
            plannedRecipe.id = eventId;
            this.calendarService
              .updatePlannedRecipe(plannedRecipe)
              .subscribe(result => {
                console.log(result);
                this.calendar.getApi().refetchEvents();
              });
          } else {
            console.log('Creating...');
            this.calendarService
              .createPlannedRecipe(plannedRecipe)
              .subscribe(result => {
                console.log(result);
                this.calendar.getApi().refetchEvents();
              });
          }
        }
      );
  }

  // TODO: analyze later
  // handleEventEdit(
  //   recipe: PlannedRecipe,
  //   func: (data: PlannedRecipe) => Observable<PostPlannedRecipeResponse>
  // ) {
  //   console.log('func: ', func);
  //   func(recipe).subscribe(result => {
  //     console.log(result);
  //     this.calendar.getApi().refetchEvents();
  //   });
  // }

  handleEventClick(args: EventClickArg) {
    console.log(args.event.title);
    console.log(args.event.id);
    console.log(args.event.toJSON());
  }

  test() {
    // this.calendar.getApi().getEvents()[0].set;
  }
}