<template>
  <div>
    <navbar-registered v-if="state.isAuthetnicated"></navbar-registered>
    <navbar-anonymous v-else></navbar-anonymous>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarRegistered from "./NavbarRegistered.vue";
import NavbarAnonymous from "./NavbarAnonymous.vue";
import { store } from "./main.js";

export default {
  name: "app",
  data() {
    return {
      state: store.state
    };
  },
  components: {
    NavbarAnonymous,
    NavbarRegistered
  }
};
</script>