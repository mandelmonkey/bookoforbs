

var RBFTools = function() {
	var tools = foo;
var bitcoin = tools.bitcoin;
var crypto = bitcoin.crypto;
var txObject;
 var UTXOSs = [];
    var spentUTXOSs = [];
   var  inputAmount = 0;
     var  outputAmount = 0;
     var fee = 0;
     var increase = 0;
     var  includedInput;
     var includedInputAmount;
     var newInputAmount = 0;
     var newTx;
     var sourceAddress;
     var bumbFeeCallback;
     var checkFeeCallback;
     var currentRawTx;
     var counterpartyOutput = null;
     var changeAmount = 0;

 function RBFTools() {

 }


	RBFTools.prototype.setRBF = function(tx) {
	
		var txObj = bitcoin.Transaction.fromHex(tx);
 			txObj.ins.forEach(function (input, idx) {
       		input["sequence"] = 4294967293;
 		}); 

 		return txObj.toHex();

	}



	 function makeGetRequest(params,callback,error){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://api.indiesquare.me/v2/"+params, true);
		xhr.onload = function (e) {
  		if (xhr.readyState === 4) {
  		  if (xhr.status === 200) {
    		 callback(xhr.responseText);
    		} else {
      error(xhr.statusText);
    		}
  		}
};
xhr.onerror = function (e) {
 error(xhr.statusText);
};
xhr.send(null);
    }

function getOutputAmount(rawtx,index){


var txObj = bitcoin.Transaction.fromHex(rawtx);

 				var output = txObj.outs[index]; //calculate the output value
	 
			return output.value;
}

   function startGetUTXOAmounts(){
console.log(spentUTXOSs.length);
    	if(spentUTXOSs.length > 0){

    		var utxo = spentUTXOSs[spentUTXOSs.length-1];
    		makeGetRequest("transactions/"+utxo.txid+"/raw", 

			function callback(result){
				 
				var rawtx = JSON.parse(result);
				var rawtx = rawtx+""; 
				var amount = getOutputAmount(rawtx,utxo.index);
				inputAmount += amount;
				if(utxo.included == true){
					console.log("did include");
					includedInputAmount = amount;
					 
				}
				  spentUTXOSs.splice(-1,1);
				 startGetUTXOAmounts();

		},
		function error(error){
    		 startGetUTXOAmounts();
		},


		);
    	}else{
    		continueCheck();
    	}

    }

  RBFTools.prototype.continueBump =   function(newFee,callback){
 
    	 

 					  console.log ("inputAmount:"+inputAmount)
 					  console.log ("outAmount:"+ (outputAmount - changeAmount) )
 					  console.log ("fee:"+fee)
 					    console.log ("newfee:"+newFee)
 					  
 					    var increase =  newFee-fee;
 					      console.log ("bumb:"+increase)
 					  fee += increase; 	
 console.log ("newfee:"+fee)


  sourceAddress = getUserAddressFromTx(txObject);
console.log(sourceAddress);
		getUTXOS(sourceAddress).then(function(utxos) {
 
		  UTXOSs = utxos;

 
 					  newTx = new bitcoin.TransactionBuilder();
 
		 		try{

 				  selectInputs(outputAmount,fee,includedInput,UTXOSs);

 				}
 				catch(e){
 					callback(null,e);
 					return;
 				}

 				
 				  	newTx.tx["outs"] = [];
 				  	newTx.tx.outs.push(counterpartyOutput); //add back cp output;

 				  	//calculate new change
 				  	var newChange =  newInputAmount - (outputAmount+fee);
console.log("calc change "+ newInputAmount+" "+outputAmount+" "+fee);

 				  		console.log("new change "+newChange)

 				  	if(newChange  > 0){ //if new change exists add change output and push
 				  		newTx.addOutput(sourceAddress,newChange);
 				  	}
 				  	 
 				  
 				  	callback(newTx.buildIncomplete().toHex(),null);

 
	 		 }); 		 
       		
    }
  
	var getRawTx = function(txid){
		 return new Promise(function(resolve, reject) {
     	makeGetRequest("transactions/"+txid+"/raw", 

			function callback(result){
				resolve(JSON.parse(result));

		},
		function error(error){
    		resolve(null);

		},


		);
    })
 
		 

	}


		var getUTXOS = function(address){
		 return new Promise(function(resolve, reject) {
     	makeGetRequest("addresses/"+address+"/utxos", 

			function callback(result){
				resolve(JSON.parse(result));

		},
		function error(error){
    		reject(error);

		},


		);
    })
 
		 

	}

	function continueCheck(){

		  counterpartyOutput = null;
    	  changeAmount = 0;
 sourceAddress = getUserAddressFromTx(txObject);
console.log(sourceAddress);


 				txObject.outs.forEach(function (output, idx) { //calculate the output value

				var isChange = false;

				
				try{
 					var add = bitcoin.address.fromOutputScript(output.script);
 						console.log(add+" "+sourceAddress);
						if(add == sourceAddress){

							isChange = true;
							changeAmount = output.value;
							console.log("change "+changeAmount );
						}
					}
        			 catch(e){


        				 }
        				 if(!isChange){
        				 	outputAmount+=output.value;
        				 	counterpartyOutput = output;
        				 	 
        				 }
        				

 					 
               
       			 });


 					  fee = inputAmount - outputAmount - changeAmount;

 					  checkFeeCallback(true,fee,currentRawTx);

	}

	RBFTools.prototype.checkRBF = function(txid,callback,errorCallback) {
		checkFeeCallback = callback;
includedInput = null;

		spentUTXOSs = [];

 				  inputAmount = 0;
 				  includedInputAmount = 0;
 				  outputAmount = 0;
 				  fee= 0;



	 var isRBF = false;
		getRawTx(txid).then(function(rawTx) {

			if(rawTx == null){
				errorCallback("error please try again later");
				return;
			}
                       
		 
			var rawTx = rawTx+""; //for some reason need to add empty string in promise;
			currentRawTx = rawTx;
 	 console.log("rawtx "+rawTx);
	 txObject = bitcoin.Transaction.fromHex(rawTx);

	  
  spentUTXOSs = [];
 			txObject.ins.forEach(function (input, idx) {
 				console.log(input.sequence);
 				if(input.sequence == 4294967293){
 					isRBF = true;
 				}

			let txid = tools.buffer((input.hash).reverse(),'hex').toString('hex');
 				if(includedInput == null){
       				 includedInput = {"txid":txid,"index":input.index,"included":true};
       				  spentUTXOSs.push(includedInput);
       			}else{
       				 spentUTXOSs.push({"txid":txid,"index":input.index,"included":false});
       			}
       			 
 

       		 
 			}); 
 			if(isRBF == false){
				callback(false,null,null);
 				return;
 			}	
 			startGetUTXOAmounts();

 		
 				 
       		  }); 
 			  


    };
 
	RBFTools.prototype.bumpFee = function(txid,bumbAmount,callback) {
	bumbFeeCallback = callback;
	 
		spentUTXOSs = [];

 				  inputAmount = 0;
 				  includedInputAmount = 0;
 				  outputAmount = 0;
 				  fee= 0;
 				  increase = bumbAmount;
		getRawTx(txid).then(function(rawTx) {
                       
		 
			var rawTx = rawTx+""; //for some reason need to add empty string in prominse;
 	 includedInput = null;//get at least on input to resue for rfb

	 txObject = bitcoin.Transaction.fromHex(rawTx);

	 
		getUTXOS(sourceAddress).then(function(utxos) {
 
		  UTXOSs = utxos;
 			txObject.ins.forEach(function (input, idx) {
 				let txid = tools.buffer((input.hash).reverse(),'hex').toString('hex');
 				if(includedInput == null){
       				 includedInput = {"txid":txid,"index":input.index,"included":true};
       				  spentUTXOSs.push(includedInput);
       			}else{
       				 spentUTXOSs.push({"txid":txid,"index":input.index,"included":false});
       			}
       			 

       			

		 		

       		 


       		 
 			}); 

 				startGetUTXOAmounts();

 			console.log(txObject);
 			/*

       		 */
       		  }); 
 			}); 









                    };
		

	 function getValueFromUTXO(hash,index,utxos){
	 	console.log(hash);
	 	console.log(" ");
	 	console.log(" ");
	 	console.log(" ");
	 	for(var i =0;i<utxos.length;i++){
	 		var aUTXO = utxos[i];
console.log(aUTXO.txid +" "+aUTXO.vout);
	 		if(aUTXO.txid == hash && aUTXO.vout == index){
	 			console.log(aUTXO.txid +" "+aUTXO.vout);
	 		}
	 	}
	 }

	function getUserAddressFromTx(tx){
		var addresses = [];
		tx.ins.forEach(function (input, idx) {
			  
			  var scriptSig = bitcoin.script.compile([
                            input.script
                        ]);
 
		var asm = bitcoin.script.toASM(scriptSig);
		var pubkey = asm.substr( asm.length - 66); //get last 66 bytes of asm

	 
		var pubKeyBuffer = tools.buffer(pubkey,'hex')
		var address = bitcoin.ECPair.fromPublicKeyBuffer(pubKeyBuffer).getAddress();
	 
		addresses.push(address);
 
		});
		
		return addresses[0];//assuming all address are the same, not a good way to get the source address
	}
 
	function selectInputs(outputAmount,newFee,includedInput,utxos){


		 
		newTx.addInput(includedInput.txid, includedInput.index);
  

		var newInputs = [];
		newInputAmount = 0;

		newInputAmount  += includedInputAmount;

 		 

		utxos =  utxos.sort(function(a, b) { //order utxos by value
  			return a.amount - b.amount;
		});
 
 		var availableBalance = 0;

 		for(var i =0;i<utxos.length;i++){
			 
				 	var aUTXO = utxos[i];
				availableBalance +=  aUTXO.amount;
					 
		}
		console.log("available amount "+availableBalance);

		var requiredInputAmount = (outputAmount + newFee);

		console.log("required:"+requiredInputAmount+" current:"+newInputAmount +" "+includedInputAmount );
		for(var i =0;i<utxos.length;i++){
			
		
			if(newInputAmount <= requiredInputAmount){
				var aUTXO = utxos[i];

				 availableBalance-=aUTXO.amount;
				 
				newInputAmount += (aUTXO.amount * 100000000);

				console.log("required:"+requiredInputAmount+" current:"+newInputAmount +" "+(aUTXO.amount * 100000000) );
					newTx.addInput(aUTXO.txid,aUTXO.vout);
				 
			}else{
				break;
			}
		}

		if(newInputAmount < requiredInputAmount){
			throw "balance error";
			return;
		}
		
		newTx.tx.ins.forEach(function (input, idx) {
       		input["sequence"] = 4294967293;
 		}); 

		 


	}

	 function humanReadable(script){
	  
 	 	 var map = {}
for (var op in bitcoin.opcodes) {
  var code = bitcoin.opcodes[op]
  map[code] = op
}
 
 	 var chunks = bitcoin.script.decompile( script);
                     
           var str = "";       
chunks.forEach(function (chunk, idx) {
var mapped = map[chunk];
if(typeof mapped == "undefined"){
str+= " "+chunk.toString('hex');
}else{
str+= " "+map[chunk];
}
 

 }); 

return str;
 }


 return RBFTools;

}();
 

 

