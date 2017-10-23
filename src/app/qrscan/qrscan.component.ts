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
qrScanner:any;
  constructor(public dataService:DataService) { }

  ngOnInit() {
this.qrScanner = QCodeDecoder();
    
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

    this.qrScanner.decodeFromVideo(  tmpthis.video, function(er,res){
     //if (er) throw er;
    if(typeof res != "undefined"){
    	  
		tmpthis.qrScanner.stop();
		tmpthis.qrScanner = null;
    	tmpthis.dataService.maincontroller.currentSendAddress = res;
     
    	tmpthis.exit();
    	
    }

  });
     
        
    

  }

   exit(){
   if(this.video ){
         this.video.pause();
  this.video.src = "";
  if( this.localstream ){
   this.localstream.getTracks()[0].stop();
}
 }

   
  	 
  	this.dataService.maincontroller.showQRScan = false;
  	
  }

}
