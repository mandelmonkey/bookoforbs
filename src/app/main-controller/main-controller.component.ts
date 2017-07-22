import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-main-controller',
  templateUrl: './main-controller.component.html',
  providers:[HTTPService],
  styleUrls: ['./main-controller.component.css']
})
export class MainControllerComponent implements OnInit {

  constructor(public dataService:DataService,private httpService:HTTPService,private ref: ChangeDetectorRef){}
public loading = true;
public showTopBar = false;
public showSend = false;
public showCollection = false;
public showBottomBar = false;
public showIntro = true;
public orbData :any;
public userBalance :Array<any>;
public currentAddress = "";
public selectedOrb:any;
public selectedKey:string;
public currentBundleId:string;
public currentBalance:number;
public currentImage:string;

public orbHeight:string;
public orbWidth:string;
  loadEnvironments(){
  
    
    var envRes = "{\"Environements\":{\"com.spellsofgenesis\":{\"Title\":\"Spells of Genesis\",\"MasterCurrency\":\"BITCRYSTALS\",\"ticker\":\"BCY\",\"envCode\":\"eSog\",\"bundleId\":\"com.spellsofgenesis\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eSog\\\/banner.png\"},\"com.forceofwill\":{\"Title\":\"Force of Will\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eFow\",\"bundleId\":\"com.forceofwill\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eFow\\\/banner.png\"},\"com.diecast-club\":{\"Title\":\"Diecast\",\"MasterCurrency\":\"BITCRYSTALS\",\"ticker\":\"BCY\",\"envCode\":\"eDie\",\"bundleId\":\"com.diecast-club\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eDie\\\/banner.png\"},\"com.bitgirls\":{\"Title\":\"BitGirls\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eBtg\",\"bundleId\":\"com.bitgirls\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eBtg\\\/banner.png\"},\"com.memorychain\":{\"Title\":\"Memorychain\",\"MasterCurrency\":\"PEPECASH\",\"ticker\":\"PCSH\",\"envCode\":\"eMyc\",\"bundleId\":\"com.memorychain\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eMyc\\\/banner.png\"},\"com.ageofchains\":{\"Title\":\"Age of Chains\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eAoc\",\"bundleId\":\"com.ageofchains\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eAoc\\\/banner.png\"},\"com.rarepepe\":{\"Title\":\"Rarepepe\",\"MasterCurrency\":\"PEPECASH\",\"ticker\":\"PCSH\",\"envCode\":\"eRar\",\"bundleId\":\"com.rarepepe\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eRar\\\/banner.png\"},\"com.bookoforbs\":{\"Title\":\"ORBexchange\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eOex\",\"bundleId\":\"com.bookoforbs\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eOex\\\/banner.jpg\"}}}";
   
this.orbData = JSON.parse(envRes);


 this.httpService.getBalance(this.currentAddress).subscribe(
     data => { 
      this.userBalance = data;
      console.log(  this.userBalance);
      
      this.dataService.topbar.setEnvironments(this.orbData.Environements);

      },   
      error => {
       
console.log("error balance");
 this.loading = false;
      },
     () => {});


      /*

this.httpService.getEnvironments().subscribe(
     data => { 
      this.orbData = data;
      console.log( this.orbData);
      
      this.httpService.getBalance(this.currentAddress).subscribe(
     data => { 
      this.userBalance = data;
      console.log(  this.userBalance);
      
      this.dataService.topbar.setEnvironments(this.orbData.Environments);
        
     },   
      error => {
       
console.log("error balance");
 this.loading = false;
      },
     () => {});


          
     },   
      error => {
       
console.log("error gamecenter");
 this.loading = false;
      },
     () => {});

     */
}

openSend(){
  console.log("show send");
  this.showSend = true; 
  //this.dataService.maincontroller.showCollection = false;
}
 closeLarge(){
   this.selectedOrb = null;

 }

  ngOnInit() {
    this.dataService.maincontroller = this;
    this.selectedOrb = null;
    
    
  }
  reloadViews(){
    if(this.dataService.isMobile == true){
    this.orbHeight =  (document.documentElement.clientHeight - 200)+"px"
      this.orbWidth = "auto";
    } else{
      this.orbHeight =  "80%";
      this.orbWidth = "auto";
    }
 
  }


}
