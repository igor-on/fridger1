import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Fridge } from 'src/app/common/fridge';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-fridge',
  standalone: true,
  imports: [JsonPipe, MatTableModule],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.scss'
})
export class FridgeComponent implements OnInit{

  fridge: Fridge | undefined

  constructor(private fridgeService: FridgeService) {}

  ngOnInit(): void {
    this.fridgeService.getFridge().subscribe(data => {
      this.fridge = data.data;
    })

  }
}
