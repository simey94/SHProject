chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    // modify printing to each line (dont send back as one huge HTML element)
    // print each iframe individually
    // not inner text another element
    var iframes = request.source.match(/(<iframe.*?>.*?<\/iframe>)/g);
    if(iframes == null){
      iframeCount.innerText += "Sorry no iFrames were found on this page!";
    } else {
      iframeCount.innerText += "Number of iFrames on this page: " + iframes.length + "\n";
    }

    var listIndex = 1;
    for(var i =0; i < iframes.length; i++){
      message.innerText += listIndex + ") " + iframes[i];
      listIndex ++;
      message.innerHTML += "<br /> <br />"; 
    }
    //message.innerText += request.source;
  }
});

function onWindowLoad() {
  var message = document.querySelector('#message');
  var iframeCount = document.querySelector('#iframeCount');

  //window.open(url, '_blank');

  // document.addEventListener('DOMContentLoaded', function () {
  // var el = document.getElementById('searchButton');
  // el.addEventListener('click', clickHandler);
  // });

  // function clickHandler(){
  //   var searchTerm = document.getElementById('mySearch').getInnerText;
  //   console.log(searchTerm);  
  // }


  // chrome.browserAction.onClicked.addListener(function(activeTab)
  // {
  //   var newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
  //   chrome.tabs.create({ url: newURL });
  // });

  // document.addEventListener('DOMContentLoaded', function() {
  //     document.getElementById("searchButton").addEventListener('click',function ()
  //     {
  //      console.log("hello");
  //      //validation code to see State field is mandatory.  
  //     }  ); 
  // });


  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    document.getElementById('url').textContent = "The URL you are browsing is: " + url;

  chrome.tabs.executeScript(null, {
    file: "getPageSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
  });
}

// chrome.runtime.sendMessage({'method':'getInfo'},function(response){
//   //response is now the info collected by the content script.
//   console.log(response);
// });

window.onload = onWindowLoad;