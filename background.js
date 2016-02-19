document.addEventListener('DOMContentLoaded', function () {
var el = document.getElementById('searchButton');
document.getElementById("searchLabel").style.visibility = "hidden";
document.getElementById("copyButton").style.visibility = "hidden";
el.addEventListener('click', clickHandler);
});

var iframesConstant;
// to ensure history when reverting to a good search
// window.onLoad = function(){
// 	iframesConstant = document.getElementById("message").innerText;
// }


function clickHandler(){
	//message.innerText = iframesConstant;
	document.getElementById("searchLabel").style.visibility = "visible";
	document.getElementById("copyButton").style.visibility = "visible";
	
	document.getElementById('message').style.display = "block";
	var searchTerm = document.getElementById('mySearch').value;
	var iframes = document.getElementById('message').innerText;
	var previousSearch = document.getElementById('searchTerm').innerText =  "You searched for: " + searchTerm;
	var message = document.querySelector('#message');
	//var searchIframes = document.querySelector('#searchIframes');	
    //console.log(iframes); 

    // put iframes into array to search
    var iframesArray = iframes.match(/(<iframe.*?>.*?<\/iframe>)/g);
    //console.log(iframesArray);
    //message.innerText = "Searching... \n";
    var count = 0;
    searchMessage.innerText = "";

    var listIndex = 1;
    for(var i =0; i < iframesArray.length; i++){
    	console.log("in loop");
		//if(iframes[i].indexOf(searchTerm) > -1){
			var frame = iframesArray[i];
			if(frame.includes(searchTerm)){
			count ++;
			var output = listIndex + ") ";
			var boldOutput = output.bold();
			searchMessage.innerHTML += boldOutput;
			searchMessage.innerText += frame + "\n" + "\n";
			listIndex ++;
			console.log("added an iframe");
		}	
    }
    console.log(count);
    var searchCount = document.getElementById("searchIframesCount").innerText = "After search number of iFrames:  " + count.toString();
}

document.addEventListener('DOMContentLoaded', function () {
var element = document.getElementById('copyButton');
element.addEventListener('click', copyButtonClickHandler);
});

function copyButtonClickHandler(){
var copyButton = document.getElementById("copyButton"); 
console.log(copyButton); 
  
  // Select the email link anchor text  
  var searchResults = document.getElementById("searchMessage");  
  var range = document.createRange();  
  range.selectNode(searchResults);  
  window.getSelection().addRange(range);  

  try {  
    // Now that we've selected the anchor text, execute the copy command  
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  
 
  window.getSelection().removeAllRanges();  
};

// var info;
// chrome.runtime.onMessage(function(message,sender,sendResponse){
//   // When we get a message from the content script
//   if(message.method == 'setInfo')
//     info = message.info;
//   // When we get a message from the popup
//   else if(message.method == 'getInfo')
//     sendResponse(info);
// });

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById("mySearch").addEventListener('click',function ()
//     {
//      console.log("hello");
//      //validation code to see State field is mandatory.  
//     }  ); 
// });