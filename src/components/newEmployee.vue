<template>
<div class="modal-card">
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<div class="badge bg-primary text-wrap" style="width: 100;margin: 20px; ">
  <h4>Crear cuenta para Empleados</h4> 
</div>

<form @submit.prevent="handleSubmit">
    <label>Nombre: </label>
    <input type="text" v-model="name" required><br>

    <label>CI:</label>
    <input  style="margin: 20px;" type="number" v-model="ci" required><br>
    <label>Email: </label>
    <input type="email" v-model="email" required><br><br>

    <label>Usuario: </label>
    <input type="text" v-model="user" required><br>
    
    <label>Contraseña: </label>
    <input   style="margin: 20px;" type="password" v-model="password" required><br>
    <div v-if="passwordError" class="error">{{ passwordError }} </div>

    <label>Confirmar Contraseña: </label>
    <input   style="margin: 20px;" type="password" v-model="rpassword" required><br>
    <div v-if="passwordError" class="error">{{ passwordError }} </div>

    <button  class="btn btn-info" @click ="crear()" type="submit">Crear</button>
  <!--  <button  class="btn btn-info" type="submit" style="margin: 20px;"><a href="/HomePage">volver</a></button>-->
    
 
</form>
<img src="https://img.freepik.com/vector-gratis/doctor-dibujado-mano-personaje-gesto-imagenes-predisenadas-vestido_40876-3045.jpg?t=st=1648651290~exp=1648651890~hmac=ff5238d371b5e928c1b9269a2fcefc4a05ff60cfd45bfbf7f0cdb4b50a011405&w=900" height="300" width="400" alt="">
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
        async crear(){
            this.passwordError = this.password.length > 6?
                    '':'Password should be more than 6 characters long';
            if(!this.passwordError){
                console.log(this.name);
                console.log(this.ci);
                console.log(this.email);
                console.log(this.password);
                if (this.password != this.rpassword){
                    alert("Error, las contraseñas no coinciden");
                    this.name = "";
                    this.ci = "";
                    this.email = "";
                    this.password = "";
                    this.user = "";
                    this.password = "";
                    this.rpassword = "";
                }
                else{
                   // try{
                    await fetch(
                        `http://localhost:8090/empleado/post`,{
                            method: "POST",
                            body: JSON.stringify({
                                empleadoName: this.name,
                                empleadoCi: this.ci,
                                empleadoUsername: this.user,
                                empleadoCorreo: this.email,
                                empleadoPwd: this.password
                            }),
                            headers: { "Content-Type": "application/json" },
                        }).then(function(res) { return res.json(); })
                    .catch(function(error) {alert("Correo repetido, repetir los datos") 
                    this.name= "";
                    console.log(error)
                this.apellido= "";
                this.ci = "";
                this.user = "";
                this.email= "";
                this.password= "";
                this.rpassword = "";
                    })
                        alert("Nuevo empleado agregado");
                        this.name = "";
                    this.ci = "";
                    this.email = "";
                    this.password = "";
                    this.user = "";
                    this.password = "";
                    this.rpassword = "";
                /*}
                catch(error){
                    alert("error ");
                }*/
                }
                
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