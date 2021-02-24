import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import SignIn from "./SignIn";
import { Link, isRedirect, Redirect} from "@reach/router";
import ReactAudioPlayer from 'react-audio-player';


const Songs = () => { //Has three pieces of state:
    const [error, setError] = useState(null);//For displaying error message 


    const Http = new XMLHttpRequest();
    const url='https://tw0uqnivkf.execute-api.us-east-1.amazonaws.com/s3file';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
      if (Http.readyState == 4) {
        const obj = JSON.parse(Http.responseText);
        console.log(obj);
        document.getElementById('song').style.display = 'inline-block';
        document.getElementById('mp3-player').src=obj[12];
        obj.forEach(function (item) {
          console.log(item.Key);
          var song = document.createElement("BUTTON");
          song.innerHTML = item.Key;                 
          document.getElementById('song').appendChild(song);
        });
      }
    }

    return (
        <div className="">
        <h1 className="text">Artist</h1>
        <Link to="/">
            <button type="button" className="logout-artist-button">Log Out</button>
        </Link>
        <div className="container">
            {error !== null && (
            <div className="error">
                {error}
            </div>
            )}
            <h2 className="text">Title</h2>
            <button id="song"> </button>

            <ReactAudioPlayer id="mp3-player"
            src="my_audio_file.ogg"
            autoPlay
            controls
            />
        </div>
        </div>
    );
};

export default Songs;