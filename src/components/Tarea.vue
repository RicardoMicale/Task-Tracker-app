<template>
    <div class="tarea" :class="tarea.completada ? 'listo' : ''" @dblclick="completado()">
        <div class="info">
            <h5>{{ tarea.descripcion }}</h5>
            <p>{{ tarea.fecha }}</p>
        </div>
        <div class="actions">
            <div v-if="tarea.completada" @click="completado()"><i class="fas fa-thumbs-down"></i></div>
            <div v-else @click="completado()"><i class="fas fa-thumbs-up"></i></div>
            <div @click="eliminarTarea(tarea.id)"><i class="fas fa-times"></i></div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';

export default {
    name: 'Tarea',
    props: {
        tarea: Object,
        index: Number
    },
    methods: {
        
      async eliminarTarea() {

        const user = firebase.auth().currentUser;
        let usuario;

        await fb.getUser(user.uid).then(response => {

          const tareasUser = response.data().tareas;
          usuario = response.data();

          tareasUser.splice(this.index, 1);

          usuario.tareas = tareasUser;
        }).catch(err => console.log(err));

        fb.updateUser(user.uid, usuario);
      },
      async completado() {
        const user = firebase.auth().currentUser;
        let usuario;

        await fb.getUser(user.uid).then(response => {
          
          let tareasUser = response.data().tareas;
          usuario = response.data();

          let tareaActual = tareasUser[this.index];
          tareaActual.completada = !tareaActual.completada;
          
          tareasUser[this.index] = tareaActual;

          usuario.tareas = tareasUser;
          
        }).catch(err => console.log(err));

        fb.updateUser(user.uid, usuario);
      }
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

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      
      .fa-thumbs-up, .fa-thumbs-down {
        color: $font-second;
        cursor: pointer;
      }

      .fa-times {
        color: $delete;
        cursor: pointer;
      }
    }
}

.listo {
  border-left: solid 6px $add;
}

@media screen and (max-width: 1024px) {
  .tarea {
    width: 100%;
  }
}

</style>