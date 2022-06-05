
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    //get the products from the api 
    medicamentos: [
    
    ],
    venta: [
      
    ],
    cartProducts: [],
    currentProduct: {},
    showModal: false,
    showPopupCart: false,
  },
  getters: {
    getAllSales: state=> { return  state.venta},
    getAllProducts: state=> { return  state.medicamentos},
    getProductsInCart: state=>{ return state.cartProducts},
    getCurrentProduct: state=>  {return state.currentProduct},
    getShowModal: state=> {return state.showModal},
    getPopupCart: state=> {return state.showPopupCart},
  },
  

  mutations: {
    ADD_PRODUCT: (state, product) => {
      state.cartProducts.push(product);
    },
    REMOVE_PRODUCT: (state, index) => {
      state.cartProducts.splice(index, 1);
    },
    CURRENT_PRODUCT: (state, product) => {
      state.currentProduct = product;
    },
    SHOW_MODAL: (state) => {
      state.showModal = !state.showModal;
    },
    SHOW_POPUP_CART: (state) => {
      state.showPopupCart = !state.showPopupCart;
    },
    UPDATE_PRODUCT: (state, product) => {
      state.currentProduct = product;
    },
    SET_PRODUCTS: (state, product) =>{
      state.medicamentos = product;
    },
    DELETE_PRODUCT: (state, index) => {
      state.medicamentos.splice(index, 1);
    },
    SET_SALES: (state, sale)=>{
      state.venta = sale;
  },
  },

  actions: {
    addProduct: (context, product) => {
      context.commit('ADD_PRODUCT', product);
    },
    removeProduct: (context, index) => {
      context.commit('REMOVE_PRODUCT', index);
    },
    currentProduct: (context, product) => {
      context.commit('CURRENT_PRODUCT', product);
    },
    showOrHiddenModal: (context) => {
      context.commit('SHOW_MODAL');
    },
    showOrHiddenPopupCart: (context) => {
      context.commit('SHOW_POPUP_CART');
    },
    updateProduct: (context, product) => {
      context.commit('UPDATE_PRODUCT', product);
    },
    setProducts: (context, product) => {
      context.commit('SET_PRODUCTS', product);
    },
    deleteProduct: (context, index) =>{
      context.commit('DELETE_PRODUCT', index);
    },
    setSales:(context, sale)=>{
      context.commit('SET_SALES', sale);
  },
  

  }
 
});