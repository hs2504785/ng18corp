import{a as S}from"./chunk-LA4QEO6T.js";import{k as P}from"./chunk-WIPSOZN2.js";import{Ca as i,Oa as s,Ob as x,Sa as p,Tb as h,Va as u,Ya as n,Za as o,_ as a,_a as m,bb as g,ca as l,ib as c,jb as r,kb as f,mb as v}from"./chunk-OGYDBGRP.js";function C(t,y){if(t&1&&(n(0,"div",0)(1,"div",1)(2,"div",2),m(3,"img",3),o(),n(4,"div",4)(5,"h4"),c(6),o(),n(7,"span"),c(8),o(),n(9,"p"),c(10),o(),n(11,"div",5),c(12),o()()()()),t&2){let e=g();i(3),p("ngSrc",e.selectedProduct().image),i(3),r(e.selectedProduct().title),i(2),r(e.selectedProduct().category),i(2),r(e.selectedProduct().description),i(2),f(" ",e.selectedProduct().price,"$ ")}}var F=(()=>{class t{route=a(P);sub;productService=a(S);selectedProduct=this.productService.selectedProduct;ngOnInit(){this.sub=this.productService.fetchProducts().subscribe(()=>{let e=this.route.snapshot.paramMap.get("id");this.productService.selectProduct(e)})}ngOnDestroy(){this.sub?.unsubscribe()}static \u0275fac=function(d){return new(d||t)};static \u0275cmp=l({type:t,selectors:[["app-product-detail"]],standalone:!0,features:[v],decls:1,vars:1,consts:[[1,"card","card-body"],["tabindex","0",1,"col-lg-6","product-item"],[1,"product","d-flex","align-items-start"],["width","150","height","150","alt","product image",1,"img-fluid",3,"ngSrc"],[1,"product-info"],[1,"badge","bg-info","mt-auto","align-self-start"]],template:function(d,b){d&1&&s(0,C,13,5,"div",0),d&2&&u(b.selectedProduct()?0:-1)},dependencies:[x,h],changeDetection:0})}return t})();export{F as ProductDetailComponent};
