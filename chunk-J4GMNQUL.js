import{l as _}from"./chunk-UKIQVSM2.js";import{$a as t,Aa as f,Da as i,Ta as u,Wb as v,_ as d,ab as n,bb as r,ca as p,db as a,mb as c,nb as b,ob as s,qb as C}from"./chunk-KKKSGTYD.js";var S=(()=>{class o{activeModal=d(_);iconUrl;title="";desc="";btnClassType="";btnText="Delete";icon="";fromEditCustomApi=!1;cancelVal="Cancel";ngOnInit(){this?.icon?this.iconUrl=this.icon:this.iconUrl="assets/svg-icons/trash.svg"}static \u0275fac=function(l){return new(l||o)};static \u0275cmp=p({type:o,selectors:[["lib-confirm-delete"]],inputs:{title:"title",desc:"desc",btnClassType:"btnClassType",btnText:"btnText",icon:"icon",fromEditCustomApi:"fromEditCustomApi"},standalone:!0,features:[C],decls:12,vars:4,consts:[[1,"modal-header"],[1,"bi","bi-trash"],[1,"btn-close",3,"click"],[1,"modal-body"],[1,"modal-title","mb-2"],[3,"innerHTML"],[1,"modal-footer","d-flex","justify-content-between"],["type","button",1,"btn","btn-link","ms-auto",3,"click"],["ngbAutoFocus","",1,"btn","btn-danger",3,"click"]],template:function(l,e){l&1&&(t(0,"div",0),r(1,"i",1),t(2,"i",2),a("click",function(){return e.activeModal.dismiss()}),n()(),t(3,"div",3)(4,"h4",4),c(5),n(),r(6,"div",5),n(),t(7,"div",6)(8,"button",7),a("click",function(){return e.activeModal.close(!1)}),c(9),n(),t(10,"button",8),a("click",function(){return e.activeModal.close(!0)}),c(11),n()()),l&2&&(i(5),b(e.title),i(),u("innerHTML",e.desc,f),i(3),s(" ",e.cancelVal," "),i(2),s(" ",e.btnText," "))},dependencies:[v],changeDetection:0})}return o})();export{S as a};
