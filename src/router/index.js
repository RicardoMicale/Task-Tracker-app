import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/Inicio.vue";
import Tareas from "../views/Tareas.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/tareas",
    name: "Tareas",
    component: Tareas
  },
];

const router = new VueRouter({
  routes,
});

export default router;
