particlesJS({
  particles: {
    number: {
      value: 600,
      density: {
        enable: true,
        value_area: 789.1476416322727,
      },
    },
    color: {
      value: "#fffafa",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 10,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 0.5,
        },
      },
      bubble: {
        distance: 400,
        size: 4,
        duration: 0.3,
        opacity: 1,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});



// Your web app's Firebase configuration--Aparece desde un comienzo como script en html pero es javasc asi que lo puedo colocar aca
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDxg28eHfwmCxq0tizzjSX3ZfeGKGdr8Dc",
  authDomain: "nysl-149fa.firebaseapp.com",
  databaseURL: "https://nysl-149fa.firebaseio.com",
  projectId: "nysl-149fa",
  storageBucket: "nysl-149fa.appspot.com",
  messagingSenderId: "334545904392",
  appId: "1:334545904392:web:34103147e2295ca55702bd",
  measurementId: "G-RS88S90L22",
}; // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var app = new Vue({
  el: "#app",
  data: {
    email: "",
    password: "",
    mensaje: "",
    mensajes: [],
    juego: "",
    user: null,
  },
  methods: {
    registrar: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(app.email, app.password) //estamos diciendo que vamos a crear un usario tomando los datos de la variable de la linea 20,21
        .then(function () {
          //Al registrarnos tambien inciamos secion.
          alert("Well done!! Wellcome to NYSL");
        })
        .catch(function (error) {
          //DE DONDE TOMA EL ERROR??
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message + "123"; ///COMO HACER PARA QUE NO SE REPITA EL MENSAJE CUANDO TRATO DE REGISTRAR UN USUARIO YA REGISTRADO??
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          alert(error);
        });
    },
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(app.email, app.password)
        .then(function () {
          alert("Thanks!! You are in");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          alert(error + "<<<If you are not reggistered, please do it>>>");
        });
    },
    Exit: function () {
      firebase.auth().signOut();
    },
    GoogleIn: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    SendIt: function () {
      firebase.database().ref("mensajes").push({
        juego: app.juego,
        Name: app.user.displayName,
        Image: app.user.photoURL,
        texto: app.mensaje,
      }); //TENER EN CUENTA---PUEDO EJECUTAR ACCIONES con las referencias---https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0
      app.mensaje = ""; //cuando hago .push envio un objeto con las propiedades q quiero
    },
    chat(juego) {
      app.juego = juego;
      app.mensajes = [];
      firebase.database().ref("mensajes").orderByChild("juego").equalTo(app.juego).off();
      firebase.database().ref("mensajes").orderByChild("juego").equalTo(app.juego).on("child_added", function (childSnapshot, prevChildKey) {
          app.mensajes.push(childSnapshot.val());
        });
    },
  },
});
//Se coloca fuera porque quiero que la ejecute todo el tiempo
firebase.auth().onAuthStateChanged(function (user) {
  // user tiene otros metodos q puedo usar puedo usar el telefono, foto,  https://firebase.google.com/docs/reference/js/firebase.User?authuser=0
  app.user = user;
});

// JQUERY

$(document).ready(function () {
    $("body").show(function () {
        $(".Portrade").show();
        $(".btn1").hide();
        $(".btn1").fadeIn(2000);
        $("#HoMe").hide();
        $("#AbOuT").hide();
        $("#FeedBaCk").hide();
        $("#GaMeInFo").hide();
        $("#ContFoRum").hide();
    });
    $(".btn1").click(function () {
        $("#HoMe").fadeIn(1000);
        $("#HoMe").show();
        $("#AbOuT").hide();
        $("#FeedBaCk").hide();
        $("#GaMeInFo").hide();
        $("#ContFoRum").hide();
        $(".Portrade").hide();
    });
    $(".btn2").click(function () {
        $("#AbOuT").fadeIn(1000);
        $("#HoMe").hide();
        $("#AbOuT").show();
        $("#FeedBaCk").hide();
        $("#GaMeInFo").hide();
        $("#ContFoRum").hide();
        $(".Portrade").hide();
    });
    $(".btn3").click(function () {
        $("#FeedBaCk").fadeIn(1000);
        $("#HoMe").hide();
        $("#AbOuT").hide();
        $("#FeedBaCk").show();
        $("#GaMeInFo").hide();
        $("#ContFoRum").hide();
        $(".Portrade").hide();
    });
    $(".btn4").click(function () {
        $("#GaMeInFo").fadeIn(1000);
        $("#HoMe").hide();
        $("#AbOuT").hide();
        $("#FeedBaCk").hide();
        $("#GaMeInFo").show();
        $("#ContFoRum").hide();
        $(".Portrade").hide();
    });
    $(".foro").click(function () {
            $("#ContFoRum").fadeIn(1000);
            $("#HoMe").hide();
            $("#AbOuT").hide();
            $("#FeedBaCk").hide();
            $("#GaMeInFo").hide();
            $("#ContFoRum").show();
            $(".Portrade").hide();
            console.log("holahola");
        });
    $(".btn5").click(function () {
        $("#ContFoRum").fadeIn(1000);
        $("#HoMe").hide();
        $("#AbOuT").hide();
        $("#FeedBaCk").hide();
        $("#GaMeInFo").hide();
        $("#ContFoRum").show();
        $(".Portrade").hide();
    });
});
