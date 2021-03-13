onload = function() {
    startProg(); 
}
let player = undefined;
let curTranscript = undefined;
const WIDTH = 600;
const HIGHT = 600;
const VIDEOLINK = "https://video.google.com/timedtext?v="
const VIDEOLANGAUGE = "https://video.google.com/timedtext?type=list&v="
const LANGUAGEADD = "&lang="

async function startProg() {
    await loadYTAPI();
    //await setVideo("https://www.youtube.com/watch?v=HZ4HdhKJITI");    
}

async function setVideo(video) {
    if(video == "") {
        alert("there has been something wrong... No Video?");
        return;
    }
    else{
        if(player === undefined) {
            player = await createYTPlayer("MyPlayer", WIDTH,HIGHT, video);
            //console.log(await getLanguageList(video));
        }
        else{
            await changeYTVideo(player, video);
        }
    }
    //console.log(video);
    let languageList = await getLanguageList(video);
    let select = document.createElement("SELECT");
    for(let l of languageList){
        let option = document.createElement("OPTION");
        option.value = l.code;
        option.appendChild(document.createTextNode(l.languageName));
        select.appendChild(option);
    }
    document.getElementById("platzfuerselect").innerHTML = "";
    document.getElementById("platzfuerselect").appendChild(select);
    let nextButton = document.createElement("INPUT");
    nextButton.type = "BUTTON";
    nextButton.value="OK";
    nextButton.onclick = async function() {
        //console.log(await loadTranscript(video, select.value));
        //console.log(getText(curTranscript));
        curTranscript = getText(await loadTranscript(video, select.value));
        //console.log(curTranscript, video, select.value);

        renderText();
    };
    document.getElementById("platzfuerselect").appendChild(nextButton);
}

async function getLanguageList(videoID) {
    var request = new XMLHttpRequest(); 
    request.open("GET", VIDEOLANGAUGE + videoID, true);
    request.responseType = 'document';
    request.overrideMimeType('text/xml');
    return new Promise(function(resolve, reject) {
        request.onload = function () {
            if (request.readyState === request.DONE) {
              if (request.status === 200) {
                resolve(parseLanguageList(request.responseXML));
              }
              else{
                  reject(request.status);
              }
            }
          };
          request.send(null);
    })
}

function parseLanguageList(xmldoc) {
let transcriptList = xmldoc.childNodes[0];
let XMLTracks = transcriptList.childNodes;

let ret = [];
    for(let t of XMLTracks){
        ret.push({code: t.attributes.lang_code.value, languageName: t.attributes.lang_translated.value})
    }
return ret;
}

async function loadTranscript(videoID, language){
    var request = new XMLHttpRequest();
    request.open("GET", VIDEOLINK + videoID + LANGUAGEADD + language, true);
    request.responseType = 'document';
    request.overrideMimeType('text/xml');
    return new Promise(function(resolve, reject) {
        request.onload = function () {
            if (request.readyState === request.DONE) {
              if (request.status === 200) {
                resolve(request.responseXML);
              }
              else{
                  reject(request.status);
              }
            }
          };
          request.send(null);
    });
}

function getText(xmldoc) {
    let textList = xmldoc.childNodes[0];
    let TimeStamps = textList.childNodes;
    let ret = [];
    for(let ts of TimeStamps){
        ret.push({start: ts.attributes.start.value, duration: ts.attributes.dur.value, textsnipit: ts.childNodes[0].data})
    }
    return ret;
}

function renderText() {
    let pltb = document.getElementById("PlatzhalterfuerTextBox");
    pltb.innerHTML = "";
    for(let entr of curTranscript) {
        let tbOPEN = false;
        let span = document.createElement("SPAN")
        span.innerHTML = entr.textsnipit;
        span.innerHTML += " "
        span.addEventListener("click", function(e) {
            console.log(e);
            jumpInVideo(player, entr.start)
        })
        span.addEventListener("dblclick", function(e) { 
            if(tbOPEN) {
                return;
            }
            tbOPEN = true;
            //textfield machen
            span.innerHTML = "";
            let tbtemp = document.createElement("INPUT");
            tbtemp.type = "Text";
            tbtemp.value = entr.textsnipit;
            tbtemp.size = 1.1 * entr.textsnipit.length;
            tbtemp.onchange = function() {
                entr.textsnipit = tbtemp.value;
            }
            span.appendChild(tbtemp);
            tbtemp.focus();
            tbtemp.addEventListener("focusout", function() {
                tbOPEN = false;
                entr.textsnipit = tbtemp.value;
                span.innerHTML = entr.textsnipit + " ";
            })
            
        });


        pltb.appendChild(span);
    }
    return pltb;
}