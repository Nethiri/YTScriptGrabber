from http.server import HTTPServer, BaseHTTPRequestHandler
from youtube_transcript_api import YouTubeTranscriptApi as YTTranscriptAPI
import urllib.parse as urlparse
import json

params = {
    "vidID": "",
    "vidLangCode" : ""
}

def returnVideoLangages(vidID):
    try:
        languages = YTTranscriptAPI.list_transcripts(vidID)
    except Exception as e:
        print(e)
        print("VidID: " + vidID)

    ret = []
    for lang in languages:
        ret.append({
            'code': lang.language_code,
            'name': lang.language,
            'isGenerated': lang.is_generated,
            'isTranslatable': lang.is_translatable
            })
    return ret

def returnVideoScript(vidID, LangCode):
    try:
        ret = YTTranscriptAPI.get_transcript(vidID, languages=[LangCode])
    except Exception as e:
        print(e)
        print("VidID: " + vidID)
        print("Language Code: " + LangCode)
        return -1
    return ret



#server
class YTScriptGrabbingService(BaseHTTPRequestHandler):
    def do_GET(self):
        url_path = urlparse.urlparse(self.path)
        try:
            request_query = dict(qc.split("=") for qc in url_path.query.split("&"))
        except:
            #send error
            self.send_response(400)
            return
        



        #check what response should be given
        if {'vidID', 'vidLangCode'} <= request_query.keys():
            #both keys are present
            print("Both Keys are present...")
            jsonFile = returnVideoScript(request_query.get('vidID'), request_query.get('vidLangCode'))
            if(jsonFile == -1): 
                #error has encured
                self.send_response(400)
                return
            self.send_response(200)
            self.send_header('content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(jsonFile).encode())
            return

        if {'vidID'} <=request_query.keys():
            #only the Video ID is present
            print("Key vidID is present...")
            jsonFile = returnVideoLangages(request_query.get('vidID'))
            if(jsonFile == -1):
                #error has encured
                self.send_response(400)
                return
            self.send_response(200)
            self.send_header('content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(jsonFile).encode())
            return
        
        #either only vidLangCode is present or a wrong query is present
        self.send_response(400)
        return

def main():
    PORT = 9988
    server = HTTPServer(('', PORT), YTScriptGrabbingService)
    print('Server running on port %s.' % PORT)
    server.serve_forever()

if __name__ == "__main__":
    main()