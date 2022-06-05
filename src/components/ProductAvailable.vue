<template>
<div>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<div class="badge bg-primary text-wrap" style="width: 100;margin: 20px; ">
  <h4>Lista de productos</h4> 
</div>
<div class="List" style="border: 1px; margin: 25px 50px 75px; ">
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action" style="background-color: lightblue">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">paracetamol</h5>
      <small>15 unidades</small>
    </div>
    <p class="mb-1">Laboratorio.</p>
    <p class="mb-1">Descripcion</p>
    <small>Precio unidad</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action" >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">paracetamol</h5>
      <small>15 unidades</small>
    </div>
    <p class="mb-1">Laboratorio.</p>
    <p class="mb-1">Descripcion</p>
    <small>Precio unidad</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action" style="background-color: lightblue">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">paracetamol</h5>
      <small>15 unidades</small>
    </div>
    <p class="mb-1">Laboratorio.</p>
    <p class="mb-1">Descripcion</p>
    <small>Precio unidad</small>
  </a>
  
  
</div>
</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            name: '',
            ci: '',
            email: '',
            password: '',
            passwordError: '',
        }
    },
    methods: {
        handleSubmit(){
            this.passwordError = this.password.length > 6?
                    '':'Password should be more than 6 characters long';
            if(!this.passwordError){
                console.log(this.name);
                console.log(this.ci);
                console.log(this.email);
                console.log(this.password);
                //here should be the connection with the api
                //Do the post request here
            }
        }
    }
}
</script>

<style scoped>
form{
    align-content: center;   
}
label{
    width: 100px;
}
</style>