import{a as F}from"./chunk-3GAL2WWF.js";import{j as V}from"./chunk-33FNBRGN.js";import"./chunk-3SXWJEDT.js";import{n as T}from"./chunk-ACQHMWX4.js";import{o as I}from"./chunk-MXAHYXZS.js";import{$ as y,$a as g,Ba as E,Ea as a,Ra as C,Va as x,X as S,Za as v,ab as h,bb as n,cb as e,db as k,eb as b,fb as u,gb as l,ia as s,ja as p,pb as i,qb as _,rb as f,tb as w}from"./chunk-EMGZUWUL.js";import"./chunk-ECBXVGWK.js";var $=(r,c)=>c.id;function j(r,c){if(r&1){let t=b();n(0,"button",4),u("click",function(){s(t);let o=l();return p(o.clearCart())}),i(1," Clear Cart "),e()}}function q(r,c){r&1&&(n(0,"lib-empty-screen")(1,"h5"),i(2,"Your cart is empty"),e(),n(3,"div",5)(4,"a",6),i(5," Continue Shopping "),e()()())}function A(r,c){if(r&1){let t=b();n(0,"div",10)(1,"div",16),k(2,"img",17),e(),n(3,"div",18)(4,"h5",19),i(5),e(),n(6,"p",20),i(7),e(),n(8,"div",21)(9,"button",22),u("click",function(){let o=s(t).$implicit,d=l(2);return p(d.updateQuantity(o.productId,o.quantity-1))}),i(10," - "),e(),n(11,"span",23),i(12),e(),n(13,"button",24),u("click",function(){let o=s(t).$implicit,d=l(2);return p(d.updateQuantity(o.productId,o.quantity+1))}),i(14," + "),e(),n(15,"button",25),u("click",function(){let o=s(t).$implicit,d=l(2);return p(d.removeFromCart(o.productId))}),i(16," Remove "),e()()()()}if(r&2){let t=c.$implicit;a(2),x("src",t.image,E),a(3),_(t.title),a(2),f("$",t.price,""),a(2),x("disabled",t.quantity<=1),a(3),_(t.quantity)}}function D(r,c){if(r&1&&(n(0,"div",3)(1,"div",7)(2,"div",8)(3,"div",9),g(4,A,17,5,"div",10,$),e()()(),n(6,"div",11)(7,"div",8)(8,"div",9)(9,"h5",12),i(10,"Order Summary"),e(),n(11,"div",13)(12,"span"),i(13,"Items:"),e(),n(14,"span"),i(15),e()(),n(16,"div",14)(17,"span"),i(18,"Total Amount:"),e(),n(19,"span"),i(20),e()(),n(21,"button",15),i(22,"Proceed to Checkout"),e()()()()()),r&2){let t=l();a(4),h(t.cartItems()),a(11),_(t.totalItems()),a(5),f("$",t.totalAmount(),"")}}var Y=(()=>{class r{cartService=S(F);cartItems=this.cartService.cartItems;totalItems=this.cartService.totalItems;totalAmount=this.cartService.totalAmount;updateQuantity(t,m){this.cartService.updateQuantity(t,m)}removeFromCart(t){this.cartService.removeFromCart(t)}clearCart(){this.cartService.clearCart()}static \u0275fac=function(m){return new(m||r)};static \u0275cmp=y({type:r,selectors:[["app-cart"]],standalone:!0,features:[w],decls:7,vars:2,consts:[[1,"container","my-4"],[1,"d-flex","justify-content-between","align-items-center","mb-4"],[1,"btn","btn-outline-danger"],[1,"row"],[1,"btn","btn-outline-danger",3,"click"],[1,"action-buttons"],["routerLink","/products",1,"btn","btn-primary"],[1,"col-md-8"],[1,"card"],[1,"card-body"],[1,"d-flex","mb-4","align-items-center"],[1,"col-md-4"],[1,"card-title"],[1,"d-flex","justify-content-between","mb-2"],[1,"d-flex","justify-content-between","mb-3"],[1,"btn","btn-primary","w-100"],[1,"flex-shrink-0"],["alt","product",1,"img-fluid",2,"width","100px",3,"src"],[1,"flex-grow-1","ms-3"],[1,"mb-1"],[1,"mb-0","text-muted"],[1,"d-flex","align-items-center","mt-2"],[1,"btn","btn-sm","btn-outline-secondary",3,"click","disabled"],[1,"mx-2"],[1,"btn","btn-sm","btn-outline-secondary",3,"click"],[1,"btn","btn-sm","btn-link","text-danger","ms-auto",3,"click"]],template:function(m,o){m&1&&(n(0,"div",0)(1,"div",1)(2,"h3"),i(3,"Shopping Cart"),e(),C(4,j,2,0,"button",2),e(),C(5,q,6,0,"lib-empty-screen")(6,D,23,2,"div",3),e()),m&2&&(a(4),v(o.totalItems()>0?4:-1),a(),v(o.cartItems().length===0?5:6))},dependencies:[I,T,V],encapsulation:2,changeDetection:0})}return r})();export{Y as CartComponent};
