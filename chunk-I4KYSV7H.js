import{a as c}from"./chunk-GYLSAXBF.js";import"./chunk-4OQCCSJR.js";import"./chunk-NGIY3FYG.js";import{k as a}from"./chunk-CBF5JCVE.js";import"./chunk-YIKHP2JD.js";import{R as n,W as o,j as s}from"./chunk-FMHGYVMK.js";import"./chunk-2VMXMS7J.js";var m=(()=>{class e{userService;route;constructor(t,r){this.userService=t,this.route=r}resolve(t,r){let p=t.paramMap.get("id"),i=t.data.user;return i?s(i):this.userService.getUser(p)}static \u0275fac=function(r){return new(r||e)(o(c),o(a))};static \u0275prov=n({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var R=[{path:":id/detail",loadComponent:()=>import("./chunk-DNTRGJFE.js").then(e=>e.UserDetailComponent),resolve:{user:m}},{path:"",loadComponent:()=>import("./chunk-LEAB6YTZ.js").then(e=>e.UserListComponent)}];export{R as USER_ROUTES};
