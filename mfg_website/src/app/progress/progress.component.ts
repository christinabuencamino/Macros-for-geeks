import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChartType, ChartDataSets, ChartOptions} from 'chart.js';
import { DatePipe } from '@angular/common';
import {SharedService} from "../services/shared.service";
import {BaseChartDirective, Colors, MultiDataSet, SingleDataSet, SingleOrMultiDataSet} from "ng2-charts";


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  private pastWeek : string[] = [];
  date : Date = new Date();
  private proteins : number[] = [0,0,0,0,0,0,0]
  private fats : number[] = [0,0,0,0,0,0,0]
  private carbs: number[] = [0,0,0,0,0,0,0]
  loaded = false;
  barchart:any;
  carbGoal = [0,0,0,0,0,0,0]
  protienGoal = [0,0,0,0,0,0,0]
  fatGoal = [0,0,0,0,0,0,0]

  //@ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public barChartOptions: ChartOptions = {
    responsive: true,
    spanGaps:true
  };

public barChartLabels: any = this.pastWeek;
public barChartType: ChartType = 'bar';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: any[] = [
    { data: this.proteins, label: 'Proteins' },
    { data: this.fats, label: 'Fats'},
    { data: this.carbs, label: 'Carbohydrates'},
    { "data": this.protienGoal , "label": "Protein goal", "type": "line", 'fill':'false',backgroundColor:["#75DBCD"], borderColor: ['#75DBCD'] },
    { "data": this.carbGoal, "label": "Fat goal", "type": "line", 'fill':'false',backgroundColor:['#b4dd92'],borderColor: ['#b4dd92'] },
    { "data": this.fatGoal, "label": "Carb goal", "type": "line", 'fill':'false', backgroundColor:['#e1e05d'],borderColor: ['#e1e05d'] },
  ];


  chartColors: Colors[] = [
    {backgroundColor:["#75DBCD","#75DBCD","#75DBCD","#75DBCD","#75DBCD","#75DBCD","#75DBCD"]},
    {backgroundColor:["#C9DBBA","#C9DBBA","#C9DBBA","#C9DBBA","#C9DBBA","#C9DBBA","#C9DBBA"]},
    {backgroundColor:["#DCDBA8","#DCDBA8","#DCDBA8","#DCDBA8","#DCDBA8","#DCDBA8","#DCDBA8"]}
  ];

  constructor(private http: HttpClient,private datePipe: DatePipe,private sharedService: SharedService) { }

  ngOnInit(){
    this.getDates()
    this.getMacros()
    this.getGoals()
  }

  getGoals(){
    this.sharedService.getUser(this.userId).subscribe(user => {
      for(let i = 0; i < 7; i++) {
        this.protienGoal[i] = user.proteinGoal
      }
      for(let i = 0; i < 7; i++) {
        this.carbGoal[i] = user.carbohydrateGoal
      }
      for(let i = 0; i < 7; i++) {
        this.fatGoal[i] = user.fatGoal
      }
    })
  }

  fixPrecision(){
    for(let i = 0; i < 7; i++){
      this.proteins[i] = Number(this.proteins[i].toFixed(2))
      this.fats[i] = Number(this.fats[i].toFixed(2))
      this.carbs[i] = Number(this.carbs[i].toFixed(2))
    }
}

  getDates(){
    for(let i = 0; i < 7; i++){
      let currentDate: Date = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      this.pastWeek.push(currentDate.toDateString());
    }
    this.pastWeek.reverse();
  }

  getMacros(){
    // Get each date for the last 7 days in order to call them from the database.
    var myCurrentDate=new Date();
    var sevdays=new Date(myCurrentDate);
    sevdays.setDate(sevdays.getDate() - 7);
    var sixdays=new Date(myCurrentDate);
    sixdays.setDate(sixdays.getDate() - 6);
    var fivedays=new Date(myCurrentDate);
    fivedays.setDate(fivedays.getDate() - 5);
    var fourdays=new Date(myCurrentDate);
    fourdays.setDate(fourdays.getDate() - 4);
    var threedays=new Date(myCurrentDate);
    threedays.setDate(threedays.getDate() - 3);
    var twodays=new Date(myCurrentDate);
    twodays.setDate(twodays.getDate() - 2);
    //Put Macros for each date over the last 7 days into their own array.
    this.sharedService.getDiaryByDate(this.userId,sevdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.proteins[0] += entries[i].protein}})
    this.sharedService.getDiaryByDate(this.userId,sixdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.proteins[1] += entries[i].protein}})
    this.sharedService.getDiaryByDate(this.userId,fivedays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.proteins[2] += entries[i].protein}})
    this.sharedService.getDiaryByDate(this.userId,fourdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.proteins[3] += entries[i].protein}})
    this.sharedService.getDiaryByDate(this.userId,threedays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.proteins[4] += entries[i].protein}})
    this.sharedService.getDiaryByDate(this.userId,twodays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.proteins[5] += entries[i].protein}})
    this.sharedService.getDiaryByDate(this.userId,this.date).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.proteins[6] += entries[i].protein}})

    this.sharedService.getDiaryByDate(this.userId,sevdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.fats[0] += entries[i].fats}})
    this.sharedService.getDiaryByDate(this.userId,sixdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.fats[1] += entries[i].fats}})
    this.sharedService.getDiaryByDate(this.userId,fivedays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.fats[2] += entries[i].fats}})
    this.sharedService.getDiaryByDate(this.userId,fourdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.fats[3] += entries[i].fats}})
    this.sharedService.getDiaryByDate(this.userId,threedays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.fats[4] += entries[i].fats}})
    this.sharedService.getDiaryByDate(this.userId,twodays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.fats[5] += entries[i].fats}})
    this.sharedService.getDiaryByDate(this.userId,this.date).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.fats[6] += entries[i].fats}})

    this.sharedService.getDiaryByDate(this.userId,sevdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.carbs[0] += Number(entries[i].carbohydrates.toFixed(2))}})
    this.sharedService.getDiaryByDate(this.userId,sixdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.carbs[1] += Number(entries[i].carbohydrates.toFixed(2))}})
    this.sharedService.getDiaryByDate(this.userId,fivedays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.carbs[2] += Number(entries[i].carbohydrates.toFixed(2))}})
    this.sharedService.getDiaryByDate(this.userId,fourdays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.carbs[3] += Number(entries[i].carbohydrates.toFixed(2))}})
    this.sharedService.getDiaryByDate(this.userId,threedays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.carbs[4] += Number(entries[i].carbohydrates.toFixed(2))}})
    this.sharedService.getDiaryByDate(this.userId,twodays).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.carbs[5] += Number(entries[i].carbohydrates.toFixed(2))}})
    this.sharedService.getDiaryByDate(this.userId,this.date).subscribe(entries => {
      for (var i = 0; i < entries.length ;i++){
        this.carbs[6] += Number(entries[i].carbohydrates.toFixed(2))}})
    this.fixPrecision()
    this.loaded = true
  }

  get userId():number {
    return this.sharedService.userId
  }

}
