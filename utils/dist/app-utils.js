System.register(["rxjs"],(function(e,t){var r={};return{setters:[function(e){r.BehaviorSubject=e.BehaviorSubject,r.Subject=e.Subject}],execute:function(){e((()=>{var e={722:(e,t,r)=>{const o=r(905).R;t.s=function(e){if(e||(e=1),!r.y.meta||!r.y.meta.url)throw console.error("__system_context__",r.y),Error("systemjs-webpack-interop was provided an unknown SystemJS context. Expected context.meta.url, but none was provided");r.p=o(r.y.meta.url,e)}},905:(e,t,r)=>{t.R=function(e,t){var r=document.createElement("a");r.href=e;for(var o="/"===r.pathname[0]?r.pathname:"/"+r.pathname,n=0,a=o.length;n!==t&&a>=0;)"/"===o[--a]&&n++;if(n!==t)throw Error("systemjs-webpack-interop: rootDirectoryLevel ("+t+") is greater than the number of directories ("+n+") in the URL path "+e);var u=o.slice(0,a+1);return r.protocol+"//"+r.host+u};Number.isInteger},792:e=>{"use strict";e.exports=r}},o={};function n(t){var r=o[t];if(void 0!==r)return r.exports;var a=o[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.y=t,n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var a={};return(0,n(722).s)(1),(()=>{"use strict";n.r(a),n.d(a,{currentState:()=>u,globalState:()=>o,obj:()=>r,pubSub:()=>t,publicApiFunction:()=>c});var e=n(792),t={angular:[],react:[],commonData:{commonData:new e.Subject,subCommonData:function(){return this.commonData.asObservable()},pubCommonData:function(e,r){console.log(e),"react"===r?t.react.push({value:e,fn:this.commonData.next(e)}):t.angular.push({value:e,fn:this.commonData.next(e)})}}},r={name:"",token:""},o=new e.BehaviorSubject({name:"",token:""}),u=o.getValue();function c(e){console.log(e)}})(),a})())}}}));
//# sourceMappingURL=app-utils.js.map