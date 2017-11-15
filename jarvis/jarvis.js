var mic = new Wit.Microphone(document.getElementById("microphone"));
      var info = function (msg) {
        document.getElementById("info").innerHTML = msg;
      };
      var error = function (msg) {
        document.getElementById("error").innerHTML = msg;
      };
      mic.onready = function () {
        info("Click the mic to start recording");
      };
      mic.onaudiostart = function () {
        info("Recording started, click again to stop");
        error("");
      };
      mic.onaudioend = function () {
        info("Recording stopped, processing started");
      };
      mic.onresult = function (intent, entities) {
        var r = kv("intent", intent);
        for (var k in entities) {
          var e = entities[k];
          if (!(e instanceof Array)) {
            r += kv(k, e.value);
            if(k == "intent"){
                if(e.value == "greeting"){
                    speak("Hello! sir, I am online and ready");
                    break;
                }
                else if(e.value == "weather"){
                    getWeather();
                    break;
                }
                
            }
            console.log(e.value);
          } else {
            for (var i = 0; i < e.length; i++) {
              r += kv(k, e[i].value);
              console.log("loop");
            }
          }
        }
      };
      mic.onerror = function (err) {
        error("Error: " + err);
      };
      mic.onconnecting = function () {
        info("Microphone is connecting");
      };
      mic.ondisconnected = function () {
        info("Microphone is not connected");
      };

      mic.connect("Y2XBXF7UMMARWZRXXD7ML3X3JWS5ZDBP");
      // mic.start();
      // mic.stop();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = function(e) {
            loadVoices();
    };
    var startPos;
    $(document).ready(function(){
      var geoSuccess = function(position) {
        startPos = position;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    });
    function loadVoices() {
        // Fetch the available voices.
        var voices = speechSynthesis.getVoices();
    }
    function speak(text) {
      // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

      // Set the text.
        msg.text = text;
      // Set the attributes.
        msg.volume = 1; // 0 to 1
        msg.rate = 0.9; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google UK English Male"; })[0];
        
        info(text);
      // Queue this utterance.
        window.speechSynthesis.speak(msg);
    }
    function forecastFor(apiRes) {
      return Number(apiRes.currently.apparentTemperature).toString()+" degrees, and "+(apiRes.minutely.summary);
    }
        
    function getWeather() {
      $.ajax({
              url: "https://api.darksky.net/forecast/1af980489f41fafa200e38694e73344d/"+startPos.coords.latitude+","+startPos.coords.longitude,
              dataType: "JSONP"
         }).done(function(data) {
                  console.log(data);
                  var weather = forecastFor(data);
                  console.log(weather);
                  speak("Sir, it is "+weather);
         }).fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        });
    }

      function kv (k, v) {
        if (toString.call(v) !== "[object String]") {
          v = JSON.stringify(v);
        }
        return k + "=" + v + "\n";
      }