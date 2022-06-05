<template>
<div id="app">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div ref='content'>
<div class="col-11">

    

    <div class="row my-3">
      <div class="col-8">
        <h2>Factura</h2>
        <h1>Farmacia</h1>
      </div>
    </div>
  
    <hr />
  
    <div class="row fact-info mt-3">
      <div class="col-3">
        <h5>Facturar a</h5>
        <p>
          <label>NOMBRE: </label>
        <input type="text" v-model="user" required><br><br>
        <label>NIT: </label>
        <input type="number" v-model="nit" required><br>
        </p>
      </div>
      <div class="col-2">
        
      </div>
      <div class="col-3">
       
        <h5>Fecha</h5>
        
      </div>
      <div class="col-3">
        
        <p>{{fecha}}</p>
       
      </div>
    </div>
  
    <div class="row my-2">
      <table class="table table-borderless factura">
        <thead>
          <tr>
            
            <th>Nombre</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in getProductsInCart" :key="index">
            
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td>{{product.cantidad}}</td>
            <td>{{product.subtotal}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Total Facturar</th>
            <th>{{totalfact}} Bs.</th>
          </tr>
        </tfoot>
      </table>
    </div>
</div>
  
</div>
<div>
      
      <button style="margin:10px;" @click="confirmSell()" type="button" class="btn btn-outline-success">Crear Factura</button>
      <button style="margin:10px;" type="button" class="btn btn-outline-warning"><router-link to="/sellingCart">Volver
      </router-link></button><div  style="width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;">
    </div>  
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import jspdf from 'jspdf'
//import html2canvas from 'html2canvas'
//import axios from 'axios'

export default {
  name: "App",
  data(){
    return {
      totalfact: 0,
      fecha: "",
      user: "",
      nit: ""
    }
  },
  
  computed: {
    ...mapGetters([
      'getProductsInCart',
    ]),
  },
created () {
    for (let i =0; i<this.getProductsInCart.length;i++){
      this.totalfact+= this.getProductsInCart[i].subtotal;
    }
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0'); 
    var day = String(today.getDate()).padStart(2, '0');
    this.fecha = `${year}-${month}-${day}`;
  },
  methods: {
    ...mapActions([
      'removeProduct',
    ]),
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0);
    },
    remove(index) {
      this.removeProduct(index);
    },
    async confirmSell(){
      let datos = [];
      var id = localStorage.getItem("idUsuario");
      for (let i = 0; i < this.getProductsInCart.length; i++){
        let element = {
            idAlmacen: this.getProductsInCart[i].id,
            productName: this.getProductsInCart[i].name,
            productPrice: this.getProductsInCart[i].price, 
            productCant: this.getProductsInCart[i].cant,
            productDate: this.getProductsInCart[i].date,
            productEmpresa: this.getProductsInCart[i].empresa,
            productDescription: this.getProductsInCart[i].details,
            employId: id,
            cantidad: this.getProductsInCart[i].cantidad
        };
        datos.push(element);
      }
      let aux = {
        monto: this.totalfact,
        fecha: this.fecha,
        idEmpleado: id,
        ci: this.nit,
        nombre: this.user,
        products: datos
      }
      console.log(aux);
      try {
        await fetch (
          `http://localhost:8090/venta`,{
            method: 'POST',
            body: JSON.stringify({
              monto: this.totalfact,
              fecha: this.fecha,
              idEmpleado: id,
              ci: this.nit,
              nombre: this.user,
              products: datos
            }),
            headers: { "Content-Type": "application/json" },
          });
          alert("Venta realizada")
          console.log("Entrando a descarga");
          this.descargarPdf()
      } catch (error) {
        alert("error");
      }
    },
    vaciar(){
      //var mensaje;
      
        this.getProductsInCart.length=0;
       // mensaje = "Cancelo la compra";
        for (let i=0;i<this.getProductsInCart.length; i++){
          this.removeProduct(i);
        }
        
        this.$router.push({path: "/HomePageEmpleado"})
        
        /*else{
          mensaje = "Realizaste la compra";}
          document.getElementById("ejemplo").innerHTML = mensaje;*/
     /* if (confirm('Desea cancelar la compra?')) {
        this.getProductsInCart.length=0;
        console.log('Borrado');
    } else {
    console.log('sin cancelar');
    }*/
    },

    descargarPdf(){
      
      /*var canvas = document.getElementById('facturaciones')
      html2canvas(canvas).then(function(canvas){
        var imgData = canvas.toDataURL('image/png')
        var doc = new jspdf()
        doc.addImage(imgData, 'PNG',1,1)
        doc.save("facturar.pdf")
      })*/

      //const html1 = document.getElementById("facturaciones");
      console.log("Entre a descarga");
      const doc = new jspdf();
      console.log("Entre a descarga 1");
      const html = this.$refs.content.innerHTML
      console.log("Entre a descarga 2");
      doc.fromHTML(html,15,15,{
        width:150
        
      })
      doc.text(this.user,40,61);
      doc.text(this.nit,25,75);
      console.log("Voy a descargar");
      doc.save("facturar.pdf")
      console.log("Ya descargado");
      this.vaciar();
    },
  },
};
</script>

<style scoped>
.factura {
  table-layout: fixed;
}

.fact-info > div > h5 {
  font-weight: bold;
}

.factura > thead {
  border-top: solid 3px #000;
  border-bottom: 3px solid #000;
}

.factura > thead > tr > th:nth-child(2), .factura > tbod > tr > td:nth-child(2) {
  width: 300px;
}

.factura > thead > tr > th:nth-child(n+1) {
  text-align: right;
}

.factura > tbody > tr > td:nth-child(n+1) {
  text-align: right;
}

.factura > tfoot > tr > th, .factura > tfoot > tr > th:nth-child(n+3) {
  font-size: 24px;
  text-align: right;
}

.cond {
  border-top: solid 2px #000;
}
</style>