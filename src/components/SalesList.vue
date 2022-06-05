<template>
<section>
   <div class="container">
        
       
<b-field grouped group-multilne>
      
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="25">25 por hoja</option>
        <option value="50">50 por hoja</option>
        <option value="75">75 por hoja</option>
        <option value="100">100 por hoja</option>
      </b-select>
      
      <div class="control is-flex">
        <b-switch v-model="isPaginated">Paginación</b-switch>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Paginación simple</b-switch>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginationRounded" :disabled="!isPaginated">Íconos Redondos</b-switch>
      </div>
      <b-select v-model="paginationPosition" :disabled="!isPaginated">
        <option value="bottom">Paginación abajo</option>
        <option value="top">Paginación Arriba</option>
        <option value="both">Paginación en ambos</option>
      </b-select>
      <br>
     
      
    </b-field>
    <b-table
      :data="sales"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="id"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :page-input="hasInput"
      :pagination-order="paginationOrder"
      :page-input-position="inputPosition"
      :debounce-page-input="inputDebounce" 
      >
       <b-table-column field="id" label="ID " width="40" sortable numeric v-slot="props">
        {{props.row.idVenta}}
      </b-table-column>
      <b-table-column field="name" label="Monto Bs."  sortable v-slot="props">
        {{props.row.monto}}
      </b-table-column>
      <b-table-column field="date" label="Fecha" sortable v-slot="props">
       
        {{props.row.fecha}}
      </b-table-column>
      <b-table-column field="cant" label="Dirección"  sortable v-slot="props">
         <span v-if="props.row.direccion != null" class="tag is-success" size="is-large">
            {{props.row.direccion}}
         </span>
          <span v-else class="tag is-danger" size="is-medium">
            Venta de empleado
          </span>
      </b-table-column>
      <b-table-column field="price" label="IdFactura" sortable v-slot="props">
        {{props.row.idfactura}}
      </b-table-column>
    </b-table>
     <div>
            <p>Cantidad de ventas realizadas: {{yesterday}}</p>
            <p>Total ganado: {{ganancias}} Bs</p>
        </div>
        </div>
</section>
</template>
<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
    
    props: ['sales'],
    data(){
        return{
            ganancias: 0,
            yesterday: 0,
            isPaginated: true,
                        isPaginationSimple: false,
                isPaginationRounded: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 25,
                hasInput: false,
                paginationOrder: '',
                inputPosition: '',
                inputDebounce: ''
        }
    },
    methods: {
     salir(){
      var opcion = confirm("Desea salir?")
      if (opcion == true) {
        window.localStorage.clear();
        this.$router.push({path: '/'});
      }
  }, 
  ...mapActions([
         'setSales'
     ]),
     
     
    
    },
    created () {
         
         //console.log("we are in created");
         axios({
             method: 'get',
             //el url debe cambiar de acuerdo a lo que se haga en backend para este punto
             // mi recomendacion es usar la clase Date() ya que con ese se obtiene el la fecha actual,
             // y simplemente seria necesario bajar un dia al actual para mandarlo a backend
             url: 'http://localhost:8090/venta'
         }).then(res => {
             console.log(res);
             let aux = [];
             for (let i = 0; i < res.data.length; i++){
                 console.log(res.data[i]);
                 let element = {
                     /*
                     cambiar los datos con los que se obtenga de la base de datos con lo establecido en la tabla 
                     o como se quede 
                     */
                     idVenta: res.data[i].idVenta,
                     monto: res.data[i].monto,
                    fecha: res.data[i].fecha,
                    direccion: res.data[i].direccion,
                    idfactura: res.data[i].idFactura
                    
                    }
                    /*
                    para que sea mas facil la vista del admin y no tenga que contar
                    uno por uno. 
                    yesterday son las ventas realizadas en el dia anterior y
                    ganancias son el subtotal de cada venta 
                    */
                    this.yesterday ++;
                    this.ganancias +=  res.data[i].monto;
                    aux.push(element);
             }
             console.log(aux);
             this.setSales(aux);
         });
     },
    
}
</script>
