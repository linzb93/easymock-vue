import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/login/Index.vue';
import Home from '../views/home/Index.vue';
import Project from '../views/project/Index.vue';
import CreateProj from '../views/project/Create.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/project/:project_id',
    name: 'Project',
    component: Project
  },
  {
    path: '/project/:project_id/create',
    name: 'CreateProj',
    component: CreateProj
  },
  {
    path: '/project/:project_id/update/:api_id',
    name: 'UpdateProj',
    component: CreateProj
  }
];

const router = new VueRouter({
  routes
});

export default router;
