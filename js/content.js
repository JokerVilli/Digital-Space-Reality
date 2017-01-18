/******************* Global variables declaration *******************/
var baseUrl = chrome.i18n.getMessage("baseUrl");
var utmSource = chrome.i18n.getMessage("utmSource");
var authPage = chrome.i18n.getMessage("mediumUrlAuth");
var counterPage = chrome.i18n.getMessage("mediumUrlCount");



	



if (window.location.href.indexOf(counterPage)>=0) {
	var shopId = getURLParameter('shop_id');
	var targetHostname;
	console.log(shopId);
	chrome.storage.local.get(function(obj) {
		var partnersArray = obj.fullPartnersInfo
		var partnerInfo = false
		partnersArray.forEach(function(partner) {
			if (shopId == partner.id) {
				targetHostname = 'http://'+partner.domain;
				setCookie('targetHostname', targetHostname)
			}
		});
	})
}



/******************* Event listeners declaration *******************/

// Listen for a message from background.js
chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request)
    if (request.offer) {
        showWarning(request.offer, request.isCashbackActive, request.userInfo)
    }
	console.log(request.location)
	if (request.location) document.location = request.location;
    return true;
});


/******************* Functions declaration *******************/

function showWarning(partnerData, activeFlag) {
	console.log('show div')
	var body = $('body');
	var template = _.template(chrome.i18n.getMessage("banner_cashback"));
	var templateCashback = template({
		cashback: partnerData.cashback
	});
	body.append("<div class='partnerOffer'>"+templateCashback+"<br /><a href='' id='ext_btn'>"+chrome.i18n.getMessage('banner_non_activated')+"</a></div>" )
	$('.partnerOffer').animate({
		opacity: 1
	}, 1000)
	if (activeFlag) $('.partnerOffer').addClass('partnerOfferActiveCashback').html(chrome.i18n.getMessage("banner_activated"));
	$('.partnerOffer').append("<span id='close_marker'>&#x2716;<span>")
	$('body').find("#close_marker").click(function() {
		$('.partnerOffer').hide().remove();
	})
	body.find("#ext_btn").click(function(event) {
        event.preventDefault();
        //document.location = isAuthorized(user)+'?shop_id=' + partnerData.id + '&utm_source=' + utmSource;
		var activateCashbackLocation = 'http://'+chrome.i18n.getMessage("mediumUrl")+'/ext_test'+chrome.i18n.getMessage("mediumUrlCount")+'?shop_id=' + partnerData.id + '&utm_source=' + utmSource;
        document.location = activateCashbackLocation;
      });
}


function getURLParameter(name) {
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
