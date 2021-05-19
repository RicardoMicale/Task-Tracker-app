<template>
  <div class="vista-tareas">
    <h3>Gestion de tareas</h3>
    <div class="acciones">
      <button @click="abrirForm()" class="btn">Agregar Tarea</button>
      <h5 class="label">Lista de tareas</h5>
    </div>
    <div class="informacion">
      <div class="cta">
        <button @click="abrirForm()" class="btn btn-tlf">Agregar Tarea</button>
      </div>
      <div class="contenedor-agregar">
        <div class="agregar" v-if="agregar">
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
      </div>
      <div class="cta">
        <h5 class="label label-tlf">Lista de tareas</h5>
      </div>
      <div class="tareas">
        <div class="contenedor-tareas" v-for="(tarea, index) in cUser" :key="tarea.id">
          <Tarea :tarea="tarea" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';
import Tarea from '../components/Tarea';

export default {
    name: 'Tareas',
    components: {
      Tarea
    },
    data() {
      return {
        fecha: '',
        descrip: '',
        cUser: [],
        agregar: true
      }
    },
    methods: {
      cargarTareas(user) {

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

        this.fecha = '';
        this.descrip = '';

      },
      constructorTareas(fecha, descrip) {
        let id; 

        if(this.cUser.length > 0) {
          const lastId = this.cUser[this.cUser.length - 1]
          id = lastId.id + 1;
        } else {
          id = 0;
        }
        
        const tarea = {
          fecha: fecha,
          descripcion: descrip,
          completada: false,
          id: id
        }

        return tarea
      },
      abrirForm() {
        this.agregar = !this.agregar;
      }
    },
    created() {
      
      firebase.auth().onAuthStateChanged(user => {
        if(!user) {
          this.$router.push('/');
          alert('No has iniciado sesion, por favor ingresa a tu cuenta para poder agregar tareas');
        } else {
          this.cargarTareas(user)
        }
      });

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

.cta {
  display: none;
}

.vista-tareas {
  padding: 0 7vw 5vh;

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

@media screen and (max-width: 1024px) {
  .acciones, .informacion {
    display: flex;
    flex-direction: column;
  }

}

.btn {
  border-radius: 50000px;
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
  background-color: $primary;
  padding: .6rem 1rem;
}

.label {
  color: $font-second;
  font-size: 1.3rem;
}

.acciones {
  margin-bottom: 2rem;
  
}

.informacion {
  align-items: flex-start;
  width: 100%;
}

.tareas {
  width: 50%;
}

.contenedor-tareas {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.contenedor-agregar {
  width: 50%;
}

@media screen and (max-width: 1024px) {
  .contenedor-agregar, .tareas {
    width: 100%;
  }
}

.agregar {
  width: 100%;
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

@media screen and (max-width:1024px) {
  .cta {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 3rem 0 1rem;

    &:first-child {
      margin-top: 0;
    }
  }

  .acciones {
    display: none;
  }
}

</style>