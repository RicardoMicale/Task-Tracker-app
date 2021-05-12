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
      <div class="tareas">
        <div class="tarea" :class="tarea.completada ? 'listo' : ''"  v-for="tarea in cUser" :key="tarea.id">
          <div class="info">
            <h5>{{ tarea.descripcion }}</h5>
            <p>{{ tarea.fecha }}</p>
          </div>
          <div class="actions">
            <i class="fas fa-thumbs-down" v-if="tarea.completada"></i>
            <i class="fas fa-thumbs-up" v-else></i>
            <i class="fas fa-times" @click="eliminarTarea(tarea.id)"></i>
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
          this.$router.push('/');
          return
        }

        fb.getUser(user.uid).then(response => {
          this.cUser = response.data().tareas;
        }).catch(err => {console.log(err)});

      },
      async agregarTarea() {
        const tarea = this.constructorTareas(this.fecha, this.descrip);

        const user = firebase.auth().currentUser;
        let usuarioActual;

        await fb.getUser(user.uid).then(response => {
          usuarioActual = response.data();

          usuarioActual.tareas.push(tarea);
        }).catch(err => {console.log(err)});

        fb.updateUser(user.uid, usuarioActual);


      },
      constructorTareas(fecha, descrip) {
        let id = this.cUser.length;
        
        const tarea = {
          fecha: fecha,
          descripcion: descrip,
          completada: false,
          id: id
        }

        return tarea
      },
      eliminarTarea(id) {

        const user = firebase.auth().currentUser;
        let usuario;

        fb.getUser(user.uid).then(response => {

          const tareasUser = response.data().tareas;
          usuario = response.data()

          tareasUser.splice(id, 1);

          usuario.tareas = tareasUser;
        })

        console.log(usuario);

        fb.updateUser(user.uid, usuario);

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
  width: 100%;
}

.tareas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
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