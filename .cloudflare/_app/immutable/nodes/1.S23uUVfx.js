import{a as d,t as _,c as i,f as v,s as c}from"../chunks/disclose-version.BD2IXOaX.js";import{y as h,d as $,g as x,U as b,b as f,m as y,r as I,p as E,a as N}from"../chunks/runtime.KHPTfT0h.js";import{s as p}from"../chunks/render.CR8dV1-2.js";import{i as U}from"../chunks/lifecycle.DBI0busB.js";import{n as a}from"../chunks/utils.BSJX-nVd.js";import{s as k}from"../chunks/entry.QeZtfDwZ.js";function w(s,t,r){if(s==null)return t(void 0),r&&r(void 0),a;const e=s.subscribe(t,r);return e.unsubscribe?()=>e.unsubscribe():e}function A(s,t,r){let e=r[t];const n=e===void 0;n&&(e={store:null,last_value:null,value:y(b),unsubscribe:a},r[t]=e),(n||e.store!==s)&&(e.unsubscribe(),e.store=s??null,e.unsubscribe=D(s,e.value));const u=x(e.value);return u===b?e.last_value:u}function D(s,t){return s==null?(f(t,void 0),a):w(s,r=>f(t,r))}function L(s){S(()=>{let t;for(t in s)s[t].unsubscribe()})}function S(s){h(()=>()=>$(s))}const T=()=>{const s=k;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},Z={subscribe(s){return T().page.subscribe(s)}};var j=_("<h1> </h1> <p> </p>",1);function H(s,t){N(t,!1);const r={};L(r);const e=()=>A(Z,"$page",r);U();var n=j(),u=v(n),l=i(u),g=c(c(u,!0)),m=i(g);I(()=>{var o;p(l,e().status),p(m,(o=e().error)==null?void 0:o.message)}),d(s,n),E()}export{H as component};
