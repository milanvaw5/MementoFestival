{
    const $btnLogin = document.querySelector(`.btnLogin`);
    const $email = document.querySelector(`.email`);
    const $password = document.querySelector(`.password`);
    const $loginForm = document.querySelector(`.loginForm`);
    const $btnLogout = document.querySelector(`.btnLogout`);
    const $sectionAdminActive = document.querySelector(`.section-admin--active`);
    const $sectionAdmin = document.querySelector(`.section-admin`);
    let firebaseInstance;
    let authInstance;

    const authStateChange = user => {
        if(user){
            console.log(`De user is ingelogd: ${user.email}`);
            $sectionAdminActive.style.display = "grid";
            $sectionAdmin.style.display = "none";
            $sectionAdminActive.scrollIntoView();
            $loginForm.style.display = "none";
            $btnLogout.style.display = "block";
            const script = document.createElement('script')
            script.src = "js/script.js";
            script.type = "module";
            document.head.appendChild(script);
        }else{
            console.log(`De user is uitgelogd`);
            location.reload();
        }
    }


    const handleSubmitLogout = async e => {
        e.preventDefault();
        try {
            const result = await authInstance.signOut();
            const user = authInstance.currentUser;
            console.log(user)
            authInstance.onAuthStateChanged(user => authStateChange(user));
            return result;
          } catch (error) {
            return error.code;
          }
    }
    const handleSubmitLogin = async e => {
        e.preventDefault();
        const email = $email.value;
        const password = $password.value;

        try {
            const result = await authInstance.signInWithEmailAndPassword(
              email,
              password
            );
                const user = authInstance.currentUser;
                authInstance.onAuthStateChanged(user => authStateChange(user));

            return result;

          } catch (error) {
            return error.code;
          }
    }


    const init = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBC-_6woEvb4vsn0SPL9f4iBcHAyC2athA",
            authDomain: "deletterdoos-91e5f.firebaseapp.com",
            projectId: "deletterdoos-91e5f",
            storageBucket: "deletterdoos-91e5f.appspot.com",
            messagingSenderId: "727484848226",
            appId: "1:727484848226:web:ff0cfadccbd23d01dd193b"
          };
          // Initialize Firebase
          firebaseInstance = firebase.initializeApp(firebaseConfig);
          // Initialize Firebase authentication
          authInstance = firebase.auth();

        $btnLogin.addEventListener(`click`, handleSubmitLogin);
        $btnLogout.addEventListener(`click`, handleSubmitLogout);
    }
    init();
}
