<template>
  <div>
    <img src="./assets/Logo TT.svg" alt="Logo Task Tracker">
    <Navbar />
  </div>
  <!-- <router-view></router-view> -->
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
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

</style>
