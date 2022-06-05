<template>
<div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div >
    <nav >
      <router-link to="/"></router-link>
      <router-link to="/about"></router-link>
      
      
    </nav>
  </div>
  
  <router-view/>
    


</div>
</template>
<!--
<script>
import crearProducto from './components/crearProducto.vue';
export default{
  components: { 
    crearProducto,
  },
}
</script>
-->

<style>
body{
  background-color: beige;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #315f8d;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #275f97;
}

nav a.router-link-exact-active {
  color: #50b6df;
}
</style>
