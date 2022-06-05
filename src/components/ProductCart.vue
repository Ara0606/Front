<template>
<div>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div>
   <div  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"> <router-link to="/HomePageCliente">Productos
      </router-link></a>
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
  <form  class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
</nav>
</div>
    <div v-if="!hasProduct()">
        <h3> No products...</h3>
        <router-link to="/HomePageCliente">Volver a la lista de productos</router-link>
    </div>

    <div  v-else>
      <button style="margin:10px;" @click="aprobar()" type="button" class="btn btn-outline-success">Confirmar</button> <!-- Va la parte de factura -->
      <button style="margin:10px;" type="button" class="btn btn-outline-warning"><router-link to="/HomePageCliente">Editar 
      </router-link></button>
      <button style="margin:10px;" @click="vaciar()"  type="button" class="btn btn-outline-danger">Cancelar compra</button>
      
      <div class="card">
      <label >Agregar/Disminuir</label>
      
      <button type="button" class="btn btn-success" @click="estado = !estado" >
        <p v-if="estado" >Unitario </p>
        <p v-else>Por Teclado</p>
        </button>
      </div>

    <div  style="width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
    align:center;
    "
    >

    <div class="card" v-for="(product, index) in getProductsInCart" :key="index" style="width: 25rem;  ">
    <img :src="product.image">
      <div class="card-body">
       <h5 class="card-title">{{ product.id }}</h5>
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.details }}</p>
      <p class="card-text">{{ product.price }} $</p>
      <button type="button" class="btn btn-info"  @click="calificar(product.id,product.name)">Calificar Producto</button>
      <h3>Unidades:</h3>
      
    
      <div  v-if="estado">
         <input type="number" v-model="product.cantidad" min="1" max="9000" step="1" readonly>
          <button class="btn btn-primary" @click="increaseCant(product)"> + </button>
            <button class="btn btn-primary" @click="decreaseCant(product)"> - </button>
      </div>
      <div v-else> 
        <input type="number" v-model="product.cantidad" >
        <button class="btn btn-primary" @click="tecladocant(product)"> ACEPTAR </button>
      </div>
      <p> Precio total: {{product.cantidad * product.price}} $</p>
      <button   style="margin: 20px;" class="btn btn-danger" @click="remove(index)">X</button>
    </div>
</div>
    </div>   
    </div> 
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data(){
    return{
      estado: false
    }
    
  },
  computed: {
    ...mapGetters([
      'getProductsInCart',
    ]),
    
  },

  methods: {
    ...mapActions([
      'removeProduct',
    ]),
   
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
    calificar(id,name){
      console.log(id);
        console.log("legamos antes de actualizar");
        this.$router.push({path: `/CalificarProducto/${id}/${name}`})

      },
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0);
    },
    remove(index) {
      this.removeProduct(index);
    },
    vaciar(){
      var mensaje;
      var opcion = confirm("Desea cancelar la compra?");
      if (opcion == true) {
        this.getProductsInCart.length=0;
        
        for (let i=0;i<this.getProductsInCart.length; i++){
          this.removeProduct(i);
        }
        alert("SE ELIMINO LA VENTA ")
        this.$router.push({path: "/HomePageCliente"})
        }
        else{
          mensaje = "Realizaste la compra";}
          document.getElementById("ejemplo").innerHTML = mensaje;
     /* if (confirm('Desea cancelar la compra?')) {
        this.getProductsInCart.length=0;
        console.log('Borrado');
    } else {
    console.log('sin cancelar');
    }*/
      
    },
     tecladocant(product){
       if (product.cantidad <= 0){
         alert("CANTIDAD INVALIDA ")
         product.cantidad  = 1;
       }
       else if(product.cantidad > product.cant){
          alert("NO EXISTE EL STOCK DISPONIBLE PARA SU COMPRA, SOLO HAY " + product.cant + " UNIDADES");
          product.cantidad  = 1;
       }
       else { 
          alert("SE AGREGARON " + product.cantidad + " UNIDADES AL CARRITO");
          product.subtotal = product.cantidad * product.price;
       }
    },
    increaseCant(product){
      if (product.cantidad >= product.cant){
        alert("NO EXISTE EL STOCK DISPONIBLE PARA SU COMPRA, SOLO HAY " + product.cant + " UNIDADES ")
      }
      else{
      product.cantidad++;
      product.subtotal = product.cantidad * product.price;
      }
    },
    decreaseCant(product){
      if(product.cantidad == 1) alert("NO SE PUEDE REDUCIR LA CANTIDAD A 0");
      else {
      product.cantidad--;
      product.subtotal = product.cantidad * product.price;
      }
    },
    aprobar(){
      var mensaje;
      var opcion = confirm("Desea realizar la compra?");
      if (opcion == true) {
        mensaje = "Realizo la compra";
        this.$router.push({path: "/CrearFacturaCliente"})}
        else{
          mensaje = "Borraste la compra";}
          document.getElementById("ejemplo").innerHTML = mensaje;
     /* if (confirm('Desea cancelar la compra?')) {
        this.getProductsInCart.length=0;
        console.log('Borrado');
    } else {
    console.log('sin cancelar');
    }*/
      
    
    },
    
 cambiar(){
    console.log("estamos aqui")
    if(this.estado == 1){
      console.log(this.estado)
     return this.estado = 0;
    }
    else{
      console.log(this.estado)
      return this.estado = 1;
    }
  }
  },
 
  

};

</script>
