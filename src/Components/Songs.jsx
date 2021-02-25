import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import SignIn from "./SignIn";
import { Link, isRedirect, Redirect} from "@reach/router";
import ReactAudioPlayer from 'react-audio-player';


const Songs = () => { //Has three pieces of state:
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
                var song = document.createElement("LI");
                var button = document.createElement("BUTTON");
                button.innerHTML = "Song " + index;
                song.id = "Song_" + index;
                button.id = "Song_button_" + index;
                button.className = "song_btn";
                button.onclick = function(){ setAudioPlayer(item); } ;  
                document.getElementById('ul-id').appendChild(song);
                document.getElementById("Song_" + index).appendChild(button);
                UpdateSongInfo(item, button.id); 
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
    
        document.getElementById(songID).innerHTML = PathFromUrl(path[5]).split('?')[0];
        console.log(PathFromUrl(path[0]));
        console.log(PathFromUrl(path[1]));
        console.log(PathFromUrl(path[2]));
        console.log(PathFromUrl(path[3]));
        console.log(PathFromUrl(path[4]));
        console.log(PathFromUrl(path[5]).split('?')[0]);
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
        <div className="container" id="id-container">
            {error !== null && (
            <div className="error">
                {error}
            </div>
            )}
            <h1 className="text">Title</h1>
            <ul id="ul-id"></ul>
            <ReactAudioPlayer id="mp3-player"
            autoPlay
            controls
            />
        </div>
        <div className="container2" id="id-container">
            {error !== null && (
            <div className="error">
                {error}
            </div>
            )}
            <h1 className="text">Album</h1>
            <ul id="ul-id"></ul>
            <ReactAudioPlayer id="mp3-player"
            autoPlay
            controls
            />
        </div>
        </div>
    );
};

export default Songs;