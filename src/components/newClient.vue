<template>
<div class="modal-card">
 <div >
    <nav >
      <router-link to="/">Login</router-link> |
      <router-link to="/about">Registro</router-link>
      
      
    </nav>
  </div>
  <router-view/>

<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <div class="badge bg-primary text-wrap" style="width: 100;margin: 30px; ">
  <h4>Crear cuenta cliente</h4> 
</div>
<form @submit.prevent="handleSubmit1">
    <label>Nombre: </label>
    <input type="text" v-model="name" required><br>

    <label>Apellido:</label>
    <input  style="margin: 20px;" type="text" v-model="apellido" required><br>
    <label>Email: </label>
    <input type="email" v-model="email" required><br>

    <label>CI:</label>
    <input  style="margin: 20px;" type="number" v-model="ci" required><br>

    <label>Usuario:</label>
    <input  style="margin: 20px;" type="text" v-model="user" required><br>

    <label>Contraseña: </label>
    <input   style="margin: 5px;" type="password" v-model="password" required><br>
    <div v-if="passwordError" class="error">{{ passwordError }} </div>
    <label>Confirmar Contraseña: </label>
    <input   style="margin: 5px;" type="password" v-model="rpassword" required><br>
    <div v-if="passwordError" class="error">{{ passwordError }} </div>

    <button style="margin: 10px;" class="btn btn-info" type="submit">Crear</button>
 
</form>
<div class="imagen">
      <img src="https://us.123rf.com/450wm/ankomando/ankomando1906/ankomando190600045/126285999-ilustraci%C3%B3n-de-una-farmacia-y-un-farmac%C3%A9utico-.jpg?ver=6" alt="">
    </div>
</div>
</template>

<script>

export default {
    data(){
        return {
            name: '',
            apellido: '',
            ci: '',
            email: '',
            password: '',
            passwordError: '',
        }
    },
    methods: {
        async handleSubmit1(){
            this.passwordError = this.password.length > 6?
                    '':'Password should be more than 6 characters long ';
            if(!this.passwordError){
                console.log(this.name);
                console.log(this.ci);
                console.log(this.email);
                console.log(this.user);
                console.log(this.password);
                console.log(this.apellido);
                console.log("r"+this.rpassword);
                
            }
            if (this.rpassword != this.password) {
                alert("las contraseñas no coinciden, reingresar los datos");
                this.name= "";
                this.apellido= "";
                this.ci = "";
                this.user = "";
                this.email= "";
                this.password= "";
                this.rpassword = "";
            }
            else{
               // try {
                     
                    await fetch(
                    `http://localhost:8090/clients/post`,{
                        method: "POST",
                        body: JSON.stringify({
                            client_ci: this.ci,
                            clientEmail: this.email,
                            clientPwd: this.password,
                            clientUsername: this.user,
                            clientFirstName: this.name,
                            clientLastName: this.apellido
                        }),
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },

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
                    
                    
                   
                    
                    
                    alert("nuevo usuario agregado");
                    this.name= "";
                this.apellido= "";
                this.ci = "";
                this.user = "";
                this.email= "";
                this.password= "";
                this.rpassword = "";
                    
                /*}
                catch(error){
                    alert("error, se repite el correo ");
                     this.name= "";
                this.apellido= "";
                this.ci = "";
                this.user = "";
                this.email= "";
                this.password= "";
                this.rpassword = "";
                }*/
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