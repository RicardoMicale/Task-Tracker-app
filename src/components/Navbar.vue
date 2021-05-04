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
            </ul>
        </nav>
    </header>
</template>

<script>
export default {

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
    justify-content: space-evenly;
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
}


@media screen and (max-width: 1024px) {
    header {
        flex-direction: column;
        height: 18vh;
    }

    ul {
        width: 70vw;
    }
}

</style>