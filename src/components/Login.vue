<template>
  <div class="modal-bg">
      <div class="modal">
          <i class="fas fa-times close"></i>
          <button class="log-btn" @click="loginGoogle()"><img src="../assets/Google.svg" alt="Google Logo">Iniciar sesion con google</button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';

export default {
    name: 'Login',
    methods: {
        async loginGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();

            await firebase.auth().signInWithPopup(provider)
                .then(response => {
                    localStorage.setItem('user', response.user);

                    let userExists = false;
                    const id = response.user.uid;

                    fb.getUser(id)
                        .then(response => {
                            if(response.exists) {
                                return userExists = true;
                            }
                        })
                        .catch(err => console.log(err));

                    if(userExists) {
                        const usuario = {
                            tareas: [],
                            nombre: response.user.displayName
                        }
                        fb.createUser(id, usuario);
                    }

                    this.$router.push('/tareas');
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('user');
                });
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

.modal-bg {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(31, 31, 31, 0.5);
}

.modal {
    background-color: $bg;
    width: 30%;
    height: 30%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .close {
        position: absolute;
        color: $delete;
        top: 10%;
        right: 10%;
        cursor: pointer;
    }
}

.log-btn {
    width: 70%;
    height: 30%;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 50000px;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, $primary, $accent);
    color: $bg;

    img {
        width: 2rem;
    }
}

@media screen and (max-width: 1024px) {
    .modal {
        width: 90%;
    }

    .log-btn {
        width: 85%;
        font-size: 1rem;
    }
}
</style>