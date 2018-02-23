import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { HTTPService } from "../services/http.service";
import { DataService } from '../services/data.service';
declare var RBFTools: any;
declare var IndieSquare: any;
declare var Mnemonic: any;
declare var booTools: any;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  allOwnImage = this.dataService.getImage('leftOptionSeg');
  loadingBump = false;
  showBump = false;
  oldSatByte = 0;
  newFee = 0;
  currentBumpFee = 0;
  viewPortItems2: any;
  loading = false;
  scrollView;
  didInit = false;

  newSatByte = "";
  lastType = "";
  mode = "history";
  cardHeightInner = "100%";
  scrollObservable;
  orderSelectImage;
  currentRequest;
  rbf: any;
  currentBumpUnsignedHex = "";
  indiesquare: any;
  constructor(public dataService: DataService, private httpService: HTTPService, private ref: ChangeDetectorRef) {


  }
  ngAfterViewInit() {
    this.didInit = true;
    this.setScrollObs();

  }

  setScrollObs() {

    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable = Observable.fromEvent(this.scrollView, 'scroll');
  }


  addPullHistory() {

    var tmpthis = this;
    //grab the list
    var list = document.getElementById("scrollView");
    //grab the loading div

    //keep the state whether the fingers are touched
    var isTouched = false;
    //keep the state whether a PULL actually went out
    var isMoved = false;
    //This has the original Top offset (relative to screen) position of the list
    var prevY = list.offsetTop;
    //This has the original Top CSS position of the list
    var cssY = list.style.top + "";

    cssY = cssY.substring(0, cssY.length - 2);
    //alert(cssY);

    //Add the start of the touching

    list.addEventListener("touchstart", function(e) {
      //touch started ? YES
      isTouched = true;
      //initialize the touched point
      prevY = e.changedTouches[0].clientY;
      //we use css3 transitions when available for smooth sliding
      list.style.transition = "";
      // e.preventDefault();
    }, false);
    list.addEventListener("touchend", function(e) {
      //on touchup we cancel the touch event
      isTouched = false;
      //now if the list has moved downwards, it should come up but in a transition
      // list.style.transition = "top 1s";
      if (isMoved) {
        //show the loader div
        // loader.style.display = "block";
        if (tmpthis.mode == "order") {
          tmpthis.reloadOrders();

        } else {
          tmpthis.dataService.maincontroller.history = [];
          tmpthis.getHistory();

        }
        // tmpthis.setCurrentOrbs(tmpthis.env,true);
      }
      // alert(cssY);
      list.style.top = '0px';
      isMoved = false;

      // e.preventDefault();
    }, false);


    list.addEventListener("touchmove", function(e) {
      if (isTouched) {
        if (e.changedTouches[0].clientY - prevY > 300) {
          //on touchmove, we add the exact amount fingers moved to the top of the list
          var change = e.changedTouches[0].clientY - prevY;
          //and add it to the style
          list.style.top = cssY + change + 'px';
          isMoved = true;
        }
      }

    }, false);




  }
  selectOrders() {

    this.mode = "order";
    this.allOwnImage = this.dataService.getImage('rightOptionSeg');
    if (this.dataService.maincontroller.orders.length == 0) {
      this.selectOrdersAll();
    }
    this.setScrollObs();
  }

  selectOrdersAll() {
    this.mode = "order";
    this.orderSelectImage = this.dataService.getImage('orderSelect1');

    this.getOrders("all");
    this.setScrollObs();
  }

  selectOrdersBought() {
    this.mode = "order";
    this.orderSelectImage = this.dataService.getImage('orderSelect2');

    this.getOrders("buy");
    this.setScrollObs();
  }

  selectOrdersSold() {
    this.mode = "order";
    this.orderSelectImage = this.dataService.getImage('orderSelect3');

    this.getOrders("sell");
    this.setScrollObs();
  }
  selectOrdersOpen() {
    this.mode = "order";
    this.orderSelectImage = this.dataService.getImage('orderSelect4');

    this.getOrders("open");
    this.setScrollObs();
  }




  selectHistory() {

    this.mode = "history";
    this.allOwnImage = this.dataService.getImage('leftOptionSeg');

    this.setScrollObs();

  }

  getOrders(type: string) {

    if (this.currentRequest != null) {
      this.currentRequest.unsubscribe();
    }
    this.lastType = type;
    this.dataService.maincontroller.orders = [];
    var tmpthis = this;

    if (this.dataService.maincontroller.currentAddress != "empty" && tmpthis.dataService.maincontroller.orders.length == 0) {
      this.loading = true;
      this.currentRequest = tmpthis.httpService.getOrderHistory(this.dataService.maincontroller.currentAddress, type, this.dataService.maincontroller.currentCurrency).subscribe(
        data => {
          tmpthis.dataService.maincontroller.orders = data;
          console.log("orders:" + JSON.stringify(tmpthis.dataService.maincontroller.orders));
          tmpthis.loading = false;
          tmpthis.addPullHistory();
        },
        error => {

          console.log("error history");
          tmpthis.loading = false;
        },
        () => { });
      this.setScrollObs();
    }

    this.setScrollObs();
  }
  reloadOrders() {
    this.getOrders(this.lastType);
  }
  ngOnInit() {

    this.orderSelectImage = this.dataService.getImage('orderSelect1');
    this.dataService.history = this;



    this.getHistory();

  }

  bumpFee(txid) {
    this.newSatByte = "";
    this.showBump = true;
    this.loadingBump = true;

    var tmpthis = this;
    this.rbf = new RBFTools();
    this.rbf.checkRBF(txid, function(result, currentFee, satByte, rawtx) {
      if (result == true) {

        tmpthis.currentBumpFee = currentFee / 100000000;
        tmpthis.oldSatByte = Math.round(satByte);
        tmpthis.loadingBump = false;


      } else {
        tmpthis.showBump = false;
        alert(tmpthis.dataService.getLang('cant_bump_fee'));
      }

    }, function(error) {
      tmpthis.showBump = false;
      alert(error);
    });

  }
  closeBumpFee(tmpthis) {
    if (typeof tmpthis == "undefined") {
      this.loadingBump = false;
      this.showBump = false;
    } else {
      tmpthis.loadingBump = false;
      tmpthis.showBump = false;
    }
  }
  continueBumpFee() {
    var tmpthis = this;
    var newSatByteNum = Number(this.newSatByte);

    if (Number.isNaN(newSatByteNum)) {
      alert(tmpthis.dataService.getLang('fee_not_valid'));
      return;
    }

    //var minBump=0.00001;
    //console.log(this.currentBumpFee+" "+minBump);
    if (newSatByteNum <= (this.oldSatByte)) {
      alert(tmpthis.dataService.getLang('fee_not_valid'));
      return;
    }

    this.loadingBump = true;

    this.rbf.continueBump(newSatByteNum, function(unsignedhex, error, newFee) {
      tmpthis.loadingBump = false;
      if (error != null) {
        if (error == "balance error") {
          alert(tmpthis.dataService.getLang('bump_balance'));
          tmpthis.showBump = false;
          tmpthis.loadingBump = false;
        } else {
          alert(error);
        }
        return;
      }
      tmpthis.newFee = newFee;

      tmpthis.currentBumpUnsignedHex = unsignedhex;

      var newFeeBtc = newFee / 100000000;
      var fiatVal = tmpthis.dataService.maincontroller.getFiatForToken('BTC', newFeeBtc);
      tmpthis.dataService.maincontroller.showConf(tmpthis.dataService.getLang('new_fee', newFeeBtc + "", fiatVal), tmpthis.finishBump, tmpthis.cancelBump, tmpthis);


    });

  }
  signError(error, currentOwner) {

    alert(error);



  }
  finishSign(hex, owner) {

    owner.indiesquare = new IndieSquare({
      'apikey': owner.httpService.apiKey
    });

    owner.broadcastTx(hex, owner);

  }
  finishBump(tmpthis) {



    if (tmpthis.dataService.maincontroller.linkType == "indiesquare") {
      tmpthis.loadingBump = true;
      tmpthis.showBump = true;
      tmpthis.indiesquare = new IndieSquare({
        'apikey': tmpthis.httpService.apiKey
      });


      tmpthis.ref.detectChanges();
      console.log("here went");
      tmpthis.indiesquare.signTransaction({ 'unsigned_tx': tmpthis.currentBumpUnsignedHex }, function(url, urlScheme, error) {
        console.log("here went 2");
        if (error) {

          console.error(error);
          tmpthis.dataService.maincontroller.showMessage(error);
          tmpthis.loadingBump = false;
          tmpthis.showBump = false;


          return;
        }

        if (tmpthis.dataService.isMobile == false) {

          tmpthis.dataService.maincontroller.showQR(url);
          console.log("url is " + url);

        }


      }, function(result, error) {

        if (error) {
          console.error(error);
          tmpthis.dataService.maincontroller.showMessage(error);
          tmpthis.loadingBump = false;
          tmpthis.showBump = false;
          tmpthis.dataService.maincontroller.closeQR();
          return;
        } else {


          tmpthis.broadcastTx(result.signed_tx, tmpthis);





        }


      });


    } else if (tmpthis.dataService.maincontroller.linkType == "BoO") {


      var json = JSON.stringify({ signType: "basic", "toSign": tmpthis.currentBumpUnsignedHex });

      tmpthis.dataService.setCurrentSignData(json, tmpthis.finishSign, tmpthis.signError, tmpthis);
      tmpthis.loadingBump = true;
      tmpthis.showBump = true;
    } else {

      tmpthis.dataService.maincontroller.showPassword(tmpthis.closeBumpFee, tmpthis.signBroadcast, tmpthis);

    }


  }
  cancelBump(tmpthis) {
    tmpthis.loadingBump = false;
    tmpthis.showBump = false;
  }

  signBroadcast(passphrase: string, owner: any) {
    owner.showBump = true;
    console.log("here went");
    try {

      var seed = new Mnemonic(passphrase.split(' ')).toHex();
    }
    catch (err) {


      throw err;
    }

    var masterKey = booTools.bitcoin.HDNode.fromSeedBuffer(booTools.buffer(seed, 'hex'), booTools.bitcoin.networks.bitcoin);

    var route = owner.dataService.maincontroller.basePath + owner.dataService.maincontroller.currentIndex;

    var key1 = masterKey.derivePath(route).keyPair;

    var unsignedTx = booTools.bitcoin.Transaction.fromHex(owner.currentBumpUnsignedHex);

    var txb = booTools.bitcoin.TransactionBuilder.fromTransaction(unsignedTx, booTools.bitcoin.networks.bitcoin);

    txb.inputs.forEach(function(input, idx) {
      txb.inputs[idx] = {}; // small hack to undo the fact that CP sets the output script in the input script
      txb.sign(idx, key1);
    });

    var signedTx = txb.build();

    console.log("sig" + signedTx.toHex());




    owner.indiesquare = new IndieSquare({
      'apikey': owner.httpService.apiKey
    });
    owner.loadingBump = true;


    function getBinarySize(string) {
      return booTools.buffer.byteLength(string, 'hex');
    }

    var newSize = owner.newFee / getBinarySize(signedTx.toHex());
    console.log(newSize + "  " + owner.oldSatByte);


    owner.broadcastTx(signedTx.toHex(), owner);


  }

  broadcastTx(tx, owner) {


    owner.indiesquare.broadcast({ "tx": tx }, function(data, error) {
      owner.dataService.maincontroller.closeQR();
      owner.showBump = false;
      if (error) {
        alert("went heer err" + error);
        console.error(error);
        owner.dataService.maincontroller.showMessage(error.message);

        owner.ref.detectChanges();
        return;
      }


      owner.dataService.maincontroller.history = [];
      owner.getHistory();
      if (owner.dataService.maincontroller.orders.length > 0) {
        owner.reloadOrders();
      }

      owner.dataService.maincontroller.showMessage(owner.dataService.getLang("fee_bumped"));




      owner.ref.detectChanges();


    });

  }

  getHistory() {
    if (this.dataService.maincontroller.currentAddress != "empty" && this.dataService.maincontroller.history.length == 0) {

      this.loading = true;
      var tmpthis = this;
      this.httpService.getHistory(this.dataService.maincontroller.currentAddress).subscribe(

        data => {
          tmpthis.dataService.maincontroller.history = data;
          console.log("hsitory:" + JSON.stringify(tmpthis.dataService.maincontroller.history));
          for (var i = tmpthis.dataService.maincontroller.history.length - 1; i >= 0; i--) {
            var aHist = tmpthis.dataService.maincontroller.history[i];
            if (aHist.type == "order") {
              if (typeof aHist.unconfirm == "undefined") {
                tmpthis.dataService.maincontroller.history.splice(i, 1);
              }
            }
          }
          tmpthis.loading = false;
          tmpthis.addPullHistory()
        },
        error => {
          console.log("error orders");
          tmpthis.loading = false;
        },
        () => { });
    }
    this.setScrollObs();
  }

  getHistoryHeight() {
    if (this.scrollView == null) {
      return "5px";
    } else {

      var bottombar = document.getElementById("bottomBarBottom");

      return (document.documentElement.clientHeight - this.scrollView.offsetTop - bottombar.clientHeight + 5) + "px";
    }

  }

}
