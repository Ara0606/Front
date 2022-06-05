<template>
<div class="modal-card">
    <h1>ACTUALIZAR PRODUCTO</h1>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
    <router-link to="/HomePageEmpleado"> <button type="button" class="btn btn-primary">REGRESAR</button>
      </router-link>

    <form @submit.prevent="handleSubmit2">
        <div v-if="entryError" class="error"> {{entryError}} </div>
        <label>Id Producto: </label>
        <input style="margin: 20px;" type="text" v-model="product_id_d" disabled><br>
        <label>Nombre Producto: </label>
        <input style="margin: 20px;" type="text" v-model="product_name_d" disabled><br>

        <label>Precio: </label>
        <input style="margin: 20px;" type="number" step="any" v-model="product_price_d" required><br>

        <label>Cantidad: </label>
        <input style="margin: 20px;" type="number" v-model="product_cant_d" required><br>

        <label>Fecha de vencimiento: </label>
        <input style="margin: 20px;" type="date" v-model="product_date_d" required><br>

        <label>Empresa: </label>
        <input style="margin: 20px;" type="text" v-model="product_empresa_d" disabled><br>

        <!-- <button style="margin: 10px;" class="btn btn-info" type="submit">Actualizar</button> -->
        <button style="margin: 10px;" class="btn btn-info" @click="activar2()" type="submit">Actualizar</button>

    </form>
</div>
</template>

<script>

export default{
    props: ['product_id','product_name', 'product_price', 'product_cant', 'product_date', 'product_empresa'],
    data(){
        return {
            
            product_id_d: this.product_id,
            product_name_d: this.product_name,
            product_price_d: this.product_price,
            product_cant_d: this.product_cant,
            product_date_d: this.product_date,
            product_empresa_d: this.product_empresa,
            entryError: ''
        }
    },
    methods: {
        async activar2(){
            console.log("howdy");
            this.entryError = '';
            if(this.product_name_d.length == 0) this.entryError = 'El nombre es un campo obligatorio';
            if(this.product_price_d == 0) this.entryError = 'El Precio es un campo obligatorio';
            if(!this.product_date_d) this.entryError = 'La fecha de Vencimiento es un campo obligatorio';
            if(!this.entryError){
                var date = this.product_date_d;
                var divide = this.product_date_d.split('-');
                var today= new Date();
                
                
                 var year = today.getFullYear();
                    var month = String(today.getMonth() + 1).padStart(2, '0'); 
                    var day = String(today.getDate()).padStart(2, '0');
                    //console.log("id "+id);
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
                    alert ("Fecha invalida")
                   
                }else 
                     
                    if ((divide[2] <= parseInt(day)  || divide[2] >= parseInt(day) ) 
                     && divide[1]  < parseInt(month) && divide[0] <= year  ){
                        console.log("here");
                        alert ("Fecha invalida")
                        
                     }else 
                     if (divide[2] <=  parseInt(day)   && divide[1]  <= parseInt(month) && divide[0] <= year ){
                        console.log("here");
                        alert ("Fecha invalida")
                        
                     }
                     else{
                       if(this.product_cant_d <=0){
                         alert ("Cantidad invalida")
                       
                       }
                       else if(this.product_price_d<= 0){
                         alert ("Precio invalido")
                       
                       }
                     else{
                //here should be the put request
                  try{ //doesnt work :'v
                   
                    console.log(dia)
                    console.log(this.product_id);
                    console.log(this.product_price_d);
                    console.log(this.product_cant_d);
                    console.log(date);
                     console.log('howdy');
                     await fetch(
                     `http://localhost:8090/product/update`,{
                         method: "PUT",
                         body: JSON.stringify({
                             id_Almacen: this.product_id_d,
                             product_price: this.product_price_d,
                             product_cant: this.product_cant_d,
                             product_date: `${divide[0]}-${divide[1]}-${dia}`,
                             
                         }),
                         headers: { "Content-Type": "application/json" },
                     });
                     alert("Produto actualizado");
                     this.$router.push({path: '/Almacen'});
                 }
                 catch(error){
                     console.log(error);
                }
                     }
            }
            }
        }
    },
    created(){
        console.log('howdy');
    }
}

</script>