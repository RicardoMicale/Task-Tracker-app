<template>
  <div class="main">
    <Navbar @open="abrirLogin = true" />
    <Login @close="abrirLogin = false" v-if="abrirLogin" class="login"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Login from './components/Login';
import firebase from 'firebase';
import * as fb from './firebase';

export default {
  name: 'App',
  components: {
    Navbar,
    Login
  },
  data() {
    return {
      abrirLogin: false,
      usuario: {}
    }
  },
  created() {

    firebase.auth().onAuthStateChanged(async user => {
      if(user) {
        await fb.getUser(user.uid).then(response => {
          this.usuario = response.data();
        });

        this.abrirLogin = false;
      }
    })
  }
}
</script>

<style lang="scss">

//Fuente
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

//Variables de color
$bg: #E2E2E2;
$primary: #121954;
$accent: #0010A5;
$add: #05A415;
$delete: #AD0000;
$font-second: #424458;

//Fuente
$font: 'Poppins', Helvetica;

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: $font;
}

.main {
  background-color: $bg;
  height: 100%;
}

.login {
  position: absolute;
  top: 0;
  left: 0;
}

</style>
