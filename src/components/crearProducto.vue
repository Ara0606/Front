

<template>
<div class="modal-card">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<h1> CREAR PRODUCTO</h1>
<div  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link to="/HomePageEmpleado">Venta
      </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <router-link to="/CrearProducto">Crear producto
      </router-link>
      </li>
    </ul>
    
  </div><div class="collapse navbar-collapse" id="navbarSupportedContent">
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
  <form  class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    
</nav>
</div>
    <form @submit.prevent="handleSubmit">
        <div v-if="entryError" class="error"> {{entryError}} </div>

        <label>Nombre Producto: </label>
        <input style="margin: 20px;" type="text" v-model="product_name" required><br>

        <label>Precio: </label>
        <input style="margin: 20px;" type="number" step="any" v-model="product_price" required><br>

        <label>Cantidad: </label>
        <input style="margin: 20px;" type="number" v-model="product_cant" required><br>

        <label>Fecha de vencimiento: </label>
        <input style="margin: 20px;" type="date" v-model="product_date" required><br>

        <label>Empresa: </label>
        <input style="margin: 20px;" type="text" v-model="product_empresa" required><br>
        <label>Descripcion: </label>
        <input style="margin: 20px;" type="text" v-model="product_description"  required><br>

        <button style="margin: 10px;" class="btn btn-info" @click="enviar()">Crear</button>
        </form>
</div>
</template>

<script>

export default{
    data(){
       
        return {
            product_name: '',
            product_price: '',
            product_cant: '',
            product_date: '',
            product_empresa: '',
            entryError: '',
            mindate: new Date().toISOString().substr(0, 10)
             
            
        }
    },
    methods: {
        async  enviar(){
              
            this.entryError = '';
            if(this.product_name.length == 0) this.entryError = 'El nombre es un campo obligatorio';
            if(this.product_price == 0) this.entryError = 'El Precio es un campo obligatorio';
            if(!this.product_date) this.entryError = 'La fecha de Vencimiento es un campo obligatorio';
           
            if(!this.entryError){
             console.log(this.product_date);
             var date = this.product_date;
             console.log(date);
              var divide = this.product_date.split('-');
              var today= new Date();
              console.log("today"+today);
                    var year = today.getFullYear();
                    var month = String(today.getMonth() + 1).padStart(2, '0'); 
                    var day = String(today.getDate()).padStart(2, '0');
                    var id = localStorage.getItem("idUsuario");
                    console.log("id "+id);
                    console.log(divide[0] );
                    console.log(divide[1]);
                    console.log(divide[2]);
                    console.log("------------");
                    console.log(year);
                    console.log(month);
                    console.log(day);
                    var dia = parseInt(divide[2])+1;
                    dia = String(dia).padStart(2, '0');
                   if (divide[0]>2025 || divide[0]<2022){
                    alert ("año invalido")
                    this.product_name = "";
                    this.product_price = "";
                    this.product_cant = "";
                    this.product_date = "";
                    this.product_empresa = "";
                    this.product_description = "";
                }else 
                     
                    if ((divide[2] <= parseInt(day)  || divide[2] >= parseInt(day) )  && divide[1]  < parseInt(month) && divide[0] <= year  ){
                        console.log("here");
                        alert ("Fecha invalida")
                        this.product_name = "";
                    this.product_price = "";
                    this.product_cant = "";
                    this.product_date = "";
                    this.product_empresa = "";
                    this.product_description = "";
                     }else 
                     if (divide[2] <=  parseInt(day)   && divide[1]  <= parseInt(month) && divide[0] <= year ){
                        console.log("here");
                        alert ("Fecha invalida")
                        this.product_name = "";
                    this.product_price = "";
                    this.product_cant = "";
                    this.product_date = "";
                    this.product_empresa = "";
                    this.product_description = "";
                     }
                     else{
                       if(this.product_cant <=0){
                         alert ("Cantidad invalida")
                        this.product_name = "";
                    this.product_price = "";
                    this.product_cant = "";
                    this.product_date = "";
                    this.product_empresa = "";
                    this.product_description = "";
                       }
                       else if(this.product_price<= 0){
                         alert ("Precio invalido")
                        this.product_name = "";
                    this.product_price = "";
                    this.product_cant = "";
                    this.product_date = "";
                    this.product_empresa = "";
                    this.product_description = "";
                       }
                  else{
                try {
                  console.log(dia);
                    await fetch(
                        `http://localhost:8090/product`,{
                        method: "POST",
                        body: JSON.stringify({
                            product_name: this.product_name,
                            product_price: this.product_price,
                            product_cant: this.product_cant,
                            product_date: `${divide[0]}-${divide[1]}-${dia}`,
                            product_empresa: this.product_empresa,
                            product_description: this.product_description,
                            employee_id: id

                        }),
                        headers: { "Content-Type": "application/json" },
                        
                        });
                         alert("Producto registrado");
                          this.product_name = "";
                    this.product_price = "";
                    this.product_cant = "";
                    this.product_date = "";
                    this.product_empresa = "";
                    this.product_description = "";




                } catch (error) {
                    alert("error ");
                }
                     }
                     }
                }
                
                
            }
        },
          salir(){
      var opcion = confirm("Desea salir?")
      if (opcion == true) {
        window.localStorage.clear();
        this.$router.push({path: '/'});
      }
   }
    }


</script>