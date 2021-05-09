<template>
  <div class="vista-tareas">
    <h3>Gestion de tareas</h3>
    <div class="acciones">
      <h5>Lista de tareas</h5>
      <button>Agregar Tarea</button>
    </div>
    <div class="informacion">
      <div class="tareas">
        <div class="tarea listo">
          <div class="info">
            <h5>Descripcion</h5>
            <p>Fecha - hora</p>
          </div>
          <div class="actions">
            <i class="fas fa-thumbs-down"></i>
            <i class="fas fa-thumbs-up"></i>
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="tarea">
          <div class="info">
            <h5>Descripcion</h5>
            <p>Fecha - hora</p>
          </div>
          <div class="actions">
            <i class="fas fa-thumbs-down"></i>
            <i class="fas fa-thumbs-up"></i>
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <div class="agregar">
        <form @submit.prevent="agregarTarea()">
          <label for="descrip">Descripcion de la tarea</label>
          <input type="text">
          <label for="date">Fecha y/o hora de la tarea</label>
          <input type="text">
          <input type="submit" value="Guardar">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase';
// import * as fb from '../firebase';

export default {
    name: 'Tareas',
    methods: {
      cargarTareas() {

      },
      agregarTarea() {

      }
    },
    mounted() {

    }
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

.vista-tareas {
  padding: 0 7vw;
}

.acciones, .informacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.informacion {
  align-items: flex-start;
}

.tareas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;

  .tarea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 4rem;
    margin: .6rem 0;
    background-color: white;
    border-radius: 5px;
    padding: 0 2rem;
    box-shadow: -4px 4px 4px rgba(18, 25, 84, 0.25);

    h5, p {
      color: $primary;
    }

    h5 {
      font-size: 1rem;
    }

    p {
      font-size: .8rem;
    }
  }
}

.listo {
  border-left: solid 10px $add;
}

.agregar {
  width: 50%;
  height: 15rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: -4px 4px 4px rgba(18, 25, 84, 0.25);

  form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }

  input {
    outline: none;
    border: none;
  }

  input[type="text"] {
    width: 80%;
    height: 2rem;
    border-bottom: solid 3px $primary;
  }

  input[type="submit"] {
    width: 8rem;
    height: 2rem;
    border-radius: 50000px;
    background-color: $add;
    color: white;
  }

}

</style>