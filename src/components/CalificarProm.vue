<template>
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <div  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/HomePageCliente">Productos</a>
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
        <h1>Calificación promedio</h1>
    
   <div  class='listOfProducts' style="width: 1000px;
    max-width: 2000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2;" >
   
   
    <li v-for="(product, index) in getAllProducts" :key="index"
        class="card" style="width: 18rem;"  id="ProductsList">
        <!-- image for product -->
        <img class="card-img-top" :src="product.image" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"  style="color: #39918C;"> {{product.name}}</h5>
            <h5 class="card-title" style="color: #AB6B51;">{{product.empresa}}</h5>
            <h5 class="card-title" style="color: #D0B49F;">{{product.date}}</h5>
            <h6 class="card-title">{{product.price}} Bs.</h6>
            <h3 class="card-title">{{product.cant}} unidades</h3>
            <p class="card-text" style="color: #2F435A;">{{product.details}}</p>
            
            <br>

            <h3 v-if='product.cali > 0'>
              Calificacion promedio: {{  product.cali }} estrellas
            </h3>
            
            <h3 v-else>
              El producto todavia no tiene calificaciones
            </h3>
        </div>
        
    </li>
    

</div>     


   
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default{
  props: ['almacenId'],
  data(){
    return{
      almacen_id: this.almacenId,
     
    }
  },
  
  created(){
    this.getData();
     
  },

  methods:{
    ...mapActions([
      'addProduct',
      'currentProduct',
      'setProducts'
    ]),
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
   getData(){
     
      axios({
       method: 'get',
       url: `http://localhost:8090/calificacion/get?idProducto=${this.almacen_id}`
     }).then(res =>{
       let calificacion = 0;
       console.log("asdasdasdasdasd " + res.data.estrellas)
       calificacion =  res.data.estrellas;
    
     axios({
       method: 'get',
       url: `http://localhost:8090/product/alone?idAlmacen=${this.almacen_id}`
     }).then(res =>{
       let aux = [];
       
      
       console.log("cali: "+ calificacion)
       for (let i = 0; i < res.data.length; i++){
         let element = {
           id: res.data[i].id_Almacen,
           image: 'https://previews.123rf.com/images/mything/mything1711/mything171100054/90152603-.jpg',
           name: res.data[i].product_name,
           price: res.data[i].product_price,
           details: res.data[i].product_description,
           cant: res.data[i].product_cant,
           date: res.data[i].product_date,
           empresa: res.data[i].product_empresa,
           cali: calificacion
           };
           aux.push(element);    
       }
      this.setProducts(aux);
     })
      });
   this.getCalificacion();
   },
   getCalificacion(){
     
     //var id = parseInt(this.almacen_id)
     axios({
       method: 'get',
       url: `http://localhost:8090/calificacion/get?idProducto=${this.almacen_id}`
     }).then(res =>{
       console.log("asdasdasdasdasd " + res.data.estrellas)
       return res.data.estrellas;
     })
      
     
   }
   
  },
  
  computed:{
    ...mapGetters([
      'getProductsInCart',
      'getAllProducts',
       
    ])
  }
}
</script>