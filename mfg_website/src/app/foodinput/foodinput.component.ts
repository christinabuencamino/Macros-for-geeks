import { NutrientDisplay } from './../interfaces/nutrientDisplay';
import { Food } from '../interfaces/food';
import { Component, OnInit, Input, Output } from '@angular/core';
import { SearchfoodsService } from '../services/searchfoods.service';
import { SharedService } from '../services/shared.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';  


@Component({
  selector: 'app-foodinput',
  templateUrl: './foodinput.component.html',
  styleUrls: ['./foodinput.component.css']
})

export class FoodinputComponent implements OnInit {
  InputFood: string = "";
  data: any = []
  NutrientDis: NutrientDisplay[] = [];
  description: string = "";
  FoodCategory: string = "";
  food = new Food();

  constructor(private SearchfoodsService: SearchfoodsService, private sharedService: SharedService, public datepipe: DatePipe) { }

  ngOnInit(): void {

  }

  onClick() {
    if (this.InputFood) {
      this.SearchfoodsService.getFood(this.InputFood).subscribe((response) => {
        this.data = response;   });
        this.description = this.data['foods'][0].description
        this.FoodCategory = this.data['foods'][0].foodCategory
        this.NutrientDis = this.data['foods'][0]['foodNutrients'];
        this.NutrientDis = this.NutrientDis.filter(x => x.nutrientName == 'Total lipid (fat)' || x.nutrientName == 'Carbohydrate, by difference' || x.nutrientName == 'Protein' || x.nutrientName == 'Energy')
    }
    else {
      alert("enter Food")
    }

  }

  //TODO
  PostFoods() {
    if(this.InputFood)
    this.food.Food = this.description;
    this.food.Calories = Math.round(this.NutrientDis[3].value) //this.DisplayFoods.filter(x => nutri)
    this.food.Carbohydrates = Math.round(this.NutrientDis[2].value)
    this.food.Fats = Math.round(this.NutrientDis[1].value);
    this.food.Protein = Math.round(this.NutrientDis[0].value);
    // let currentDateTime =this.datepipe.transform((new Date), 'MM-dd-yyyy');
    this.food.Date = new Date().toDateString();
    this.sharedService.addEntry(this.food).subscribe(food => Swal.fire("Good job!", "You posted your food info!", "success"))
    // console.log("post button works")
  }

}
