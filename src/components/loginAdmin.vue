<template>

<div class="modal-card">
    
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
    <div >
    <nav >
      <router-link to="/">Login</router-link> |
      <router-link to="/about">Registro</router-link>
      
      
    </nav>
  </div>
  <router-view/>
<div class="badge bg-primary text-wrap" style="width: 100;margin: 20px; ">
  <h4>Ingresar al sistema</h4> 
</div>

<form @submit.prevent="handleSubmit2">
    <div v-if="entryError" class="error"> {{entryError}} </div>
    
    <label>Username: </label>
    <input style="margin: 20px;" type="text" v-model="user" required><br>

    <label>Password: </label>
    <input style="margin: 20px;" type="password" v-model="password" required><br>
 
   <button class="btn btn-info" style="margin: 20px;" @click="handleSubmit2()"> <a >Ingresar</a>  </button>
    
    

    
</form>
    <div class="imagen">
      <img src="https://us.123rf.com/450wm/ankomando/ankomando1906/ankomando190600045/126285999-ilustraci%C3%B3n-de-una-farmacia-y-un-farmac%C3%A9utico-.jpg?ver=6" alt="">
    </div>
</div>

</template>

<script>


export default{
    data(){
        return {
            user: '',
            password: '',
            entryError: ''
        }
    },
    methods: {
        fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    clickMe() {
        alert('Clicked!')
      },
        async handleSubmit2(){
            console.log("sirve el metodo");
            this.entryError = '';
            if(this.password.length == 0) this.entryError = 'Password should not be empty';
            if(this.user.length == 0) this.entryError = 'Username should not be empty';
            if(!this.entryError){
                //here should be the connection with the api
                //Do the post request here
                let aux = [];
                let aux1= [];
                const res = await fetch(
                    `http://localhost:8090/user/login?username=${this.user}&password=${this.password}`
                    );
                if(!res.ok){
                     const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                const result ={
                    data: data,
                    status: res.status,
                    statusText: res.statusText,
                    headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                    "Content-Length": res.headers.get("Content-Length"),
            },
                };
               
                
                  aux = this.fortmatResponse(result);
                  console.log(aux);  
                  for (const i in data){

                      console.log(`${i} : ${data[i]}`);
                      aux1.push(
                        `${data[i]}`
                      )
                  }
                  console.log(aux1[1]);
                  if (aux1[1] == null){
                      alert ("Usuario o contraseña incorrecto, vuelva a introducir sus datos");
                    //console.log(error);
                    this.user ="";
                    this.password = "";
                    
                  } else
                  if (aux1[1]== "CLI"){
                      console.log("esto es cliente");
                      
                      localStorage.setItem('idUsuario', aux1[0]);
                      return this.$router.push( {path: '/HomePageCliente'});
                  }else{
                      if(aux1[1]== "EMP"){
                      console.log("esto es empleado");
                      
                      localStorage.setItem('idUsuario', aux1[0]);
                      return this.$router.push({path: '/HomePageEmpleado'});
                  }
                  else{
                        if(aux1[1]== "ADM"){
                      console.log("esto es admin");
                      //newEmployee
                      localStorage.setItem('idUsuario', aux1[0]);
                      return this.$router.push({path: '/HomePage'}); 
                  }
                  }

               
                  }
                  
            }
        },
        
    headers: { "Content-Type": "application/json" },
    }
}
</script>