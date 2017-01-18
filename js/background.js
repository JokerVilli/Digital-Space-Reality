/******************* Global variables declaration *******************/
var alarmDelay = 2;
var baseUrl = chrome.i18n.getMessage("baseUrl");
var mediumUrl = chrome.i18n.getMessage("mediumUrl");
var utmSource = chrome.i18n.getMessage("utmSource");
var authPage = chrome.i18n.getMessage("mediumUrlAuth");
var counterPage = chrome.i18n.getMessage("mediumUrlCount");
var reqUserName = null;
var reqUserPassword = null;
var priceDown = 0;
var priceUp;
var cityFrom = '';
var cityTo = '';
var timeUp;
var timeDown = 0;


/******************* General execution block *******************/

// Get values from cookies
priceDown = getCookie('priceDown');
priceUp = getCookie('priceUp');
priceDown = getCookie('priceDown');
priceDown = getCookie('priceDown');
priceDown = getCookie('priceDown');


console.log('create alarm')
chrome.alarms.create('alarm', {periodInMinutes:1})


/******************* Event listeners declaration *******************/

chrome.alarms.onAlarm.addListener(function (alarm){
  console.log('alarm catched');
})


/******************* Functions declaration *******************/


// Send an XMLHttpRequest to API
function sendReq(uri, param) {
    console.log('send a request')
    var req = new XMLHttpRequest();
    req.open("GET", baseUrl + uri, true, reqUserName, reqUserPassword);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            var data = JSON.parse(req.responseText);
            param.success(data);
        }
    };
    req.send();
}


var putPartnersInfoInStorage = {
    success: function(data) {
        console.log('save data')
        if (Object.keys(data).length) {
            localStorage.clear();
            localStorage.fullPartnersInfo = JSON.stringify(data);
            chrome.storage.local.set({
                fullPartnersInfo: data,
				//userInfo: 'Stas',
            }, function() {});
        }
    },
};

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
