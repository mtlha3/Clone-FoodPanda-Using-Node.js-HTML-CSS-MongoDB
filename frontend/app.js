import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyBypyEOo4yfmnm2a4SqvTk4fMfGW13OYMk",
    authDomain: "talhab10.firebaseapp.com",
    databaseURL: "https://talhab10-default-rtdb.firebaseio.com",
    projectId: "talhab10",
    storageBucket: "talhab10.appspot.com",
    messagingSenderId: "1068680426066",
    appId: "1:1068680426066:web:ffc661b6d7d5231f7f258b",
    measurementId: "G-E7CXC3297K"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

/*------------------------------------------SIGN-IN------------------------------------------*/

let getlbtn = document.querySelector('#lbtn')

if (getlbtn) {

    getlbtn.addEventListener('click', () => {

        let email = document.querySelector('#lemail').value
        let password = document.querySelector('#lpass').value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                alert('Successfully login!');
                window.location.href = 'menu.html';
            })
            .catch((error) => {
                alert('Invalid Credentials!')
            });

    })
}


/*------------------------------------------SIGN-UP------------------------------------------*/

let getBtn = document.querySelector('#btn')

if (getBtn) {



    getBtn.addEventListener('click', () => {
        let authUser = () => {
            let getEmail = document.querySelector('#email').value
            let getPassword = document.querySelector('#pass').value
            let getConfirmPassword = document.querySelector('#confirmPass').value

            if (getPassword !== getConfirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            createUserWithEmailAndPassword(auth, getEmail, getPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("Successfully signed up!");
                    window.location.href = 'signin.html'
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error)
                });
        }

        authUser();
    });

}


/*------------------------------------------Continue with google------------------------------------------*/

let getgbtn = document.querySelector('#gbtn')

if (getgbtn) {

    getgbtn.addEventListener('click', () => {


        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    })

}




/*------------------------------------------ADMIN CREDENTIALS------------------------------------------*/

var emailInput = document.getElementById('aemail');
var passInput = document.getElementById('apass');
var loginBtn = document.getElementById('abtn');

if(loginBtn){
    loginBtn.addEventListener('click', function() {

        var email = emailInput.value;
        var password = passInput.value;

        if (email === 'talha' && password === '123456') {

            window.location.href = 'admin_panel.html';
        } else {

            alert('Invalid username or password. Please try again.');
        }
    });
}



/*------------------------------------------ADMIN LOGOUT BUTTON------------------------------------------*/

document.getElementById("logoutBtn").addEventListener("click", function() {

    window.location.href = "start.html";
});




/*------------------------------------------ADMIN FOOD EDIT/DELETE------------------------------------------*/


