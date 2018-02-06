import { Component, OnInit } from '@angular/core';
import { HTTPService } from "../services/http.service";
import { DataService } from '../services/data.service';
import { PersistenceService, StorageType } from 'angular-persistence';
@Component({
  selector: 'app-fee-selector',
  templateUrl: './fee-selector.component.html',
  styleUrls: ['./fee-selector.component.css']
})
export class FeeSelectorComponent implements OnInit {
  rotated = false;
  public fees: any;
  showDropdown: boolean;
  constructor(public dataService: DataService, private httpService: HTTPService, private persistenceService: PersistenceService) { }

  ngOnInit() {
    this.showDropdown = false;


  }



  getFeeTitle() {

    if (this.dataService.maincontroller.currentFee == "fastestFee") {

      return this.dataService.getLang('fee_high');
    }
    else if (this.dataService.maincontroller.currentFee == "lowFee") {

      return this.dataService.getLang('fee_low');
    }
    else if (this.dataService.maincontroller.currentFee == "hourFee") {

      return this.dataService.getLang('fee_mid');
    }
    else {

      return this.dataService.maincontroller.currentFee + " sat/byte";
    }



  }

  openFeeList() {

    console.log("opening fees");
    if (this.showDropdown == false) {
      this.showDropdown = true;
    } else {
      this.showDropdown = false;
    }


    var div = document.getElementById("smallarrowFee");


    var deg = this.rotated ? 0 : -90;

    div.style.webkitTransform = 'rotate(' + deg + 'deg)';
    div.style.transform = 'rotate(' + deg + 'deg)';
    div.style.webkitTransition = " all 0.1s ease-in-out";
    div.style.transition = " all 0.1s ease-in-out";
    this.rotated = !this.rotated;

  }

  getTitleForFee(index: number) {

    if (index == 0) {

      return this.dataService.getLang("fee_high_label");
    }
    else if (index == 1) {

      return this.dataService.getLang("fee_high_label");
    }
    else if (index == 2) {

      return this.dataService.getLang("fee_mid_label");
    }
    else if (index == 3) {

      return this.dataService.getLang("fee_low_label");
    }


  }
  onFocus() {


  }
  setFee(index: number) {
    if (index == 0) {

      this.dataService.maincontroller.currentFee = "fastestFee";
    }
    else if (index == 1) {
      this.dataService.maincontroller.currentFee = "halfHourFee";
    }
    else if (index == 2) {
      this.dataService.maincontroller.currentFee = "hourFee";
    }
    else if (index == 3) {
      this.dataService.maincontroller.currentFee = "lowFee";
    }
    else if (index == 4) {




      var customFee = parseFloat(this.dataService.maincontroller.customFee);
      if (Number.isNaN(customFee)) {
        this.dataService.maincontroller.showMessage(this.dataService.getLang("valid_fee"));
        this.dataService.maincontroller.customFee = "";

      }
      else if (customFee < 0) {
        this.dataService.maincontroller.showMessage(this.dataService.getLang("fee_too_low"));
        this.dataService.maincontroller.customFee = "";
      }
      else if (customFee > 1000) {
        this.dataService.maincontroller.showMessage("fee_too_high");
        this.dataService.maincontroller.customFee = "";
      }
      else {
        this.dataService.maincontroller.currentFee = customFee + "";
      }



    }

    this.openFeeList();
    this.persistenceService.set('userFee', this.dataService.maincontroller.currentFee, { type: StorageType.LOCAL });


  }

}
