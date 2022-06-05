<template>
<div class="container">
  <div class="buttons">
              
            <b-button type="is-primary" expanded @click="estado = !estado">
              <p v-if="estado">BUSCAR POR NOMBRE PRODUCTO</p>
              <p v-else>BUSCAR POR NOMBRE EMPRESA</p>
            </b-button>
        </div>
   <b-field label="BUSQUEDA" type="is-success">
            <b-input v-if="estado" placeholder="INGRESAR NOMBRE PRODUCTO" v-model="busqueda"></b-input>
            <b-input v-else placeholder="INGRESAR NOMBRE DE LA EMPRESA" v-model="busqueda"></b-input>
        </b-field>

 <b-button type="is-success is-light" @click="busquedaGeneral(busqueda)">BUSCAR </b-button>
 <b-button type="is-success is-light" v-if="carts != 0" @click="volver" >VOVLER </b-button>

<div class="container" v-if="carts == 0">
  
  
 
<div  class='listOfProducts' style="width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2;" >
   
   
    <li v-for="(product, index) in mostrar" :key="index"
        class="card" style="width: 18rem;"  id="ProductsList">
        <!-- image for product -->
        <img class="card-img-top" :src="product.image" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"  style="color: #FF0000;"> {{product.name}}</h5>
            <h6 class="card-title">{{product.price}} Bs.</h6>
            <h3 class="card-title">{{product.cant}} unidades</h3>
            <p class="card-text" style="color: #8E44AD;">{{product.details}}</p>
            
            <br>

            <button style="margin: 5% auto;" v-if="product.cant > 0" class="btn btn-primary"
                @click="addProductToCart(product)">
                Agregar
            </button>
            <button style="margin: 5% auto;" v-if="product.cant > 0" class="btn btn-primary"
                @click="calificaciones(product)"
            >
              Calificación Promedio
            </button>
            <h3 v-else>
              No hay existencias del producto
            </h3>
        </div>
        
    </li>
    

</div>

<div class="row">
<div class="btn-group col-md-2 offset-md-5 ">

<button
  
  class="btn btn-primary"
  v-if="page != 1"
  @click="page --"
>
Atrás
</button>
<button
 
  class="btn btn-primary"
  v-for="pageNumber in this.pages.slice(page -1, page + 2)"
  :key="pageNumber"
  @click="page = pageNumber"
>
  {{pageNumber}}
</button>

<button
  
  class="btn btn-primary"
 v-if="page < pages.length"
  @click="page ++"
>
Siguiente
</button>
</div>

</div>
</div>
<div v-else-if="carts ==1">
<div  class='listOfProducts' style="width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2;" >
   
   
    <li v-for="(product, index) in names" :key="index"
        class="card" style="width: 18rem;"  id="ProductsList">
        <!-- image for product -->
        <img class="card-img-top" :src="product.image" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"  style="color: #FF0000;"> {{product.name}}</h5>

            <h6 class="card-title">{{product.price}} Bs.</h6>
            <h3 class="card-title">{{product.cant}} unidades</h3>
            <h5 class="card-title">{{product.date}} vencimiento</h5>
            <h4 class="card-title">Empresa</h4>
            <h5 class="card-title">{{product.empresa}}</h5>
            
            <p class="card-text" style="color: #8E44AD;">{{product.details}}</p>
            
            <br>

            <button style="margin: 5% auto;" v-if="product.cant > 0" class="btn btn-primary"
                @click="addProductToCart(product)">
                Agregar
            </button>
            <button style="margin: 5% auto;" v-if="product.cant > 0" class="btn btn-primary"
                @click="calificaciones(product)"
            >
              Calificación Promedio
            </button>
            <h3 v-else>
              No hay existencias del producto
            </h3>
        </div>
        
    </li>
    

</div>


</div>
<div v-else-if="carts ==2">
<div  class='listOfProducts' style="width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2;" >
   
   
    <li v-for="(product, index) in empresas" :key="index"
        class="card" style="width: 18rem;"  id="ProductsList">
        <!-- image for product -->
        <img class="card-img-top" :src="product.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title"  style="color: #FF0000;"> {{product.name}}</h5>
           <h6 class="card-title">{{product.price}} Bs.</h6>
            <h3 class="card-title">{{product.cant}} unidades</h3>
            <h5 class="card-title">{{product.date}} vencimiento</h5>
            <h4 class="card-title">Empresa</h4>
            <h5 class="card-title">{{product.empresa}}</h5>
            
            <p class="card-text" style="color: #8E44AD;">{{product.details}}</p>
            
            <br>

            <button style="margin: 5% auto;" v-if="product.cant > 0" class="btn btn-primary"
                @click="addProductToCart(product)">
                Agregar
            </button>
            <button style="margin: 5% auto;" v-if="product.cant > 0" class="btn btn-primary"
                @click="calificaciones(product)"
            >
              Calificación Promedio
            </button>
            <h3 v-else>
              No hay existencias del producto
            </h3>
        </div>
        
    </li>
    

</div>
</div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  props: ['products'],
  data(){
    return {
      busqueda: "",
      page : 1,
      perPage: 100,
      pages: [],
      estado : true,
      carts: 0,
      names: [],
      empresas: []
    }
  },
 created () {
      this.setdata();
      },
  methods: {
    setdata(){
      // this.dispatch("fetchProducts");
        axios({
          method: 'get',
          url: 'http://localhost:8090/product/data'
        }).then(res => {
          console.log(res)
          let aux = [];
          for(let i = 0; i < res.data.length; i++){
            console.log(res.data[i]);
            let element = {
              id: res.data[i].id_Almacen,
              image: 'https://previews.123rf.com/images/mything/mything1711/mything171100054/90152603-.jpg',
              name: res.data[i].product_name,
              price: res.data[i].product_price,
              details: res.data[i].product_description,
              cant: res.data[i].product_cant,
              date: res.data[i].product_date,
              empresa: res.data[i].product_empresa,
              cantidad: 1, 
              subtotal:0
              };
            aux.push(element);
            //this.data.push(element);
          }
          console.log(aux);
          this.setProducts(aux);
          
        });
    },
    setMedicamentos(){
      let numberPages = Math.ceil(this.products.length/ this.perPage);
      for (let i = 1; i <= numberPages; i++) {
        this.pages.push(i);
      }
    },
    ...mapActions([
      'addProduct',
      'currentProduct',
      'setProducts'
    ]),
    paginated(product){
        let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return product.slice(from, to);
    },
    
    addProductToCart(product) {
      alert("SE AGREGO " + product.name + " AL CARRITO");
       product.subtotal = product.cantidad * product.price;
        this.addProduct(product);
        console.log(this.getProductsInCart);
    },
    addCurrentProduct(product) {
      this.currentProduct(product);
    },
    volver(){
       this.carts = 0;
         this.setdata();
    },
    buscarEmpresas(empresa){
      console.log("llegamos a empresa");
      console.log(empresa);
      this.empresas = []; 
      axios({
        method: 'get',
        url: `http://localhost:8090/client/product/buscarEmpresa?empresa=${empresa}`
      }).then(res =>{
        console.log(res);
        console.log(this.url);
        let aux = [];
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
              cantidad: 1, 
              subtotal:0

          };
          aux.push(element);
          
        }
        this.empresas = aux;
        
        this.setProducts(aux);
      })

    },
    calificaciones(product){
      console.log(product.id);
      this.$router.push({path: `/calificarProm/${product.id}`});
    },
    buscarNames(nombre){   //PARA CONECTAR CON LA BUSQUEDA POR NOMBRES 
    console.log(nombre);
      this.names = [];
      axios({
        method: 'get',
        url: `http://localhost:8090/client/product/buscarNombre?nombre=${nombre}`
      }).then(res =>{
        console.log(res);
        console.log(this.url);
        let aux = [];
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
              cantidad: 1, 
              subtotal:0

          };
          aux.push(element);
          
        }
        this.names = aux;
        
        this.setProducts(aux);
      })
    },
    busquedaGeneral(busqueda){
      console.log("estadoo");
      console.log(this.estado);
      console.log(busqueda);
      if(this.busqueda == ""){
        alert("Se debe agregar parametros para la busqueda")
      }
      else{
        if (this.estado){
        alert("Busqueda por producto ");
        this.busqueda = "";
        this.carts = 1;
        this.buscarNames(busqueda);
        }
        else{
          alert("Busqueda por empresa ");
          this.busqueda = "";
          this.carts = 2;
          this.buscarEmpresas(busqueda);
        }
      }
    },
    
    
   
  },
  watch:{
    products(){
      this.setMedicamentos();
    }
  },
 computed: {
    mostrar: function(){
      return this.paginated( this.products)
    },
    ...mapGetters([
      'getProductsInCart',
    ])
     
  },
       
};
</script>


