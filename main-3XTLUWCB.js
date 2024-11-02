import{a as u,b as N}from"./chunk-6WOHIUOL.js";import{a as k,c as f,d as E,e as C,f as y,g as M,h as z,i as L,j as D,l as H,m as V,n as j,o as T,p as R,q as h}from"./chunk-WIPSOZN2.js";import{I as v,Ob as c,Q as w,U as p,Ya as r,Za as t,_ as d,_a as a,ca as l,ib as o,m as x,mb as m,vb as S}from"./chunk-OGYDBGRP.js";var G=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=l({type:e,selectors:[["app-dashboard"]],standalone:!0,features:[m],decls:7,vars:0,consts:[["id","hero",1,"hero","section","light-background"],[1,"container","position-relative"],["data-aos","fade-down","data-aos-delay","100",1,"welcome","position-relative"]],template:function(n,s){n&1&&(r(0,"section",0)(1,"div",1)(2,"div",2)(3,"h2"),o(4,"WELCOME TO ROCHLAB"),t(),r(5,"p"),o(6,"We develop web applications for your business"),t()()()())},dependencies:[c],changeDetection:0})}return e})();var I=[{path:"users",loadComponent:()=>import("./chunk-BWTRDSS7.js").then(e=>e.UsersComponent)},{path:"products",loadChildren:()=>import("./chunk-VJ4IKC5A.js").then(e=>e.PRODUCT_ROUTES)},{path:"categories",loadComponent:()=>import("./chunk-PPLTFCUG.js").then(e=>e.CategoriesComponent)},{path:"",component:G,pathMatch:"full"}];var A={production:!0,API_URL:"https://fakestoreapi.com"};var _=(()=>{class e{loaderService=d(u);requests=[];isUploadRequest(i){return i.body instanceof FormData}removeRequest(i){let n=this.requests.indexOf(i);n>=0&&this.requests.splice(n,1),this.requests.length===0&&this.loaderService.hide()}intercept(i,n){return this.isUploadRequest(i)||(this.requests.push(i),this.loaderService.show()),n.handle(i).pipe(v(()=>{this.removeRequest(i)}))}static \u0275fac=function(n){return new(n||e)};static \u0275prov=p({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var F=(()=>{class e{cache=new Map;intercept(i,n){if(this.isRequestCachable(i)){let s=this.cache.get(i.url);return s?x(s):n.handle(i).pipe(w(b=>{b instanceof k&&this.cache.set(i.url,b)}))}else return n.handle(i)}isRequestCachable(i){return i.method==="GET"}static \u0275fac=function(n){return new(n||e)};static \u0275prov=p({token:e,factory:e.\u0275fac})}return e})();var B=[{provide:f,useClass:F,multi:!0},{provide:f,useClass:_,multi:!0}];var O={providers:[S({eventCoalescing:!0}),B,E(C([])),R(I),{provide:"ENV_CONFIG",useValue:A}]};var U=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=l({type:e,selectors:[["app-header"]],standalone:!0,features:[m],decls:66,vars:0,consts:[["id","header",1,"header","sticky-top"],[1,"branding","d-flex","align-items-center"],[1,"container","position-relative","d-flex","align-items-center","justify-content-between"],["href","index.html",1,"logo","d-flex","align-items-center"],[1,"sitename"],["id","navmenu",1,"navmenu"],["routerLink","/"],["routerLink","/users","routerLinkActive","active"],["routerLink","/products","routerLinkActive","active"],["routerLink","/categories","routerLinkActive","active"],[1,"dropdown"],["href","#"],[1,"bi","bi-chevron-down","toggle-dropdown"],["href","#contact"],[1,"mobile-nav-toggle","d-xl-none","bi","bi-list"],["href","#appointment",1,"cta-btn","d-none","d-sm-block"]],template:function(n,s){n&1&&(r(0,"header",0)(1,"div",1)(2,"div",2)(3,"a",3)(4,"h1",4),o(5,"ROCH CORP"),t()(),r(6,"nav",5)(7,"ul")(8,"li")(9,"a",6),o(10,"Home"),a(11,"br"),t()(),r(12,"li")(13,"a",7),o(14,"Users"),t()(),r(15,"li")(16,"a",8),o(17,"Products"),t()(),r(18,"li")(19,"a",9),o(20,"Categories"),t()(),r(21,"li",10)(22,"a",11)(23,"span"),o(24,"Dropdown"),t(),a(25,"i",12),t(),r(26,"ul")(27,"li")(28,"a",11),o(29,"Dropdown 1"),t()(),r(30,"li",10)(31,"a",11)(32,"span"),o(33,"Deep Dropdown"),t(),a(34,"i",12),t(),r(35,"ul")(36,"li")(37,"a",11),o(38,"Deep Dropdown 1"),t()(),r(39,"li")(40,"a",11),o(41,"Deep Dropdown 2"),t()(),r(42,"li")(43,"a",11),o(44,"Deep Dropdown 3"),t()(),r(45,"li")(46,"a",11),o(47,"Deep Dropdown 4"),t()(),r(48,"li")(49,"a",11),o(50,"Deep Dropdown 5"),t()()()(),r(51,"li")(52,"a",11),o(53,"Dropdown 2"),t()(),r(54,"li")(55,"a",11),o(56,"Dropdown 3"),t()(),r(57,"li")(58,"a",11),o(59,"Dropdown 4"),t()()()(),r(60,"li")(61,"a",13),o(62,"Contact"),t()()(),a(63,"i",14),t(),r(64,"a",15),o(65,"Make an Appointment"),t()()()())},dependencies:[c,h,j,T]})}return e})();var W=(()=>{class e{router=d(V);loaderService=d(u);title="rochlab";sub;ngOnInit(){this.initRouteEvents()}initRouteEvents(){let i=this.router.events.subscribe(n=>{switch(!0){case n instanceof M:{this.loaderService.show();break}case n instanceof z:{this.loaderService.hide();break}case n instanceof L:case n instanceof D:{this.loaderService.hide();break}default:break}});this.sub?.add(i)}ngOnDestroy(){this.sub?.unsubscribe()}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=l({type:e,selectors:[["app-root"]],standalone:!0,features:[m],decls:5,vars:0,consts:[[1,"main"],[1,"section"]],template:function(n,s){n&1&&(a(0,"lib-loader")(1,"app-header"),r(2,"main",0)(3,"section",1),a(4,"router-outlet"),t()())},dependencies:[h,H,U,N]})}return e})();y(W,O).catch(e=>console.error(e));
