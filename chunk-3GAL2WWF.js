import{f as l,m as p}from"./chunk-33FNBRGN.js";import{Lb as o,R as m,X as u}from"./chunk-EMGZUWUL.js";import{a as n,b as d}from"./chunk-ECBXVGWK.js";var E=(()=>{class i{store=u(p);toastService=u(l);STORE_KEY="cart";constructor(){this.initializeCart()}initializeCart(){let t={items:[],totalItems:0,totalAmount:0,lastUpdated:new Date},a=localStorage.getItem(this.STORE_KEY);a?this.store.setState(this.STORE_KEY,JSON.parse(a)):this.store.setState(this.STORE_KEY,t)}cart=this.store.select(this.STORE_KEY);cartItems=o(()=>this.cart()?.items||[]);totalItems=o(()=>this.cart()?.totalItems||0);totalAmount=o(()=>this.cart()?.totalAmount||0);getItemQuantity(t){return o(()=>this.cartItems().find(s=>s.productId===t)?.quantity||0)}addToCart(t){let a=this.cart(),s=a.items.find(e=>e.productId===t.id),r;if(s)r=a.items.map(e=>e.productId===t.id?d(n({},e),{quantity:e.quantity+1}):e);else{let e={id:Date.now(),productId:t.id,title:t.title,price:t.price,quantity:1,image:t.image};r=[...a.items,e]}this.updateCart(r),this.toastService.success("Item added to cart")}removeFromCart(t){let s=this.cart().items.filter(r=>r.productId!==t);this.updateCart(s),this.toastService.success("Item removed from cart")}updateQuantity(t,a){if(a<1)return;let r=this.cart().items.map(e=>e.productId===t?d(n({},e),{quantity:a}):e);this.updateCart(r)}clearCart(){this.initializeCart(),this.toastService.success("Cart cleared")}updateCart(t){let a=t.reduce((e,c)=>e+c.quantity,0),s=t.reduce((e,c)=>e+c.price*c.quantity,0),r={items:t,totalItems:a,totalAmount:s,lastUpdated:new Date};this.store.setState(this.STORE_KEY,r),localStorage.setItem(this.STORE_KEY,JSON.stringify(r))}static \u0275fac=function(a){return new(a||i)};static \u0275prov=m({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();export{E as a};