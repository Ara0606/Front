import loginAdmin from '/src/components/loginAdmin.vue'
import newEmployee from '/src/components/newEmployee.vue'
import HomePageCliente from '/src/components/HomePageCliente.vue'
import HomePage from '/src/components/HomePage.vue'
import HomePageEmpleado from '/src/components/HomePageEmpleado.vue'
import ProductCart from '/src/components/ProductCart.vue'
import Crearproducto from '/src/components/crearProducto.vue'
import EditProduct from '/src/components/EditProduct.vue'
import AlmacenEmpleado from '/src/components/AlmacenEmpleado.vue'
import sellingCart from '/src/components/sellingCart.vue'
import BridgeSalesList from '/src/components/BridgeSalesList.vue'
import CrearFactura from '/src/components/CrearFactura.vue'
import CrearFacturaCliente from '/src/components/CrearFacturaCliente.vue'
import CalificarProducto from '/src/components/CalificarProducto.vue'
import ReporteAdm from '/src/components/ReporteAdm.vue'
import AlmacenAdmin from '/src/components/AlmacenAdmin.vue'
import VencimientoAdmin from '/src/components/VencimientoAdmin.vue'
import ReporteMenAdm from '/src/components/ReporteMenAdm.vue'
import CalificarProm from '/src/components/CalificarProm.vue'
import ReporteporEmpresa from '/src/components/ReporteporEmpresa.vue'

export default [
  {
    path: '/',
    component: loginAdmin,
    name: 'Login',
    props: true
  },
  {
    path: '/calificarProm/:almacenId',
    component: CalificarProm,
    name: 'CalificarProm',
    props: true
  },
  {
    path: '/vencimiento',
    component: VencimientoAdmin,
    name: 'vencimiento',
    props: true
  },
  {
    path: '/almacenAdmin',
    component: AlmacenAdmin,
    props: true
  },
  {
    path: '/ReporteporEmpresa',
    component: ReporteporEmpresa,
    props: true
  },
  {
    path: '/sales',
    component: BridgeSalesList,
    name: 'sales',
    props: true
  },
  {
    path: '/EditProduct/:product_id/:product_name/:product_price/:product_cant/:product_date/:product_empresa',
    component: EditProduct,
    name: 'EditProduct',
    props: true,
  },
  {
    path: '/CalificarProducto/:product_id/:product_name',
    component: CalificarProducto,
    name: 'CalificarProducto',
    props: true,
  },
  {
    path: '/newEmployee',
    component: newEmployee,
    name: 'newEmployee',
    props: true
  },
  {
    path: '/HomePageCliente',
    component: HomePageCliente,
    name: 'HomePageCliente',
    props: true
  },
  {
    path: '/HomePage',
    component: HomePage,
    name: 'HomePage',
    props: true
  },
  {
    path: '/HomePageEmpleado',
    component: HomePageEmpleado,
    name: 'HomePageEmpleado',
    props: true
  },
  {
    path: '/productCart',
    component: ProductCart,
    name: 'Carrito',
    props: true

  },
  {
    path: '/sellingCart',
    component: sellingCart,
    name: 'Selling Cart',
    props: true
    
  },
  {
    path: '/CrearProducto',
    component: Crearproducto,
    name: 'CrearProducto',
    props: true
    
  },
  {
    path: '/Almacen',
    component: AlmacenEmpleado,
    name: 'Almacen',
    props: true
    
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '/src/components/newClient.vue'),
    name: 'Registro',
    props: true
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  },
  {
    path: '/CrearFactura',
    component: CrearFactura,
    name: 'CrearFactura',
    props: true
  },
  {
    path: '/CrearFacturaCliente',
    component: CrearFacturaCliente,
    name: 'CrearFacturaCliente',
    props: true
  },

  {
    path: '/ReporteAdm',
    component: ReporteAdm,
    name: 'ReporteAdm',
    props: true
  },
  
  {
    path: '/ReporteMenAdm',
    component: ReporteMenAdm,
    name: 'ReporteMenAdm',
    props: true
  },
  
  
]


