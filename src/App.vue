<template>
  <div id="app">
    <navbar-anonymous></navbar-anonymous>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarAnonymous from "./NavbarAnonymous.vue";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    NavbarAnonymous
  }
};
</script>