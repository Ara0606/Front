<template>
<div >

    <!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<h1> Bienvenido Empleado</h1>
<div >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/sellingCart">VENTA
          <span class="btn-circle" v-if="hasProduct()">
           ({{ getProductsInCart.length }})
          </span>
      </router-link>
      </li>
    </ul>
    
  </div>
  

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <router-link to="/CrearProducto">CREAR PRODUCTO
      </router-link>
      </li>
    </ul>
    
  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <router-link to="/Almacen">ALMACEN
      </router-link>
      </li>
      
    </ul>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
     <ul class="navbar-nav mr-auto">
       <li class="nav-item active">
        <a class="nav-link" @click="salir()">SALIR<span class="sr-only">(current)</span></a>
        
      </li>
    </ul>
    </div>
  
    
</nav>
</div>
<list-of-products-adm :products="getAllProducts"/>
</div>

</template>


<script>
import { mapGetters } from 'vuex';
import ListOfProductsAdm from './ListOfProductsAdm.vue';
export default{
  components: { 
    ListOfProductsAdm
  },
  computed:{
    ...mapGetters([
      'getProductsInCart',
      'getAllProducts',
    ])
  },
  methods:{
    debug(){
      console.log(this.getProductsInCart);
    },
    hasProduct(){
      return this.getProductsInCart.length > 0;
    },
    salir(){
      var opcion = confirm("Desea salir?")
      if (opcion == true) {
        window.localStorage.clear();
        this.$router.push({path: '/'});
      }
   }
  }
}
</script>




<style>
table,th,td{

  border: 1px solid black;
  border-end-end-radius: 20px !important;
}
tr, th{

  border: 2px solid black;
}
.x{
  border: 2px solid black !important;
}
.xx{
  border: 2px solid black !important;
}
.th1{
  border: 2px solid black !important;
}

</style>
