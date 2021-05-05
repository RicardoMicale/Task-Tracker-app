<template>
  <div>
    <Navbar />
    <Login class="login"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Login from './components/Login';

export default {
  name: 'App',
  components: {
    Navbar,
    Login
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

.login {
  position: absolute;
  top: 0;
  left: 0;
}

</style>
