import{b as h}from"./chunk-UIRTTB7X.js";import{m as f}from"./chunk-UKIQVSM2.js";import{Fb as u,Ka as o,Q as s,U as n,Z as p,_ as c,c as d,m as l}from"./chunk-KKKSGTYD.js";var S=(()=>{class i{http;envConfig;BASE_URL;constructor(t,e){this.http=t,this.envConfig=e,this.BASE_URL=this.envConfig.API_URL}getAll(t){return this.http.get(`${this.BASE_URL}/${t}`)}getById(t,e){return this.http.get(`${this.BASE_URL}/${t}/${e}`)}create(t,e){return this.http.post(`${this.BASE_URL}/${t}`,e)}update(t,e,r){return this.http.put(`${this.BASE_URL}/${t}/${e}`,r)}delete(t,e){return this.http.delete(`${this.BASE_URL}/${t}/${e}`)}static \u0275fac=function(e){return new(e||i)(p(h),p("ENV_CONFIG"))};static \u0275prov=n({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var g=(()=>{class i{entitiesSignal=o([]);get entities(){return this.entitiesSignal.asReadonly()}setEntities(t){this.entitiesSignal.set(t)}addEntity(t){this.entitiesSignal.update(e=>[t,...e])}updateEntity(t,e){this.entitiesSignal.update(r=>r.map(a=>e(a)?t:a))}removeEntity(t){this.entitiesSignal.update(e=>e.filter(r=>!t(r)))}static \u0275fac=function(e){return new(e||i)};static \u0275prov=n({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var C=(()=>{class i{ngbModal=c(f);apiService=c(S);signalStateService=c(g);apiUrl="products";isLoaded=o(!1);selectedProductId=o(null);selectedProduct=u(()=>{let t=this.selectedProductId();return t?this.products().find(e=>e.id===+t):null});get products(){return this.signalStateService.entities}fetchProducts(){return this.isLoaded()?l(this.products()):this.apiService.getAll(this.apiUrl).pipe(s(t=>{this.isLoaded.set(!0),this.signalStateService.setEntities(t)}))}addProduct(t){return t.image="https://picsum.photos/150/150",this.apiService.create(this.apiUrl,t).pipe(s(e=>{this.signalStateService.addEntity(e)}))}updateProduct(t,e){return this.apiService.update(this.apiUrl,t,e).pipe(s(r=>{this.signalStateService.updateEntity(r,a=>a.id===t)}))}deleteProduct(t){return this.apiService.delete(this.apiUrl,t).pipe(s(()=>{this.signalStateService.removeEntity(e=>e.id===t)}))}selectProduct(t){this.selectedProductId.set(t)}clearSelection(){this.selectedProductId.set(null)}openDialog(t){return d(this,null,function*(){let{ProductDialogComponent:e}=yield import("./chunk-YJBD2NYA.js"),r=this.ngbModal.open(e,{centered:!0,scrollable:!0,size:"md",windowClass:"product-dialog"});return t&&(r.componentInstance.data=t),r})}static \u0275fac=function(e){return new(e||i)};static \u0275prov=n({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();export{C as a};
