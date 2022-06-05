<template>
<div id="app">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div ref='content'>
<div col-lg-12>
  <div class="row my-15">
      <div class="col-15">
        <h2>REPORTE</h2>
        <h1>Farmacia</h1>
      </div>
    </div>
<table id="example2" class="table table-nonfluid  table-striped table-bordered nowrap" cellpadding="0" cellspacing="0" border="0">
    <thead>
        <tr>
            <th>Descirpcion</th>
            <th>Cantidad</th>
        </tr>
	</thead>
    <tr>
        <th>Productos a Vencer (3 meses)</th>
		<th>{{tresMeses}} unidades</th>
	</tr>
    <tr>
        <th>Productos con stock menor a 100</th>
        <th>{{menorCien}} Unidades</th>
	</tr>
    <tr>
        <th>Productos con stock mayor a 100</th>
		<th>{{mayorCien}} Unidades</th>
	</tr>
    <tr>
        <th>Productos Eliminados</th>
        <th>{{prodEli}} Unidades</th>
	</tr>
    <tr>
        <th>Productos vencidos</th>
        <th>{{produVenc}} Unidades</th>
    </tr>
    <tr> 
        <th>Productos a vencer el 2023</th>
        <th>{{porVencer}} Unidades</th>
	</tr>
	</table>								
</div>		
  </div>
    <div>
      
      
      <button style="margin:10px;" @click="descargarPdf()" type="button" class="btn btn-outline-success">Crear Reporte PDF</button>
      <button style="margin:10px;" type="button" class="btn btn-outline-warning"><router-link to="/HomePage">Volver
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
//import { mapGetters, mapActions } from 'vuex';
import { mapGetters} from 'vuex';
import jspdf from 'jspdf'
import axios from 'axios';
//import html2canvas from 'html2canvas'

export default {
  name: "App",
  data(){
    return {
      totalfact: 0,
      fecha: "",
      direccion: "",
      user:"", 
      nit:"",
      tresMeses: "",
      menorCien: "",
      mayorCien: "",
      prodEli: "",
      produVenc: "",
      porVencer: ""


    }
  },
  created () {
    this.getData();
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();
  },
  computed: {
    ...mapGetters([
      'getProductsInCart',
    ]),
  },
  
  methods: {

    descargarPdf(){      
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
      doc.save("reporte.pdf")
      console.log("Ya descargado");
      this.vaciar();
    },
    getData(){
    axios({
      method: 'get',
      url: 'http://localhost:8090/almacen/data/report'
    }).then(res =>{
      
        this.tresMeses = res.data;
    
    });
  },
  getData1(){
    axios({
      method: 'get',
      url: 'http://localhost:8090/almacen/data/report1'
    }).then(res =>{
      
        this.menorCien = res.data;
    
    });
  },
  getData2(){
    axios({
      method: 'get',
      url: 'http://localhost:8090/almacen/data/report2'
    }).then(res =>{
      
        this.mayorCien = res.data;
    
    });
  },
  getData3(){
    axios({
      method: 'get',
      url: 'http://localhost:8090/almacen/data/report3'
    }).then(res =>{
      
        this.prodEli = res.data;
    
    });
  },
  getData4(){
    axios({
      method: 'get',
      url: 'http://localhost:8090/almacen/data/report4'
    }).then(res =>{
      
        this.produVenc = res.data;
    
    });
  },
  getData5(){
    axios({
      method: 'get',
      url: 'http://localhost:8090/almacen/data/report5'
    }).then(res =>{
      
        this.porVencer = res.data;
    
    });
  },
  
  },
  
};
</script>


<style>
.mgt-25 { margin: 25px 0 0 0; }
legend.com-imagem { overflow: hidden; line-height: 44px; padding: 10px 0; }
legend.com-imagem img { float: right; }
legend.sem-imagem { padding: 0 0 10px 0; }
form fieldset div.form-group { overflow: hidden; }
form fieldset label strong.is-required { color: red; }
#rdo_grupo-error { color: #a94442; }
.ajax-loader { background-color: wheat; }
.opacity-form { opacity: 0.5; }


.modal {
    display:    none;
    position:   fixed;
    z-index:    1000;
    top:        0;
    left:       0;
    height:     100%;
    width:      100%;
    background: rgba( 255, 255, 255,.8 ) 
                url('https://i.stack.imgur.com/FhHRx.gif') 
                50% 50% 
                no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
    overflow: hidden;   
}

/* Anytime the body has the loading class, our
   modal element will be visible */
body.loading.modal {
    display: block;
}

.nopaddingDiv {
   padding-left: 0 !important;
   padding-right: 5 !important; 
}

.panel-default >.panel-heading{
	color: #FFFFFF !important;
    background-color: #c00 !important;
    border-color: #ddd !important;
    
}
.list-group-item{
	color: #FFFFFF !important;
    background-color: #c00 !important;
	
}
.list-group.panel >.list-group-item {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  color: #FFFFFF !important;
  background-color: #c00 !important;
}

 .list-group-submenu {
  margin-left:20px;
}

.strong { font-weight: bold; }

.nopaddingInput {
   padding-left: 1 !important;
   padding-right: 1 !important;
}

.vertical-align {
 display: flex !important;
  flex-direction: row !important;
}

.vertical-align > [class^="col-"],
.vertical-align > [class*=" col-"] {
  display: flex !important;
  align-items: center !important;     /* Align the flex-items vertically */
  justify-content: center !important; /* Optional, to align inner flex-items 
                              horizontally within the column  */
}

.table-nonfluid {
  margin-left: 20%;
  align-content: center;
   width: 800px !important;
   max-width: 800px !important;
}


</style>