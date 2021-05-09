<template>
    <header>
        <router-link class="logo" to="/">
            <img src="../assets/Logo TT.svg" alt="Logo Task Tracker">
        </router-link>
        <nav>
            <ul>
                <li>
                    <router-link class="link" to="/">Inicio</router-link>
                </li>
                <li>
                    <router-link class="link" to="/tareas">Tareas</router-link>
                </li>
                <li v-if="loggeado">
                    <button @click="$emit('open')" class="btn-login">Iniciar Sesion</button>
                </li>
                <li v-else>
                    <button class="btn-login" @click="logout()">Cerrar Sesion</button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Navbar',
    data() {
        return {
            loggeado: Boolean
        }
    },
    methods: {
        isUserSignedIn() {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    this.loggeado = false
                } else {
                    this.loggeado = true
                }
            })
        },
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push('/')
            });

            this.loggeado = false
        }
    },
    mounted() {
        this.isUserSignedIn();
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

//Fuente
$font: 'Poppins', Helvetica;

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 7vw;
}

img {
    width: 150px;
}

ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20vw;
    flex-wrap: wrap;
    flex: 1 1 50%;

    li {
        list-style-type: none;
    }

    .link {
        color: $primary;
        text-decoration: none;
        position: relative;

        &::before {
            content: '';
            width: 0;
            height: 2px;
            background-color: $font-second;
            position: absolute;
            top: 100%;
            left: 0;
            transition: all .3s ease;
        }

        &::after {
            content: '';
            width: 0;
            height: 2px;
            background-color: $font-second;
            position: absolute;
            top: 0;
            left: 0;
            transition: all .3s ease;
        }

        &:hover::before {
            width: 100%;
        }
    }

    li .router-link-exact-active {
        &::after, &::before {
            width: 100%;
        }
    }

    .btn-login {
        padding: .5rem 1rem;
        outline: none;
        border: none;
        border-radius: 500000px;
        color: $bg;
        background-image: linear-gradient(to right, $primary, $accent);
        cursor: pointer;
    }
}


@media screen and (max-width: 1024px) {
    header {
        flex-direction: column;
        height: 18vh;
    }

    ul {
        width: 80vw;
    }
}

</style>