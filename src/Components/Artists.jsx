import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import SignIn from "./SignIn";
import { Link, isRedirect, Redirect} from "@reach/router";
import ReactAudioPlayer from 'react-audio-player';

const Artists = () => { //Has three pieces of state:
    const [error, setError] = useState(null);//For displaying error message 


    // const Http = new XMLHttpRequest();
    // const url='https://tw0uqnivkf.execute-api.us-east-1.amazonaws.com/s3file';
    // Http.open("GET", url);
    // Http.send();

    // Http.onreadystatechange = (e) => {
    //   if (Http.readyState == 4) {
    //     console.log("Print once");
    //     const obj = JSON.parse(Http.responseText);
    //     document.getElementById('song').style.display = 'inline-block';
    //     obj.forEach(function (item) {
    //       console.log(item.Key);
    //       var song = document.createElement("BUTTON");
    //       song.innerHTML = item.Key;                 
    //       document.getElementById('song').appendChild(song);
    //     });
    //   }
    // }

    const handleGetRequest = () => {
        const Http = new XMLHttpRequest();
        const url='https://tw0uqnivkf.execute-api.us-east-1.amazonaws.com/s3file';
        Http.open("GET", url);
        Http.send();
    
        Http.onreadystatechange = (e) => {
          if (Http.readyState == 4 && Http.status == 200)
          {
            if (Http.responseText)
             {
              var songs = [];
              songs = JSON.parse(Http.responseText);
              songs.forEach(function callback(item, index) {
                var song = document.createElement("BUTTON");
                song.innerHTML = "Song " + index; 
                song.id = "Song_" + index;
                song.onclick = function(){ setAudioPlayer(item); } ;
                document.getElementById('songs').appendChild(song);
                UpdateSongInfo(item, song.id);
              });
             }
          }
        }
      }
    
      const setAudioPlayer = (songURL) => {
        document.getElementById('mp3-player').src = songURL;
      }
    
      const UpdateSongInfo = (link, songID)  =>  {
        var path = link.split('/');
    
        // document.getElementById("artist").innerHTML = PathFromUrl(path[1]);
        // document.getElementById("album").innerHTML = PathFromUrl(path[2]);
        // document.getElementById(songID).innerHTML = 
        console.log(PathFromUrl[0]);
        console.log(PathFromUrl[1]);
        console.log(PathFromUrl[2]);
        console.log(PathFromUrl[3]);
        console.log(PathFromUrl[4]);
      }
    
     const PathFromUrl = (path)  =>  {
        path = path.replace(/%20/g, " ");
        path = path.replace(/\.mp3/g, "");
        return path;
      }

    return (
        <div className="">
        <h1 className="text">Artists</h1>
        {handleGetRequest()}
        <Link to="/">
            <button type="button" className="logout-artist-button">Log Out</button>
        </Link>
        <div className="container">
            {error !== null && (
            <div className="error">
                {error}
            </div>
            )}
            <button id="songs"> </button>

            <ReactAudioPlayer id="mp3-player"
            // src="my_audio_file.ogg"
            autoPlay
            controls
            />
        </div>
        </div>
    );
};

export default Artists;