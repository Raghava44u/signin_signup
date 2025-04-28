// SHOW/HIDE functions
function showSignup() {
  document.getElementById("signin-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showSignin() {
  document.getElementById("signin-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
}

// Firebase Configuration (yours)
const firebaseConfig = {
  apiKey: "",
  authDomain: "signinsignup-8e44b.firebaseapp.com",
  projectId: "signinsignup-8e44b",
  storageBucket: "signinsignup-8e44b.appspot.com",
  messagingSenderId: "503024675139",
  appId: "1:503024675139:web:f67f7dd2480c94c74627f6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// SIGNUP Function
function signupUser() {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const mobile = document.getElementById('mobile-number').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;

          // Store extra details in Firestore
          return db.collection('users').doc(user.uid).set({
              firstName: firstName,
              lastName: lastName,
              mobile: mobile,
              email: email
          });
      })
      .then(() => {
          alert('Signup Successful!');
          showSignin();
      })
      .catch((error) => {
          alert(error.message);
      });
}

// SIGNIN Function
function signinUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Login Successful!');
      window.location.href = 'paper.html';
    })
    .catch((error) => {
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      alert(`Login failed: ${error.message}`);
    });

}
//Forgot BUtton
// Show the Forgot Password modal
function showForgotPassword() {
  document.getElementById("signin-form").style.display = "none";
  document.getElementById("forgot-password-modal").style.display = "block";
}

// Hide the Forgot Password modal and go back to sign in
function hideForgotPassword() {
  document.getElementById("signin-form").style.display = "block";
  document.getElementById("forgot-password-modal").style.display = "none";
}

// Send password reset email
function resetPassword() {
  const email = document.getElementById('forgot-email').value;

  // Firebase Authentication to send password reset email
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Email sent successfully
      alert('Check your email to reset your password.');
      hideForgotPassword(); // Hide the modal after success
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert(`Error: ${errorMessage}`);
    });
}


