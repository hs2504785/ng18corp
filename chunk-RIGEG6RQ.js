import{a as E}from"./chunk-7HOUL5AY.js";import{d as _,e as N,f as k}from"./chunk-33FNBRGN.js";import{b as m,d as y,e as D,g as C,k as T,l as F,m as P}from"./chunk-3SXWJEDT.js";import"./chunk-ACQHMWX4.js";import{o as S}from"./chunk-MXAHYXZS.js";import{$ as f,Ea as i,Va as o,X as a,bb as n,cb as l,db as s,fb as c,pb as g,rb as v,tb as h}from"./chunk-EMGZUWUL.js";import{a as p,b}from"./chunk-ECBXVGWK.js";var R=(()=>{class d{activeDialog=a(P);toastService=a(k);fb=a(T);productService=a(E);form;isSubmitting=!1;sub;data;constructor(){this.createForm()}ngOnInit(){this.data&&this.form.patchValue(this.data)}createForm(){this.form=this.fb.group({title:["",[m.required]],category:[""],description:[""],price:["",[m.required]]})}onFormSubmit(){this.isSubmitting=!0;let r=this.data?this.productService.update(this.data.id,b(p({},this.form.value),{image:this.data.image})):this.productService.create(this.form.value),e=this.data?"Product updated successfully":"Product added successfully";this.subscribeToService(r,e)}subscribeToService(r,e){let t=r.subscribe({next:u=>{this.isSubmitting=!1,this.toastService.success(e),this.activeDialog.close()},error:()=>{},complete:()=>{this.isSubmitting=!1,this.activeDialog.close()}});this.sub?.add(t)}ngOnDestroy(){this.sub?.unsubscribe()}static \u0275fac=function(e){return new(e||d)};static \u0275cmp=f({type:d,selectors:[["app-product-dialog"]],inputs:{data:"data"},standalone:!0,features:[h],decls:12,vars:11,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title"],["type","button","aria-label","Close",1,"btn-close",3,"click"],[1,"modal-body"],["id","productForm",3,"submit","formGroup"],["controlName","title","label","Title","placeholder","Enter title",1,"d-block","mb-4",3,"control"],["controlName","category","label","Category","placeholder","Enter category",1,"d-block","mb-4",3,"control"],["controlName","description","label","Description","placeholder","Enter description",1,"d-block","mb-4",3,"control"],["controlName","price","label","Price","placeholder","Enter price",1,"d-block","mb-4",3,"control","type"],[1,"modal-footer"],["formName","productForm",3,"isSubmitting","isInvalid","submitText","submitingText"]],template:function(e,t){e&1&&(n(0,"div",0)(1,"h4",1),g(2),l(),n(3,"button",2),c("click",function(){return t.activeDialog.dismiss("Cross click")}),l()(),n(4,"div",3)(5,"form",4),c("submit",function(){return t.onFormSubmit()}),s(6,"lib-textfield",5)(7,"lib-textfield",6)(8,"lib-textfield",7)(9,"lib-textfield",8),l()(),n(10,"div",9),s(11,"lib-submit",10),l()),e&2&&(i(2),v(" ",t.data!=null&&t.data.id?"Update Product":"Add Product"," "),i(3),o("formGroup",t.form),i(),o("control",t.form.get("title")),i(),o("control",t.form.get("category")),i(),o("control",t.form.get("description")),i(),o("control",t.form.get("price"))("type","number"),i(2),o("isSubmitting",t.isSubmitting)("isInvalid",t.form.invalid)("submitText",t.data!=null&&t.data.id?"Update product":"Save product")("submitingText",t.data!=null&&t.data.id?"Updating product":"Saving product"))},dependencies:[S,F,D,y,C,_,N],changeDetection:0})}return d})();export{R as ProductDialogComponent};
