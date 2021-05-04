<template>
  <div class="titulo">
    <h1>Mantente al dia con tus tareas</h1>
    <p>Marcalas como realizadas o eliminalas de la lista</p>
    <router-link class="start" to="/tareas">Comenzar a agregar</router-link>
  </div>
</template>

<script>
export default {
    name: 'Inicio'
}
</script>

<style scoped lang="scss">

//Variables de color
$bg: #E2E2E2;
$primary: #121954;
$accent: #0010A5;
$add: #05A415;
$delete: #AD0000;
$font-second: #424458;

.titulo {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 70vh;
  justify-content: center;
  align-items: center;
}

h1 {
  color: $primary;
  font-size: 3.5rem;
}

p {
  color: $font-second;
  font-size: 1.5rem;
  margin-bottom: 3rem;
}

.start {
  color: $bg;
  background-image: linear-gradient(to right, $primary, $accent);
  text-decoration: none;
  border-radius: 50000px;
  padding: .5rem 1.5rem;
  font-weight: bold;
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 2rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.4rem;
  }

  h1, p {
    text-align: center;
  }

}

</style>