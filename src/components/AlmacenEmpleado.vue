<template>
<div>
    <!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<h1> ALMACEN</h1>
<div  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  
  

<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <a class="navbar-brand" href="/HomePageEmpleado">VENTA</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
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
      <router-link to="/HomePageEmpleado">REGRESAR
      </router-link>
      </li>
    </ul>
  </div>  
  <form  class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
    
  </nav>
</div>
  <product-table :products="getAllProducts"/>
</div>

</template>
<script>
import { mapGetters } from 'vuex';
import ProductTable from './ProductTable.vue';
export default{
  components: { 
    ProductTable
  },
  methods:{
    debug(){
      console.log(this.getProductsInCart);
    },
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
  },
  computed:{
    ...mapGetters([
      'getProductsInCart',
      'getAllProducts',
    ])
  }
}
</script>

<style scoped>
  .listOfProducts {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
  }

</style>