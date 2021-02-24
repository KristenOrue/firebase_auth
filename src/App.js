import React, { useContext } from "react";
import { Router } from "@reach/router";
import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
import ProfilePage from "./Components/ProfilePage";
import { UserContext } from "./providers/UserProvider";
function App() {
  
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;

//ORIGINAL CODE with just Sign Up Button
// import logo from './logo.svg';
// import './App.css';
// import firebase from "firebase/app";
// import "firebase/auth";

// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyDfkrcgW2Llp5DU1XsJOxsz2f8dFdT2sTI",
// //   authDomain: "notes-auth-fdebd.firebaseapp.com",
// //   projectId: "notes-auth-fdebd",
// //   storageBucket: "notes-auth-fdebd.appspot.com",
// //   messagingSenderId: "85732809352",
// //   appId: "1:85732809352:web:f12d328ced272b050f1d3d",
// //   measurementId: "G-NJJ69766F1"
// // };

// // firebase.initializeApp(firebaseConfig);

// function App() {
//     console.log(firebase);
//     return (
//       <div className="App">
//       <header className="App-header">
//         <button 
//           onClick={async function() {
//             const user = await firebase
//               .auth()
//               .createUserWithEmailAndPassword("teworster@tester.com", "Test1234")
//             alert(JSON.stringify(user));
//           }}
//         >
//           sign up
//         </button>
//       </header>
//     </div>
//   );
// }

// export default App;
