import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChangeDetectorRef } from '@angular/core';
import { HTTPService } from "../services/http.service";
declare var IndieSquare: any;
declare var bitcore: any;
declare var Mnemonic: any;
declare var webXCP: any;


@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})


export class HistoryCardComponent implements OnInit {
  unsigned_tx = "";
  @Input()
  data: any;

  @Input()
  historyType: string;

  indiesquare: any;

  rawtx: string;

  isCard: boolean;
  constructor(public dataService: DataService, private httpService: HTTPService, private ref: ChangeDetectorRef) {



  }
  ngOnInit() {
    console.log(JSON.stringify(this.data));
    this.isCard = false;

    if (this.data != undefined && this.data.type == "cancel") {
      this.historyType = "cancel";
    }



  }
  isCancel() {
    if (this.historyType == "cancel") {
      console.log("is cancel");
      return true;
    }
    return false;
  }

  isOrder() {
    if (this.historyType == "order") {
      return true;
    }
    return false;
  }
  canRBF() {

    if (this.data.unconfirm != null) {
      if (this.data.unconfirm == true) {
        return true;
      }
    } else {
      return false;
    }


  }



  getImage() {

    if (this.data != null) {
      if (this.historyType == "order") {

        if (this.data.type == "sell") {

          var theToken = this.data.give_token;

        }
        else {
          theToken = this.data.get_token;
        }

        if (theToken == "BTC") {
          return this.dataService.getImage("asset_bitcoin");
        } else if (theToken == "XCP") {
          return this.dataService.getImage("xcp_asset");
        }
        else {


          for (var i = 0; i < this.dataService.maincontroller.currentOrbsKeys.length; i++) {

            var aKey = this.dataService.maincontroller.currentOrbsKeys[i];
            if (aKey == theToken) {
              this.isCard = true;

              return this.dataService.getRemoteImage(this.dataService.maincontroller.currentOrbs[aKey].image);
            }
          }

          return "https://api.indiesquare.me/v2/tokens/" + theToken + "/image?width=200&X-Api-Key=" + this.httpService.apiKey;

        }







      }
      else {


        if (this.data.type == "order") {
          var token = this.data.token;
          if (this.data.token != this.data.get_asset) {
            token = this.data.get_asset;
          } else {
            token = this.data.give_asset;
          }


          for (var i = 0; i < this.dataService.maincontroller.currentOrbsKeys.length; i++) {

            var aKey = this.dataService.maincontroller.currentOrbsKeys[i];
            if (aKey == token) {

              return this.dataService.maincontroller.currentOrbs[aKey].image;
            }
          }

          return "https://api.indiesquare.me/v2/tokens/" + token + "/image?width=200&X-Api-Key=" + this.httpService.apiKey;


        } else {
          if (this.data.token != null) {
            if (this.data.token == "BTC") {
              return this.dataService.getImage("asset_bitcoin");
            } else if (this.data.token == "XCP") {
              return this.dataService.getImage("xcp_asset");
            }
            else {




              for (var i = 0; i < this.dataService.maincontroller.currentOrbsKeys.length; i++) {

                var aKey = this.dataService.maincontroller.currentOrbsKeys[i];
                if (aKey == this.data.token) {
                  this.isCard = true;
                  return this.dataService.maincontroller.currentOrbs[aKey].image;
                }
              }

              return "https://api.indiesquare.me/v2/tokens/" + this.data.token + "/image?width=200&X-Api-Key=" + this.httpService.apiKey;

            }
          }
        }

        return "";
      }

    }

  }

  canCancel() {

    if (this.data.status == "open") {
      return true;
    }
    return false;

    //return true;
  }

  signError(error, currentOwner) {


    currentOwner.dataService.maincontroller.hideLoading();

    currentOwner.ref.detectChanges();

  }

  finishSign(hex, currentOwner) {




    currentOwner.broadcastTx(hex, currentOwner);

  }
  signBoO(currentOwner: any) {


    var params = {};


    params["address"] = currentOwner.dataService.maincontroller.currentAddress;


    var json = JSON.stringify({ signType: "transaction", "toSign": currentOwner.unsigned_tx, "params": params });

    currentOwner.dataService.setCurrentSignData(json, currentOwner.finishSign, currentOwner.signError, currentOwner);

    currentOwner.sending = true;

  }

  cancelOrder() {

    if (this.dataService.maincontroller.getPersistance("cancel:" + this.data.tx_hash) != "") {

      alert('Seems like you have already placed a cancel transaction order, you may not want to continue');


    }
    var tmpthis = this;
    this.dataService.maincontroller.showLoading(this.dataService.getLang("please_wait"));
    console.log("Data " + JSON.stringify(this.data));
    tmpthis.indiesquare = new IndieSquare({
      'apikey': this.httpService.apiKey
    });
    var sendParams = { "source": this.dataService.maincontroller.currentAddress, "offer_hash": this.data.tx_hash };
    if (this.dataService.maincontroller.feeIsCustom(this.dataService.maincontroller.currentFee)) {

      sendParams["fee_per_kb"] = parseFloat(this.dataService.maincontroller.customFee) * 1000;

    } else {
      sendParams["fee_per_kb"] = this.dataService.maincontroller.fees[this.dataService.maincontroller.currentFee];


    }


    tmpthis.indiesquare.createCancel(sendParams, function(data, error) {



      if (error) {
        tmpthis.dataService.maincontroller.showingLoading = false;
        console.error(error);
        if (typeof error.message != "undefined") {
          tmpthis.dataService.maincontroller.showMessage(error.message);
        } else {
          tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("error"));
        }
        return;
      }


      tmpthis.unsigned_tx = data.unsigned_tx;
      var feeBTC = data.fee / 100000000;
      if (tmpthis.dataService.maincontroller.linkType == "indiesquare") {

        tmpthis.indiesquare.signTransaction({ 'unsigned_tx': tmpthis.unsigned_tx }, function(url, urlScheme, error) {

          if (error) {
            tmpthis.dataService.maincontroller.showingLoading = false;
            console.error(error);
            tmpthis.dataService.maincontroller.showMessage(error);



            return;
          }

          if (!tmpthis.dataService.isMobile) {
            tmpthis.dataService.maincontroller.showQR(url);
          }


        }, function(result, error) {
          tmpthis.dataService.maincontroller.closeQR();
          if (error) {
            tmpthis.dataService.maincontroller.showingLoading = false;
            console.error(error);
            tmpthis.dataService.maincontroller.showMessage(error);

            return;
          } else {

            console.log(result.signed_tx);


            tmpthis.broadcastTx(result.signeed_tx, tmpthis)

          }


        });





      }
      else if (tmpthis.dataService.maincontroller.linkType == "BoO") {
        tmpthis.dataService.maincontroller.hideLoading();
        tmpthis.dataService.maincontroller.showConf(tmpthis.dataService.getLang('you_are_canceling', feeBTC + ""), tmpthis.signBoO, tmpthis.cancelCancelOrder, tmpthis);

      }
      else if (tmpthis.dataService.maincontroller.linkType == "webXCP") {



        webXCP.signTransaction(tmpthis.unsigned_tx, function(err, result) {

          if (err != undefined) {

            tmpthis.dataService.maincontroller.hideLoading();

            tmpthis.dataService.maincontroller.detectChanges();


          } else {

            tmpthis.broadcastTx(result, tmpthis);

          }

        })


      }
      else {

        tmpthis.dataService.maincontroller.hideLoading();
        tmpthis.dataService.maincontroller.showConf(tmpthis.dataService.getLang('you_are_canceling', feeBTC + ""), tmpthis.getPassphrase, tmpthis.cancelCancelOrder, tmpthis);

      }




    });



  }

  broadcastTx(hex, currentOwner) {

    currentOwner.dataService.maincontroller.closeQR();
    currentOwner.indiesquare.broadcast({ "tx": hex }, function(data, error) {

      currentOwner.dataService.maincontroller.hideLoading();
      if (error) {

        console.error(error);
        currentOwner.dataService.maincontroller.showMessage(error);
        currentOwner.ref.detectChanges();
        return;
      }
      currentOwner.dataService.history.reloadOrders();
      currentOwner.dataService.maincontroller.showMessage(currentOwner.dataService.getLang("order_canceled"));

      currentOwner.dataService.maincontroller.setPersistance("cancel:" + currentOwner.data.tx_hash, "cancelled");
      currentOwner.ref.detectChanges();
    });

  }
  getCancelTitle() {
    return this.dataService.getLang("canceling_order_status", this.data.offer_hash);
  }
  getCancelStatus() {
    return this.data.status;
  }
  getOrderTitle1() {
    if (this.data != null) {
      if (this.data.type == "sell") {
        if (this.data.status == "filled") {
          return this.dataService.getLang("status_sold");
        }
        else if (this.data.status == "expired") {
          return this.dataService.getLang("status_couldnt_sell");
        }
        return this.dataService.getLang("status_selling");
      }
      else if (this.data.type == "buy") {
        if (this.data.status == "filled") {
          return this.dataService.getLang("status_bought");
        }
        else if (this.data.status == "expired") {
          return this.dataService.getLang("status_couldnt_buy");
        }
        return this.dataService.getLang("status_buying");
      }
    }

  }

  getOrderInfo() {
    if (this.data != null) {
      if (this.data.type == "sell") {
        return this.dataService.getLang("order_sell_info", this.data.give_quantity, this.data.give_token, this.data.get_quantity, this.data.get_token, this.getOrderStatus());
      }
      else if (this.data.type == "buy") {

        return this.dataService.getLang("order_buy_info", this.data.get_quantity, this.data.get_token, this.data.give_quantity, this.data.give_token, this.getOrderStatus());

      }
    }
  }

  getOrderTitle2() {

    return this.dataService.getLang("order_status");

  }



  getOrderStatus() {
    if (this.data != null) {
      return this.data.status;
    }

  }

  getOrderTitle3() {

    return this.dataService.getLang("order_date");

  }



  getInfo() {
    if (this.data != null) {

      if (this.data.type == "order") {
        return this.dataService.getLang("order_pending");
      } else {
        if (this.data.category == "Send") {

          return this.dataService.getLang("order_info_sent", this.data.quantity, this.data.token);

        }
        else if (this.data.category == "Receive") {
          return this.dataService.getLang("order_info_receive", this.data.quantity, this.data.token);

        }
      }
    }

  }



  getAddress() {
    if (this.data != null) {
      if (this.data.type == "order") {
        return this.dataService.getLang("order_order_info", this.data.get_quantity, this.data.get_asset, this.data.give_quantity, this.data.give_asset);

      } else {


        if (this.data.category == "Send") {
          return this.data.destination;
        }
        else if (this.data.category == "Receive") {
          return this.data.source;
        }
      }

    }
  }

  getDateTitle() {
    if (this.data != null) {
      if (this.data.type == "order") {
        return this.dataService.getLang("order_status");
      } else {
        return this.dataService.getLang("order_date");
      }
    }
  }
  getDate() {
    if (this.data != null) {
      if (this.data.unconfirm) {
        return this.dataService.getLang("order_unconfirmed");
      }
      else if (this.data.time != null) {

        var dateString = this.data.time.replace('T', ' ');
        dateString = dateString.replace('-', '/');
        dateString = dateString.replace('-', '/');
        dateString = dateString.replace('-', '/');
        // console.log("ds"+dateString);
        //	 dateString = "2015/12/31 00:00:00";
        //2017/10/17T09:31:12+0000
        let date = new Date(dateString);

        var hourOffset = date.getTimezoneOffset() / 60;

        date.setHours(date.getHours() + hourOffset);



        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var minutes = date.getMinutes();
        var hours = date.getHours();
        var seconds = date.getSeconds();
        var myFormattedDate = day + "-" + (monthIndex + 1) + "-" + year + " " + hours + ":" + minutes + ":" + seconds;

        return myFormattedDate;
      }

      return "";
    }
  }



  getWidth() {
    if (this.dataService.isMobile) {
      var pxWidth = (document.documentElement.clientWidth * 0.9);

      return pxWidth + "px";
    }
    else {
      var pxWidth = (document.documentElement.clientWidth * 0.4);

      return pxWidth + "px";

    }
  }
  getHeight() {
    if (this.dataService.isMobile) {
      var pxWidth = (document.documentElement.clientWidth * 0.9);
      var pxHeight = pxWidth * 0.55;

      return pxHeight + "px";
    }
    else {
      var pxWidth = (document.documentElement.clientWidth * 0.4);
      var pxHeight = pxWidth * 0.55;

      return pxHeight + "px";

    }



  }

  isTransaction() {
    if (this.historyType == "transaction") {
      return true;
    }

    return false;

  }

  cancelCancelOrder(owner: any) {
    owner.loading = false;
  }

  getPassphrase(currentOwner: any) {

    currentOwner.dataService.maincontroller.showPassword(currentOwner.cancelSend, currentOwner.broadcast, currentOwner);
  }


  broadcast(passphrase: string, owner: any) {


    owner.loading = true;

    var tmpthis = owner;
    tmpthis.dataService.maincontroller.showLoading(this.dataService.getLang("please_wait"));

    var params = {
      "unsigned_tx": tmpthis.unsigned_tx,
      "type": "cancel",
      "passphrase": passphrase
    }

    var result = tmpthis.dataService.signRawTransaction(params, function(error, signed_tx) {

      if (error != null) {
        tmpthis.loading = false;
        tmpthis.dataService.maincontroller.hideLoading();
        console.log("error" + error);
        tmpthis.dataService.maincontroller.showMessage(error);
        tmpthis.ref.detectChanges();
        return;
      }

      tmpthis.broadcastTx(signed_tx, tmpthis);



    });





  }








}
