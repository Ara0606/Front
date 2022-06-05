<template>
  <div>
<h1>BIENVENIDO ADMINISTRADOR </h1>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<div  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        
        <router-link to="/HomePage">CREAR CUENTA EMPLEADOS</router-link>
      </li>
    </ul>
  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/sales">VENTAS DE AYER</router-link>
        
      </li>
    </ul>
  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/ReporteAdm">REPORTE</router-link>
        
      </li>
    </ul>
  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/ReporteporEmpresa">REPORTE NOMBRE DE EMPRESA</router-link>
        
      </li>
    </ul>
  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/ReporteMenAdm">ANUAL</router-link>
        
      </li>
    </ul>
  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/vencimiento">VENCIMIENTO</router-link>
        
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
  
</nav>
<h1>Reporte por Empresa</h1>
<div>
  <iframe title="reporte 1" width="1140" height="541.25" 
  src="https://app.powerbi.com/reportEmbed?reportId=dc748cf5-b94c-4cc0-bfc1-5fb4bad05616&autoAuth=true&ctid=84c31ca0-ac3b-4eae-ad11-519d80233e6f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D" 
  frameborder="0" allowFullScreen="true"></iframe>
</div>
</div>
<newEmployee />
</div>
</template>
