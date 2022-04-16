/* var myclient;

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    //request following

  var xhr = new XMLHttpRequest();
  xhr.open('GET',
    'https://www.googleapis.com/youtube/v3/captions/9P6rdqiybaw' +
    '&access_token=' + response.credential + '&tlang=' + 'en');
  xhr.onreadystatechange = function (e) {
  console.log(xhr.response);
  };
  xhr.send(null); 

    /*
    var request =  gapi.client.youtube.captions.download({'id': '9P6rdqiybaw'});
    request.execute(function(response) { console.log(response) });
    */ /*
}

/*window.onload = function () {
  myclient = google.accounts.id.initialize({
    client_id: "787718893823-ief5upq817odgurk45ga691p9m3ejd57.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}*/ /*
function OldOnloadFunction() {
  google.accounts.id.initialize({
    client_id: "787718893823-ief5upq817odgurk45ga691p9m3ejd57.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}


function newCallbackFunction(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  //request following
  var xhr = new XMLHttpRequest();
  xhr.open('GET',
    'https://www.googleapis.com/youtube/v3/captions/9P6rdqiybaw' +
    '&access_token=' + response.credential + '&tlang=' + 'en');
  xhr.onreadystatechange = function (e) {
  console.log(xhr.response);
  };
  xhr.send(null); 
}


function start() {
  gapi.client.init({
    'apiKey': 'AIzaSyDg6gpX1vRkWQ-d4sWFrJMelJEga2zlNrU',
    'clientId': '787718893823-ief5upq817odgurk45ga691p9m3ejd57.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/youtube.force-ssl'
  })
};

// Load the JavaScript client library and invoke start afterwards.
gapi.load('client', start);

//gapi.client.getToken().id_token

function trydathing() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET',
    'https://www.googleapis.com/youtube/v3/captions/9P6rdqiybaw' +
    '&access_token=' + gapi.client.getToken().id_token + '&tlang=' + 'en');
  xhr.onreadystatechange = function (e) {
  console.log(xhr.response);
  }
  xhr.addEventListener("error", console.log)
  xhr.send(null);
}

*/

//=================================
//=========Promise==================
//=================================

//https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps#js-client-library



var GoogleAuth; 
function initClient() {
  gapi.client.init({
    'apiKey': 'AIzaSyDg6gpX1vRkWQ-d4sWFrJMelJEga2zlNrU',
    'clientId': '787718893823-ief5upq817odgurk45ga691p9m3ejd57.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);
});

}

function start() {
  gapi.client.init({
    'apiKey': 'AIzaSyDg6gpX1vRkWQ-d4sWFrJMelJEga2zlNrU',
    'clientId': '787718893823-ief5upq817odgurk45ga691p9m3ejd57.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/youtube.force-ssl'
  })
};

gapi.load('client', start);

//gapi.client.getToken().id_token





//==================================