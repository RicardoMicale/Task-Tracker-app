<template>
  <div class="vista-tareas">
    <h3>Gestion de tareas</h3>
    <div class="acciones">
      <button>Agregar Tarea</button>
      <h5>Lista de tareas</h5>
    </div>
    <div class="informacion">
      
      <div class="agregar">
        <form @submit.prevent="agregarTarea()">
          <div>
            <label for="descrip">Descripcion de la tarea</label>
            <input type="text" v-model="descrip">
          </div>
          <div>
            <label for="date">Fecha y/o hora de la tarea</label>
            <input type="text" v-model="fecha">
          </div>
          <input type="submit" value="Guardar">
        </form>
      </div>
      <div class="tareas" v-for="tarea in cUser" :key="tarea.id">
        <div class="tarea listo">
          <div class="info">
            <h5>{{ tarea.descrip }}</h5>
            <p>{{ tarea.fecha }}</p>
          </div>
          <div class="actions">
            <i class="fas fa-thumbs-down" v-if="tarea.completada"></i>
            <i class="fas fa-thumbs-up" v-else></i>
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';

export default {
    name: 'Tareas',
    data() {
      return {
        fecha: '',
        descrip: '',
        cUser: []
      }
    },
    methods: {
      cargarTareas() {
        const user = firebase.auth().currentUser
        
        if(!user) {
          alert('No has iniciado sesion, por favor ingresa a tu cuenta para poder agregar tareas');
          return
        }

        fb.getUser(user.uid).then(response => {
          this.cUser = response.data().tareas;
        }).catch(err => {console.log(err)});

      },
      agregarTarea() {
        const tarea = this.constructorTareas(this.fecha, this.descrip);

        const user = firebase.auth().currentUser;
        let usuarioActual;

        fb.getUser(user.uid).then(response => {
          usuarioActual = response.data();
        }).catch(err => {console.log(err)});

        usuarioActual.tareas.push(tarea);

      },
      constructorTareas(fecha, descrip) {
        let id;

        const user = firebase.auth().currentUser.uid
        fb.getUser(user).then(response => {
          const usuario = response.data();
          id = usuario.tareas.length;
        })

        const tarea = {
          fecha: fecha,
          descripcion: descrip,
          completada: false,
          id: id + 1
        }

        return tarea
      }
    },
    mounted() {
      this.cargarTareas()
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

  h3 {
    font-size: 2rem;
    color: $primary;
    margin-bottom: 3rem;
  }
}

.acciones, .informacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.acciones {
  margin-bottom: 2rem;

  h5 {
    color: $font-second;
    font-size: 1.3rem;
  }

  button {
    border-radius: 50000px;
    outline: none;
    border: none;
    cursor: pointer;
    color: white;
    background-color: $primary;
    padding: .6rem 1rem;
  }
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

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      i {
        cursor: pointer;
      }
      
      .fa-thumbs-up, .fa-thumbs-down {
        color: $font-second;
      }

      .fa-times {
        color: $delete;
      }
    }
  }
}

.listo {
  border-left: solid 6px $add;
}

.agregar {
  width: 50%;
  height: 15rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: -4px 4px 4px rgba(18, 25, 84, 0.25);
  padding: 2rem 3rem;

  form {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;

    div {
      width: 100%;
    }
  }

  input {
    outline: none;
    border: none;
  }

  input[type="text"] {
    width: 100%;
    height: 2rem;
    border-bottom: solid 3px $primary !important;
    border-radius: 3px;

    &:focus {
      border: solid 1px $primary;
      padding: .3rem .5rem;
      color: $primary;
    }
  }

  input[type="submit"] {
    width: 8rem;
    height: 2rem;
    border-radius: 50000px;
    background-color: $add;
    color: white;
    cursor: pointer;
  }

  label {
    font-size: .825rem;
    color: rgba($color: #000000, $alpha: .6);
  }

}

</style>