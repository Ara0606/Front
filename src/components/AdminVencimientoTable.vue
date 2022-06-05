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
      :data="products"
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
     
       <b-table-column field="id" label="ID" width="40" sortable numeric v-slot="props">
        {{props.row.id}}
      </b-table-column>
      <b-table-column field="name" label="Nombre"  sortable v-slot="props">
        {{props.row.name}}
      </b-table-column>
     <b-table-column field="empresa" label="Empresa" sortable v-slot="props">
        {{props.row.empresa}}
      </b-table-column>
      <b-table-column field="cant" label="Cantidad"  sortable v-slot="props">
       
        <span class="tag is-success" size="is-large">
        {{props.row.cant}}
        </span>
      </b-table-column>
     
      <b-table-column field="date" label="Fecha Venc"  sortable v-slot="props">
        <span class="tag is-warning" size="is-large">
        {{props.row.date}}
        </span>
      </b-table-column>
      <!--<b-table-column  v-slot="props"  >
        <b-button
          type="is-warning"
          label="ACTUALIZAR"
          @click="actualizar(props.row.id,props.row.name,props.row.price,props.row.cant,props.row.date,props.row.empresa)"
        >
        -->
        <!--<router-link
          :to="{path: `/EditProduct/${product.id}/${product.name}/${product.price}/${product.cant}/${product.date}/${product.empresa}`}"
        ></router-link>-->
      <!--  </b-button>
      </b-table-column>
      <b-table-column  v-slot="props">
        <b-button
          type="is-danger"
          label="ELIMINAR"
          @click="removeProductAsked(props.row.id)"
        />
        
        
      </b-table-column>
  -->
  
    </b-table>


</div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
 
  props: ['products'],
  data(){
    return {
   data:this.products,
    isPaginated: true,
                isPaginationSimple: false,
                isPaginationRounded: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 100,
                hasInput: false,
                paginationOrder: '',
                inputPosition: '',
                inputDebounce: ''
    }
  },
  methods: {
      alerta(){
        var mensaje;
        var opcion = confirm("Clicka en Aceptar o Cancelar");
        if (opcion == true) {
        mensaje="Has clickado OK";
        
        } 
        console.log(mensaje);
        console.log ();
      },
      ...mapActions([
        'setProducts',
        'deleteProduct',
      ]),
      
    },
    created () {
        // this.dispatch("fetchProducts");
        console.log('hello from created');
          axios({
            method: 'get',
            url: 'http://localhost:8090/product/vencimiento'
          }).then(res => {
            console.log(res)
            let aux = [];
            for(let i = 0; i < res.data.length; i++){
              console.log(res.data[i]);
              let element = {
                id: res.data[i].id_Almacen,
                //image: 'https://previews.123rf.com/images/mything/mything1711/mything171100054/90152603-.jpg',
                name: res.data[i].product_name,
                price: res.data[i].product_price,
                //details: res.data[i].product_description,
                cant: res.data[i].product_cant,
                empresa: res.data[i].product_empresa,
                date: res.data[i].product_date,
                
              };
              aux.push(element);

            }
            console.log(aux);
            this.setProducts(aux);
          });
    },
    
    
};
  
</script>


