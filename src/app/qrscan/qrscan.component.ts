import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
declare var QCodeDecoder:any;

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.css']
})
export class QrscanComponent implements OnInit {
 localstream:any;
video:any;
  constructor(public dataService:DataService) { }

  ngOnInit() {

    
  	var tmpthis = this;
        tmpthis.video = document.getElementById('preview') as any
     tmpthis.video.style.top = 0;
      tmpthis.video.style.height = "100vh";
      tmpthis.video.style.width = "100vw";
       tmpthis.video.setAttribute('autoplay', '');
      tmpthis.video.setAttribute('muted', '');
      tmpthis.video.setAttribute('playsinline', '');

 
    var constraints = {
         audio: false  ,
        video: {
             facingMode: 'environment'
         } 
    }

    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
    	tmpthis.localstream = stream;
          tmpthis.video.srcObject = stream;

       

    });  

    QCodeDecoder()
  .decodeFromVideo(  tmpthis.video, function(er,res){
    
    if(typeof res != "undefined"){
    	 
    	this.dataService.maincontroller.currentSendAddress = res;
    	this.exit();
    }

  });
     
        
    

  }

   exit(){
 
         this.video.pause();
  this.video.src = "";
   this.localstream.getTracks()[0].stop();

  console.log("Vid off");
  	this.dataService.maincontroller.showAccount = true;
  	this.dataService.maincontroller.showQRScan = false;
  }

}
