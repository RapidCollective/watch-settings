Pebble.addEventListener("ready", function(e) {
  ////// {{shortName}} is from appInfo.js - it is the short form name of the pebbleApp (whatever that is)

  var settings;
  try {
    settings = JSON.parse(localStorage['{{shortName}}']);
    Pebble.sendAppMessageWithSizeCheck(settings);
  }
  catch(e) {
    // the dicitonary was never stored, the watchapp uses its default values
    settings = {};
    localStorage['{{shortName}}'] = JSON.stringify(settings);
  }
});

Pebble.addEventListener("showConfiguration", function (e) {
  ////// {{ preferences['url'] }} is the hosted html url

  var url = "{{ preferences['url'] }}?";

  var settings = JSON.parse(localStorage['{{shortName}}']);
  for (var key in settings) {
    if (settings.hasOwnProperty(key)) {
      url += encodeURIComponent(key) + "=" + encodeURIComponent(settings[key]) + "&";
    }
  }
  console.log("Hosted URL: " + url);
  Pebble.openURL(url);
});

Pebble.addEventListener("webviewclosed", function(e) {
  if ((typeof e.response === 'string') && (e.response.length > 0)) {
      var newSettings = decodeURIComponent(e.response);
      var newSettingsDictionary = JSON.parse(newSettings);

      var diffSettings = diff(newSettingsDictionary, JSON.parse(localStorage['{{shortName}}']));

      localStorage['{{shortName}}'] = newSettings;
      Pebble.sendAppMessageWithSizeCheck(diffSettings);
  }
});


Pebble.sendAppMessageWithSizeCheck = function(message) {
  if( Object.keys(message).length > 0){
    var size = 1;
    var partialDict = {};
    for(var key in message)
    {
      if (size + 7 + sizeOfObject(message[key]) < 124) {
        partialDict[key] = message[key];
        size += 7 + sizeOfObject(message[key]);
        delete message[key];
      }
      else {
        // send the partial dictionary
        if( Object.keys(partialDict).length > 0){
          Pebble.sendAppMessageWithRetry(partialDict, 5,
            function(e) {
              //send the remaining values in the initial dictionnary
              Pebble.sendAppMessageWithSizeCheck(message);
            },
            0);
        }
        return;
      }
    }
    Pebble.sendAppMessageWithRetry(partialDict, 5, 0, 0);
  }
};

/* Convenient function to automatically retry messages. */
/* from http://forums.getpebble.com/discussion/comment/83060/#Comment_83060 */
Pebble.sendAppMessageWithRetry = function(message, retryCount, successCb, failedCb) {
  var retry = 0;
  var success = function(e) {
    if (typeof successCb == "function") {
      successCb(e);
    }
  };
  var failed = function(e) {
    console.log("Failed sending message: " + JSON.stringify(message) + " - Error: " + JSON.stringify(e) + " - Retrying...");
    retry++;
    if (retry < retryCount) {
      Pebble.sendAppMessage(message, success, failed);
    }
    else {
      if (typeof failedCb == "function") {
        failedCb(e);
      }
    }
  };
  Pebble.sendAppMessage(message, success, failed);
};

function sizeOfObject( value ) {
    var bytes = 0;

    if ( typeof value === 'string' ) {
        bytes = value.length;
    }
    else if ( typeof value === 'number' ) {
        bytes = 4;
    }

    return bytes;
}

function diff(obj1, obj2) {
    var result = {};
    for(var key in obj1)
    {
        if (!obj2.hasOwnProperty(key) || obj2[key] !== obj1[key]) {
            result[key] = obj1[key];
        }
    }
    return result;
}
