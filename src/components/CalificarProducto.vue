<template>
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

        <h1>Bienvenido a calificar</h1>
    
        <div class="card" style="width: 100rem;">
        <div class="card-body">
         <h5 style="margin: 20px;" class="card-title">{{ product_id_d }}</h5>
        <p style="margin: 20px;" class="card-text">{{product_name_d}}</p>
        <h2 style="margin: 20px;">Calificar</h2>
       <input style="margin: 20px;" type="number" min="1" max="5" 
       oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    maxlength = "1"
        required v-model="nota"><br>
           <button type="button" class="btn btn-outline-success" @click="calificar(product_id_d)">Guardar</button>
        <button style="margin: 20px;" type="button" class="btn btn-outline-danger"><router-link to="/productCart">Volver
      </router-link></button>
  </div>
</div>
    </div>
</template>
<script>

export default {
    
     props: ['product_id','product_name'],
     
    data(){
        return {
            product_id_d: this.product_id,
            product_name_d: this.product_name,
            entryError: '',
            nota: ""
        }
    },
    methods: {
       async calificar(product_id_d){
           if(this.nota>=6){
               alert("Calificacion invalida");
               this.nota=" ";
           }
           else{
            var id = localStorage.getItem("idUsuario");
            await fetch(
                `http://localhost:8090/calificacion`,{
                    method: 'POST',
                    body: JSON.stringify({
                        "estrellas": this.nota,
                        "idCliente": id,
                        "idAlmacen": product_id_d
                    }),
                    headers: { "Content-Type": "application/json"}
                });
            alert("Calificacion agregada");
            this.$router.push({path: "/productCart"})       
           
        }}
    }
   
}
</script>