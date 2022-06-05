<template>
<!-- CSS only -->
<div >
  <h1> Bienvenido </h1>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<div  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Productos</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <router-link to="/productCart">Carrito 
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
        <a class="nav-link" @click="salir()">SALIR<span class="sr-only">(current)</span></a>
        
      </li>
    </ul>
    </div>
 </nav>
</div>

<list-of-products :products="getAllProducts"/>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListOfProducts from './ListOfProducts.vue';
export default{
  components: { 
    ListOfProducts 
  },
  methods:{
    debug(){
      console.log(this.getProductsInCart);
    },
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
    salir(){
      var opcion = confirm("Desea salir?")
      if (opcion == true) {
        window.localStorage.clear();
        this.$router.push({path: '/'});
      }
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
