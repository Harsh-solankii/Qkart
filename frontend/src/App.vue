<template>
  <router-view/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(()=>{
  if(localStorage.getItem("id")!==null){
    store.commit("set_auth",true); 
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
