import{a as _,t as m,d as i,c,g as v,b}from"../chunks/disclose-version.Dd1ZGuiJ.js";import{F as h,a as $,h as x,U as f,f as p,m as I,r as y,p as E,l as N}from"../chunks/runtime.C8x5QdD1.js";import{i as U}from"../chunks/lifecycle.DNtaPzEe.js";import{n as a}from"../chunks/utils.BSJX-nVd.js";import{s as k}from"../chunks/entry.exXq182-.js";function w(s,t,r){if(s==null)return t(void 0),r&&r(void 0),a;const e=s.subscribe(t,r);return e.unsubscribe?()=>e.unsubscribe():e}function A(s,t,r){let e=r[t];const n=e===void 0;n&&(e={store:null,last_value:null,value:I(f),unsubscribe:a},r[t]=e),(n||e.store!==s)&&(e.unsubscribe(),e.store=s??null,e.unsubscribe=D(s,e.value));const u=x(e.value);return u===f?e.last_value:u}function D(s,t){return s==null?(p(t,void 0),a):w(s,r=>p(t,r))}function F(s){L(()=>{let t;for(t in s)s[t].unsubscribe()})}function L(s){h(()=>()=>$(s))}const S=()=>{const s=k;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},T={subscribe(s){return S().page.subscribe(s)}};var Z=m("<h1> </h1> <p> </p>",1);function G(s,t){N(t,!1);const r={};F(r);const e=()=>A(T,"$page",r);U();var n=Z(),u=v(n),l=c(u),g=b(b(u,!0)),d=c(g);y(()=>{var o;i(l,e().status),i(d,(o=e().error)==null?void 0:o.message)}),_(s,n),E()}export{G as component};
