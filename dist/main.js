module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("@emotion/hash")},function(e,t){e.exports=require("lodash.kebabcase")},function(e,t){e.exports=require("isomorphic-dompurify")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("react-inlinesvg")},function(e,t,n){"use strict";n.r(t),n.d(t,"Editmode",(function(){return S})),n.d(t,"Chunk",(function(){return x})),n.d(t,"ChunkCollection",(function(){return M})),n.d(t,"ChunkFieldValue",(function(){return J})),n.d(t,"useChunk",(function(){return P})),n.d(t,"useGetChunk",(function(){return q})),n.d(t,"useCollectionChunks",(function(){return z})),n.d(t,"CustomChunkCollection",(function(){return Z})),n.d(t,"ChunkCollectionContext",(function(){return I})),n.d(t,"CollectionItemWrapper",(function(){return F}));var r=n(0),o=n.n(r);const c=Object(r.createContext)({branch:null,projectId:null,defaultChunks:[]}),i=()=>"undefined"!=typeof window,a=e=>{if(i())return localStorage.getItem(e)},u=(e,t)=>{i()&&localStorage.setItem(e,JSON.stringify(t))};var l=n(1),s=n.n(l),d=n(2),f=n.n(d);var p=n(3),h=n.n(p);function m(e,t){return e=e?`${e} ${t}`:t}var b=n(4);const y=n.n(b).a.create({baseURL:"https://api2.editmode.com/",headers:{Accept:"application/json",referrer:"undefined"!=typeof window?window.location.href:""}});var v=n(5),g=n.n(v);function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var j=function(e,t){var n=((e,t)=>{const n=h.a.sanitize(e.content),r={...e,content:n},o=(r.content.match(/\{{(.*?)\}}/g)||[]).map(e=>e.substr(2,e.length-4));let c=r.content;return o&&o.forEach((function(e){const n=t.variables&&t.variables[e]||"",r=`<em-var data-chunk-variable="${e}" data-chunk-variable-value="${n}">${n}</em-var>`;c=c.replace(`{{${e}}}`,r)})),{chunk:r,parsedChunk:c}})(e,t),r=n.chunk,c=n.parsedChunk,i=t.transformation;i&&"image"==r.chunk_type&&(r.content=((e,t)=>{try{t=t.trim().replace(/\s+/g," ").replace(" ",",");let n=new URL(e);return n.searchParams.append("tr",t),n.toString()}catch(t){return console.warn(t),e}})(r.content,i));var a={"data-chunk":r.identifier,"data-chunk-editable":!0,"data-chunk-content-key":r.content_key,"data-chunk-type":r.chunk_type,key:r.identifier,class:t.className};switch(r.chunk_type){case"single_line_text":case"long_text":return o.a.createElement("em-span",O({},a,{dangerouslySetInnerHTML:{__html:c}},t));case"rich_text":return o.a.createElement("em-span",O({},a,{dangerouslySetInnerHTML:{__html:c}},t,{class:"editmode-richtext-editor "+t.className}));case"image":return null!=r.content.match(/\.(svg)/)?o.a.createElement(g.a,O({},a,{src:r.content,"data-chunk-editable":!1,alt:"",wrapper:"svg"},t)):r.content?o.a.createElement("img",O({},a,{src:r.content,"data-chunk-editable":!1,alt:""},t)):o.a.createElement("svg",O({},a,{"data-chunk-editable":!1,fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},t),o.a.createElement("path",{"fill-rule":"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z","clip-rule":"evenodd"}));default:return o.a.createElement("span",t,c)}};var w={zIndex:9999,bottom:8,right:8,position:"fixed",opacity:1,display:"flex",alignItems:"center",background:"rgba(255,255,255, 0.9)",cursor:"pointer",borderRadius:5,padding:"2px 5px 2px 2px",boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"};function k(e){var t=e.projectId;return o.a.createElement("div",{style:w,onClick:function(){return window.open("https://editmode.com?ref=pb&pid=".concat(t))}},o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25",height:"25",viewBox:"0 0 548 532",version:"1.1",fill:"currentColor"},o.a.createElement("g",{id:"Page-2",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},o.a.createElement("g",{id:"Group-2-Copy",fill:"#02164B",fillRule:"nonzero"},o.a.createElement("path",{d:"M355.57238,93.227099 C421.07938,126.760445 463.228656,200.366589 458.662484,275.197013 C456.789183,321.18219 437.646387,365.465318 406.824729,398.879222 C371.729602,436.503458 321.735878,458.271766 270.922584,458.988418 C203.22031,459.764791 137.596229,421.453764 104.754918,360.956382 C83.2997657,322.496052 75.4553171,276.928922 82.5387371,233.302725 C89.0952911,193.767417 107.828303,156.501508 135.840009,128.343052 C167.861751,95.3770553 211.620895,75.6989829 256.902096,72.4143274 C290.88495,70.1150686 325.248318,77.4308922 355.57238,93.227099 Z M302.597364,108.707879 C244.580186,94.7144282 181.478422,121.295874 147.91428,172.136709 C125.753716,204.951046 116.495656,247.175826 123.079165,286.681355 C127.575938,318.48743 142.800303,348.796389 164.461226,371.680876 C195.556552,404.281339 240.406711,421.818983 284.492713,417.297082 C306.976574,415.738859 326.903446,407.153357 347.094835,397.529041 C333.927816,397.406827 321.113485,400.462166 307.975856,399.881651 C293.691992,399.33169 279.114221,397.284614 265.565123,392.487732 C232.823919,381.213532 204.168018,358.573473 185.916413,328.020087 C170.074843,302.721883 162.668395,271.465768 167.841152,241.52345 C172.896347,214.850343 187.297774,190.224314 208.429665,174.061573 C244.874093,144.791428 299.77586,145.463603 335.750037,175.344815 C370.842495,203.117843 385.273313,253.25595 370.783713,296.550099 C362.524936,322.978778 344.831754,343.357887 322.553628,358.145726 C342.069031,355.12094 360.261854,348.643622 375.985862,336.025074 C406.7285,312.315646 423.275446,271.129681 418.043907,231.715813 C408.727065,170.822914 360.320636,120.89868 302.597364,108.707879 Z M322.507627,229.728263 C308.735553,203.164192 276.64924,189.629307 248.46453,198.136949 C218.823998,206.287627 198.529842,236.927037 201.907349,268.072146 C204.498711,292.375445 220.017772,314.804683 242.932407,323.074349 C267.302864,332.68263 295.895205,325.930061 313.510648,306.148306 C331.970469,285.593129 335.813839,254.180297 322.507627,229.728263 Z",id:"Combined-Shape"})))),o.a.createElement("span",{style:{fontSize:13,fontWeight:600}},"Powered by Editmode"))}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function S(e){var t=e.children,n=e.projectId,a=e.defaultChunks,u=C(Object(r.useState)(null),2),l=u[0],s=u[1],d=C(Object(r.useState)(null),2),f=d[0],p=d[1];if(!n)throw new Error("<Editmode projectId={...}> is missing a valid projectId");var h=n+"_provider";return Object(r.useEffect)((function(){window.chunksProjectIdentifier=n,window.chunksAppFramework="reactjs";var e=(e=>{if(i()){const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return(new Date).getTime()>n.expiry?(localStorage.removeItem(e),null):n.value}})(h);e&&(window.chunksProjectLoaded=!0);var t=document.createElement("script");t.src="https://unpkg.com/editmode-magic-editor@^0/dist/magic-editor.js",document.body.append(t);var r=new URL(document.location.href).searchParams;(s(r.get("em_branch_id")),e)?e.has_watermark&&p(!0):y.get("/projects/".concat(n)).then((function(e){((e,t)=>{if(i()){const n={value:t,expiry:new Date((new Date).setHours((new Date).getHours()+1)).getTime()};localStorage.setItem(e,JSON.stringify(n))}})(h,e.data),e.data.has_watermark&&p(!0)})).catch((function(e){console.error(e)}))}),[]),o.a.createElement(c.Provider,{value:{branch:l,projectId:n,defaultChunks:a}},t,f&&o.a.createElement(k,{projectId:n}))}function P(e,{identifier:t,type:n,contentKey:o,field:i}){const{projectId:l,defaultChunks:d,branch:p}=Object(r.useContext)(c);let[h,m]=Object(r.useState)(void 0);o||(o=e?function(e){if("string"==typeof e)return`${f()(e.slice(0,32))}-${s()(e)}`;console.error(`Cannot compute chunk.content_key. Expected a string, received ${typeof e}.`)}(e):null);let b,v=t||o+l+i;if(void 0!==d&&(b=Object(r.useMemo)(()=>t?d.find(e=>e.identifier===t):d.find(e=>e.content_key===o&&e.project_id==l),[d,t])),Object(r.useEffect)(()=>{let r=new URL(document.location.href).searchParams;const c=p||r.get("em_branch_id")||"";let i=`chunks/${t||o}?project_id=${l}&${c&&"branch_id="+c||""}`;c&&(v+=c);let s=a(v),d=s?JSON.parse(s):b||{chunk_type:n||"single_line_text",content:e,content_key:o};d&&m(d),y.get(i).then(e=>{u(v,e.data),s||m(e.data)}).catch(e=>console.log(e))},[v]),h&&"collection_item"==h.chunk_type&&i){i=i.toLowerCase();const e=h.content.find(e=>e.custom_field_identifier.toLowerCase()==i||e.custom_field_name.toLowerCase()==i);if(!e)return{Component:()=>null};m(e)}return h?{Component:e=>j(h,e),content:h.content}:{Component:()=>null}}function E(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function x(e){var t=e.children,n=e.identifier,r=e.src,c=e.contentKey,i=e.field,a=void 0===i?"":i,u=E(e,["children","identifier","src","contentKey","field"]),l=P(r||t,{identifier:n,type:r?"image":void 0,contentKey:c,field:a}).Component;return o.a.createElement(l,u)}const I=Object(r.createContext)(null);function $(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$(Object(n),!0).forEach((function(t){D(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function L(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function M(e){var t=e.children,n=e.className,i=e.identifier,l=e.limit,s=void 0===l?"":l,d=e.tags,f=void 0===d?[]:d,p=e.itemClass,h=void 0===p?"":p,b=e.contentKey,v=void 0===b?null:b,g=L(Object(r.useState)([]),2),O=g[0],j=g[1],w=i+s+f.join(""),k=Object(r.useContext)(c),C=k.projectId,_=k.branch;if(Object(r.useEffect)((function(){var e=a(w);if(e){var t=JSON.parse(e);j(t)}var n=new URL(document.location.href).searchParams,r=_||n.get("em_branch_id")||"",o=new URLSearchParams({limit:s,collection_identifier:i||v,project_id:C,branch_id:r});f.forEach((function(e){return o.append("tags[]",e)})),y.get("chunks?".concat(o)).then((function(t){if(t.data.error)throw t.data.error;u(w,t.data.chunks),e||j(t.data.chunks)})).catch((function(e){console.error("Something went wrong trying to retrieve chunk collection: ".concat(e,". Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?"))}))}),[i]),null==O||!O.length)return null;var S=O.length?N(N({},O[0]),{},{placeholder:!0}):{};function P(e,t){var n=e.content.find((function(e){return e.custom_field_name==t}));return n&&void 0!==n?n.content:""}return o.a.createElement("div",{className:m(n,"chunks-collection-wrapper"),"data-chunk-cache-id":w,"data-chunk-collection-identifier":i,"data-chunk-tags":f?f.join("|"):""},O.map((function(e,n){return o.a.createElement(I.Provider,{key:e.identifier,value:e},o.a.createElement("div",{className:m(h,"chunks-collection-item--wrapper")},"function"==typeof t?t(P,e,n):t))})),O.length&&o.a.createElement(I.Provider,{key:O[0].identifier+"dummy",value:S},o.a.createElement("template",{className:m(h,"chunks-col-placeholder-wrapper")},"function"==typeof t?t(P,S,0):t)))}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function U(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){H(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function H(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function J(e){e.children;var t=e.identifier,n=(e.transformation,T(e,["children","identifier","transformation"])),o=Object(r.useContext)(I);if(!o)return null;var c=o.content.find((function(e){return e.custom_field_identifier===t||e.custom_field_name===t}));if(!c)return console.warn("Could not find field ".concat(t," for ").concat(o.collection.name)),null;var i=(null==o?void 0:o.placeholder)&&U(U({},c),{},{identifier:"",content:""});return o&&c&&(n=U(U({},n),{},{"data-parent-identifier":o.identifier,"data-custom-field-identifier":c.custom_field_identifier})),j(i||c,n)}const q=(e,t="")=>{const{projectId:n}=Object(r.useContext)(c),[o,i]=Object(r.useState)(n),[l,s]=Object(r.useState)(void 0),d=e+o+t;if(Object(r.useEffect)(()=>{!o&&window.chunksProjectIdentifier&&i(window.chunksProjectIdentifier);const n=a(d);n&&s(JSON.parse(n));let r=`chunks/${e}?project_id=${o}`;y.get(r).then(e=>{e.data.error||e.data.message||(u(d,e.data),n||s(e.data))}).catch(n=>console.error(n,e,t))},[d]),t&&l&&"collection_item"==l.chunk_type){t=t.toLowerCase();const n=l.content.find(e=>e.custom_field_identifier.toLowerCase()==t||e.custom_field_name.toLowerCase()==t);if(!n)return console.error(`We can't find a ${e} content with ${t} field`),"";s(n)}return l&&l.content||""};function z(e,t="",n=[]){const[o,c]=Object(r.useState)([]),i=e+t+n.join("");return Object(r.useEffect)(()=>{const r=a(i);if(r){const e=JSON.parse(r);c(e)}const o=new URLSearchParams({limit:t,collection_identifier:e});n.forEach(e=>o.append("tags[]",e)),y.get("chunks?"+o).then(e=>{u(i,e.data.chunks),r||c(e.data.chunks)}).catch(e=>{console.error(`Something went wrong trying to retrieve chunk collection: ${e}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`)})},[e]),o||o.length?o:null}function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach((function(t){B(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function B(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Z(e){var t=e.chunks,n=e.className,r=e.children,c=e.identifier,i=e.tags,a=void 0===i?[]:i,u=e.limit,l=void 0===u?"":u,s=e.itemClass,d=void 0===s?"":s,f=c+l+a.join(""),p=t.length?W(W({},t[0]),{},{placeholder:!0}):{};return o.a.createElement("div",{className:n?n+" chunks-collection-wrapper":"chunks-collection-wrapper","data-chunk-cache-id":f,"data-chunk-collection-identifier":c},r,t.length&&o.a.createElement(I.Provider,{key:t[0].identifier+"dummy",value:p},o.a.createElement("div",{className:m(d,"chunks-col-placeholder-wrapper chunks-hide")},r)))}function F(e){var t=e.chunk,n=e.children,r=e.className,c=void 0===r?"":r;return o.a.createElement(I.Provider,{value:t},o.a.createElement("div",{className:m(c,"chunks-collection-item--wrapper")},n))}}]);