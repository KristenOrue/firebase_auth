import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import SignIn from "./SignIn";
import { Link, isRedirect, Redirect} from "@reach/router";
import ReactAudioPlayer from 'react-audio-player';

const Artists = () => { //Has three pieces of state:
    const [error, setError] = useState(null);//For displaying error message 
    var artist_album = {};
    var album_song = {};
    var songs = [];


    const handleGetRequest = () => {
        const Http = new XMLHttpRequest();
        const url='https://im7wz9nsjf.execute-api.us-east-1.amazonaws.com/s3file';
        Http.open("GET", url);
        console.log("WE made it here")
        Http.send();

        Http.onreadystatechange = (e) => {
          if (Http.readyState == 4 && Http.status == 200)
          {
            if (Http.responseText)
             {
              songs = JSON.parse(Http.responseText);
              songs.forEach(function callback(item, index) {
                BuildDirLists(item);
              });
              setArtistButtons();
             }
          }
        }
    
        // Http.onreadystatechange = (e) => {
        //   if (Http.readyState == 4 && Http.status == 200)
        //   {
        //     if (Http.responseText)
        //      {
        //       var songs = [];
        //       songs = JSON.parse(Http.responseText);
        //       songs.forEach(function callback(item, index) {
        //         var song = document.createElement("LI");
        //         var button = document.createElement("BUTTON");
        //         button.innerHTML = "Song " + index;
        //         song.id = "Song_" + index;
        //         button.id = "Song_button_" + index;
        //         button.className = "song_btn";
        //         button.onclick = function(){ setAudioPlayer(item); } ;  
        //         document.getElementById('ul-id').appendChild(song);
        //         document.getElementById("Song_" + index).appendChild(button);
        //         UpdateSongInfo(item, button.id); 
        //       });
        //      }
        //   }
        // }
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

      const setSongButtons = (album, artist) => {  

        document.getElementById('songs-container').style.display = 'inline-block';
        document.getElementById('mp3-player').style.display = 'inline-block';
        console.log("This is the message we want #{artist}");
        var keys = album_song[album];
        keys.forEach(function callback(item, index) {
          var song = document.createElement("LI");
          var button = document.createElement("BUTTON");
          button.innerHTML = "Song " + index; 
          song.id = "Song_" + index;
          button.id = "Song_button_" + index;
          button.className = "song_btn";
          button.onclick = function(){ 
            setAudioPlayer(item); 
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://4thvnai6w2.execute-api.us-east-1.amazonaws.com/dev/play", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('authorization', 'authorization');
            xhr.send(JSON.stringify({
                artist: artist,
                album: album,
                song: "Song " + index
            }));
          } ;     
          document.getElementById('songs-ul-id').appendChild(song);
          document.getElementById("Song_" + index).appendChild(button);
          UpdateSongInfo(item, button.id);
        });
      }

      const setAlbumButtons = (artist) => {
        document.getElementById('artists-container').style.display = 'none';  
        document.getElementById('container2-id').style.display = 'inline-block';
    
          var keys = artist_album[artist];
          keys.forEach(function callback(item, index) {
            var album = document.createElement("LI");
            var button = document.createElement("BUTTON");
            button.innerHTML = "Album " + index; 
            album.id = "Album_" + index;
            button.id = "Album_button_" + index;
            button.className = "album_btn";
            button.onclick = function(){ setSongButtons(item, artist); } ;   
            document.getElementById('albums-ul-id').appendChild(album);
            document.getElementById("Album_" + index).appendChild(button);
        });
      }

      const setArtistButtons = () => {
        document.getElementById('mp3-player').style.display = 'none';
        
        var keys = Object.keys(artist_album);
        keys.forEach(function callback(item, index) {
          var artist = document.createElement("LI");
          var button = document.createElement("BUTTON");
          button.innerHTML = "Artist " + index; 
          artist.id = "Artist_" + index;
          button.id = "Artist_button_" + index;
          button.className = "artist_btn";
          button.onclick = function(){ setAlbumButtons(item); } ;   
          document.getElementById('artists-ul-id').appendChild(artist);
          document.getElementById("Artist_" + index).appendChild(button);
      });
    }

      const BuildDirLists = (link) => {
        var path = link.split('/');
        var song = link;
        // console.log(ParseUrl(path[4]));
        var album = PathFromUrl(path[4]);
        var artist = PathFromUrl(path[3]);
    
        if (artist in artist_album){
          artist_album[artist].push(album);
          
        }else {
          artist_album[artist] = [];
          artist_album[artist].push(album);
        }
        
        if (album in album_song){
          album_song[album].push(song);
          
        } else{
          album_song[album] = [];
          album_song[album].push(song);
        } 
        
      }

      // function sendRequest (artist, album, song) {
      //   var myHeaders = new Headers();
      //   myHeaders.append("Content-Type", "application/json");
      
      //   var raw = JSON.stringify({"artist":artist,"album":album,"song":song});
      
      //   var requestOptions = {
      //     method: 'POST',
      //     headers: myHeaders,
      //     body: raw,
      //     mode: "no-cors"
      //   };
      //   fetch("https://que4qks7g5.execute-api.us-east-1.amazonaws.com/dev/play", requestOptions)
      //     .then(response => response.text())
      //     .then(result => console.log(result))
      //     .catch(error => console.log('error', error));
      // }

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
            {/* Songs Container */}
            <div id= "songs-container">
              <ul id="songs-ul-id"></ul>
              <ReactAudioPlayer id="mp3-player"
              autoPlay
              controls
              />
            </div>

            {/* Artists Container */}
            <div id= "artists-container">
              <ul id="artists-ul-id"></ul>
            </div>
        </div>

        <div className="container2" id="container2-id">
            <div id= "albums-container">
              <ul id="albums-ul-id"></ul>
            </div>
        </div>
        </div>
    );
};

export default Artists;