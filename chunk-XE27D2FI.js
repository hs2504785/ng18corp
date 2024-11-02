import{a as F}from"./chunk-LA4QEO6T.js";import{m as D}from"./chunk-WIPSOZN2.js";import{$a as b,Ca as r,Ob as E,Sa as x,Tb as T,Wa as O,Xa as h,Ya as i,Za as c,_ as P,_a as v,ab as g,bb as m,c as C,ca as M,fa as f,ib as a,jb as _,kb as y,la as l,ma as u,mb as w,nb as S,ob as k}from"./chunk-OGYDBGRP.js";var I=(()=>{class n{transform(t,e=250,o="..."){return t.length>e?t.substring(0,e)+o:t}static \u0275fac=function(e){return new(e||n)};static \u0275pipe=f({name:"seeAll",type:n,pure:!0,standalone:!0})}return n})();var V=(n,s)=>s.id;function $(n,s){if(n&1){let t=b();i(0,"div",4),g("click",function(){let o=l(t).$implicit,p=m();return u(p.goToDetails(o))}),i(1,"div",5)(2,"div",6),v(3,"img",7),c(),i(4,"div",8)(5,"h4"),a(6),c(),i(7,"span"),a(8),c(),i(9,"p"),a(10),S(11,"seeAll"),c(),i(12,"div",9)(13,"div",10),a(14),c(),i(15,"i",11),g("click",function(o){let p=l(t).$implicit,d=m();return u(d.openEditModal(o,p))}),c(),i(16,"i",12),g("click",function(o){let p=l(t).$implicit,d=m();return u(d.deleteProduct(o,p.id))}),c()()()()()}if(n&2){let t=s.$implicit;r(3),x("ngSrc",t.image),r(3),_(t.title),r(2),_(t.category),r(2),_(k(11,5,t.description)),r(4),y("",t.price,"$")}}function j(n,s){n&1&&(i(0,"div",3),a(1,"There are no items."),c())}var K=(()=>{class n{productService=P(F);router=P(D);products=this.productService.products;sub;ngOnInit(){this.sub=this.productService.fetchProducts().subscribe()}goToDetails(t){this.productService.selectProduct(t.id),this.router.navigate(["products",t.id,"detail"])}deleteProduct(t,e){t.stopImmediatePropagation();let o=this.productService.deleteProduct(e).subscribe(()=>{o.unsubscribe()})}openEditModal(t,e){return C(this,null,function*(){t.stopImmediatePropagation();let p=(yield this.productService.openDialog(e)).closed.subscribe({next:d=>{},complete:()=>{}})})}ngOnDestroy(){this.sub?.unsubscribe()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=M({type:n,selectors:[["app-product-list"]],standalone:!0,features:[w],decls:5,vars:1,consts:[[1,"container","products"],[1,"row","gy-4"],[1,"col-lg-6","product-item"],[1,"alert","alert-info"],[1,"col-lg-6","product-item",3,"click"],[1,"product","d-flex","align-items-start"],[1,"pic"],["width","150","height","150","alt","product image",1,"img-fluid",3,"ngSrc"],[1,"product-info"],[1,"product-footer","mt-auto","align-self-start","d-flex","w-100"],[1,"badge","bg-secondary"],[1,"bi","bi-pencil","cursor-pointer","text-primary","ms-auto","icon",3,"click"],[1,"bi","bi-trash3","ms-3","cursor-pointer","text-danger","icon",3,"click"]],template:function(e,o){e&1&&(i(0,"div",0)(1,"div",1),O(2,$,17,7,"div",2,V,!1,j,2,0,"div",3),c()()),e&2&&(r(2),h(o.products()))},dependencies:[E,T,I],styles:['.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]{background-color:var(--surface-color);box-shadow:0 2px 15px #0000001a;position:relative;border-radius:5px;transition:.5s;padding:30px;height:100%}.product-item[_ngcontent-%COMP%]{cursor:pointer}.product-item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{display:none}.product-item[_ngcontent-%COMP%]:hover   .icon[_ngcontent-%COMP%]{display:inline}@media (max-width: 468px){.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]{flex-direction:column;justify-content:center!important;align-items:center!important}}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .pic[_ngcontent-%COMP%]{overflow:hidden;flex-shrink:0}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .pic[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:ease-in-out .3s}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]:hover{transform:translateY(-10px)}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-left:30px;height:100%;gap:6px;width:100%}@media (max-width: 468px){.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]{padding:30px 0 0;text-align:center}}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-weight:700;margin-bottom:5px;font-size:20px}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;font-size:15px;padding-bottom:10px;position:relative;font-weight:500}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{content:"";position:absolute;display:block;width:50px;height:1px;background:color-mix(in srgb,var(--default-color),transparent 85%);bottom:0;left:0}@media (max-width: 468px){.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{left:calc(50% - 25px)}}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:10px 0 0;font-size:14px}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]{margin-top:12px;display:flex;align-items:center;justify-content:start;width:100%}@media (max-width: 468px){.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]{justify-content:center}}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--default-color),transparent 94%);transition:ease-in-out .3s;display:flex;align-items:center;justify-content:center;border-radius:50px;width:36px;height:36px}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:color-mix(in srgb,var(--default-color),transparent 20%);font-size:16px;margin:0 2px}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:var(--accent-color)}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{color:var(--contrast-color)}.products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] + a[_ngcontent-%COMP%]{margin-left:8px}'],changeDetection:0})}return n})();export{K as a};
