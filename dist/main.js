module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("@emotion/hash")},function(e,t){e.exports=require("lodash.kebabcase")},function(e,t){e.exports=require("isomorphic-dompurify")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("react-inlinesvg")},function(e,t,n){"use strict";n.r(t),n.d(t,"Editmode",(function(){return Q})),n.d(t,"Chunk",(function(){return te})),n.d(t,"ChunkCollection",(function(){return ue})),n.d(t,"ChunkFieldValue",(function(){return pe})),n.d(t,"useChunk",(function(){return Y})),n.d(t,"useGetChunk",(function(){return he})),n.d(t,"useCollectionChunks",(function(){return me})),n.d(t,"CustomChunkCollection",(function(){return ge})),n.d(t,"ChunkCollectionContext",(function(){return ne})),n.d(t,"CollectionItemWrapper",(function(){return Oe}));var r=n(0),o=n.n(r);const i=Object(r.createContext)({branch:null,projectId:null,defaultChunks:[]}),c=()=>"undefined"!=typeof window,a=e=>{if(c())return localStorage.getItem(e)},u=(e,t)=>{c()&&localStorage.setItem(e,JSON.stringify(t))};var l=n(1),s=n.n(l),f=n(2),d=n.n(f);var p=n(3),h=n.n(p);function m(e,t){return e=e?`${e} ${t}`:t}var y=n(4);const v=n.n(y).a.create({baseURL:"https://api2.editmode.com/",headers:{Accept:"application/json",referrer:"undefined"!=typeof window?window.location.href:""}});var b=n(5),g=n.n(b);function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var w=function(e,t,n){var r=((e,t)=>{const n=h.a.sanitize(e.content),r={...e,content:n},o=(r.content.match(/\{{(.*?)\}}/g)||[]).map(e=>e.substr(2,e.length-4));let i=r.content;return o&&o.forEach((function(e){const n=t.variables&&t.variables[e]||"",r=`<em-var data-chunk-variable="${e}" data-chunk-variable-value="${n}">${n}</em-var>`;i=i.replace(`{{${e}}}`,r)})),{chunk:r,parsedChunk:i}})(e,t),i=r.chunk,c=r.parsedChunk,a=t.transformation;a&&"image"==i.chunk_type&&(i.content=((e,t)=>{try{t=t.trim().replace(/\s+/g," ").replace(" ",",");let n=new URL(e);return n.searchParams.append("tr",t),n.toString()}catch(t){return console.warn(t),e}})(i.content,a));var u={"data-chunk":i.identifier,"data-chunk-editable":!0,"data-chunk-content-key":i.content_key,"data-chunk-type":i.chunk_type,"data-chunk-cache-id":n,key:i.identifier,class:t.className};switch(i.chunk_type){case"single_line_text":case"long_text":return o.a.createElement("em-span",O({},u,{dangerouslySetInnerHTML:{__html:c}},t));case"rich_text":return o.a.createElement("em-span",O({},u,{dangerouslySetInnerHTML:{__html:c}},t,{class:"editmode-richtext-editor "+t.className}));case"image":return null!=i.content.match(/\.(svg)/)?o.a.createElement(g.a,O({},u,{src:i.content,"data-chunk-editable":!1,alt:"",wrapper:"svg"},t)):i.content?o.a.createElement("img",O({},u,{src:i.content,"data-chunk-editable":!1,alt:""},t)):o.a.createElement("svg",O({},u,{"data-chunk-editable":!1,fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},t),o.a.createElement("path",{"fill-rule":"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z","clip-rule":"evenodd"}));default:return o.a.createElement("span",t,c)}};var k={zIndex:9999,bottom:8,right:8,position:"fixed",opacity:1,display:"flex",alignItems:"center",background:"rgba(255,255,255, 0.9)",cursor:"pointer",borderRadius:5,padding:"2px 5px 2px 2px",boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"};function j(e){var t=e.projectId;return o.a.createElement("div",{style:k,onClick:function(){return window.open("https://editmode.com?ref=pb&pid=".concat(t))}},o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25",height:"25",viewBox:"0 0 548 532",version:"1.1",fill:"currentColor"},o.a.createElement("g",{id:"Page-2",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},o.a.createElement("g",{id:"Group-2-Copy",fill:"#02164B",fillRule:"nonzero"},o.a.createElement("path",{d:"M355.57238,93.227099 C421.07938,126.760445 463.228656,200.366589 458.662484,275.197013 C456.789183,321.18219 437.646387,365.465318 406.824729,398.879222 C371.729602,436.503458 321.735878,458.271766 270.922584,458.988418 C203.22031,459.764791 137.596229,421.453764 104.754918,360.956382 C83.2997657,322.496052 75.4553171,276.928922 82.5387371,233.302725 C89.0952911,193.767417 107.828303,156.501508 135.840009,128.343052 C167.861751,95.3770553 211.620895,75.6989829 256.902096,72.4143274 C290.88495,70.1150686 325.248318,77.4308922 355.57238,93.227099 Z M302.597364,108.707879 C244.580186,94.7144282 181.478422,121.295874 147.91428,172.136709 C125.753716,204.951046 116.495656,247.175826 123.079165,286.681355 C127.575938,318.48743 142.800303,348.796389 164.461226,371.680876 C195.556552,404.281339 240.406711,421.818983 284.492713,417.297082 C306.976574,415.738859 326.903446,407.153357 347.094835,397.529041 C333.927816,397.406827 321.113485,400.462166 307.975856,399.881651 C293.691992,399.33169 279.114221,397.284614 265.565123,392.487732 C232.823919,381.213532 204.168018,358.573473 185.916413,328.020087 C170.074843,302.721883 162.668395,271.465768 167.841152,241.52345 C172.896347,214.850343 187.297774,190.224314 208.429665,174.061573 C244.874093,144.791428 299.77586,145.463603 335.750037,175.344815 C370.842495,203.117843 385.273313,253.25595 370.783713,296.550099 C362.524936,322.978778 344.831754,343.357887 322.553628,358.145726 C342.069031,355.12094 360.261854,348.643622 375.985862,336.025074 C406.7285,312.315646 423.275446,271.129681 418.043907,231.715813 C408.727065,170.822914 360.320636,120.89868 302.597364,108.707879 Z M322.507627,229.728263 C308.735553,203.164192 276.64924,189.629307 248.46453,198.136949 C218.823998,206.287627 198.529842,236.927037 201.907349,268.072146 C204.498711,292.375445 220.017772,314.804683 242.932407,323.074349 C267.302864,332.68263 295.895205,325.930061 313.510648,306.148306 C331.970469,285.593129 335.813839,254.180297 322.507627,229.728263 Z",id:"Combined-Shape"})))),o.a.createElement("span",{style:{fontSize:13,fontWeight:600}},"Powered by Editmode"))}
/*!
 * hotkeys-js v3.8.7
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2021 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */var C="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>0;function _(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on".concat(t),(function(){n(window.event)}))}function E(e,t){for(var n=t.slice(0,t.length-1),r=0;r<n.length;r++)n[r]=e[n[r].toLowerCase()];return n}function x(e){"string"!=typeof e&&(e="");for(var t=(e=e.replace(/\s/g,"")).split(","),n=t.lastIndexOf("");n>=0;)t[n-1]+=",",t.splice(n,1),n=t.lastIndexOf("");return t}for(var S={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":C?173:189,"=":C?61:187,";":C?59:186,"'":222,"[":219,"]":221,"\\":220},P={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},I={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},K={16:!1,18:!1,17:!1,91:!1},A={},L=1;L<20;L++)S["f".concat(L)]=111+L;var N=[],D="all",$=[],T=function(e){return S[e.toLowerCase()]||P[e.toLowerCase()]||e.toUpperCase().charCodeAt(0)};function M(e){D=e||"all"}function R(){return D||"all"}var U=function(e){var t=e.key,n=e.scope,r=e.method,o=e.splitKey,i=void 0===o?"+":o;x(t).forEach((function(e){var t=e.split(i),o=t.length,c=t[o-1],a="*"===c?"*":T(c);if(A[a]){n||(n=R());var u=o>1?E(P,t):[];A[a]=A[a].map((function(e){return(!r||e.method===r)&&e.scope===n&&function(e,t){for(var n=e.length>=t.length?e:t,r=e.length>=t.length?t:e,o=!0,i=0;i<n.length;i++)-1===r.indexOf(n[i])&&(o=!1);return o}(e.mods,u)?{}:e}))}}))};function H(e,t,n){var r;if(t.scope===n||"all"===t.scope){for(var o in r=t.mods.length>0,K)Object.prototype.hasOwnProperty.call(K,o)&&(!K[o]&&t.mods.indexOf(+o)>-1||K[o]&&-1===t.mods.indexOf(+o))&&(r=!1);(0!==t.mods.length||K[16]||K[18]||K[17]||K[91])&&!r&&"*"!==t.shortcut||!1===t.method(e,t)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}function J(e){var t=A["*"],n=e.keyCode||e.which||e.charCode;if(q.filter.call(this,e)){if(93!==n&&224!==n||(n=91),-1===N.indexOf(n)&&229!==n&&N.push(n),["ctrlKey","altKey","shiftKey","metaKey"].forEach((function(t){var n=I[t];e[t]&&-1===N.indexOf(n)?N.push(n):!e[t]&&N.indexOf(n)>-1?N.splice(N.indexOf(n),1):"metaKey"===t&&e[t]&&3===N.length&&(e.ctrlKey||e.shiftKey||e.altKey||(N=N.slice(N.indexOf(n))))})),n in K){for(var r in K[n]=!0,P)P[r]===n&&(q[r]=!0);if(!t)return}for(var o in K)Object.prototype.hasOwnProperty.call(K,o)&&(K[o]=e[I[o]]);e.getModifierState&&(!e.altKey||e.ctrlKey)&&e.getModifierState("AltGraph")&&(-1===N.indexOf(17)&&N.push(17),-1===N.indexOf(18)&&N.push(18),K[17]=!0,K[18]=!0);var i=R();if(t)for(var c=0;c<t.length;c++)t[c].scope===i&&("keydown"===e.type&&t[c].keydown||"keyup"===e.type&&t[c].keyup)&&H(e,t[c],i);if(n in A)for(var a=0;a<A[n].length;a++)if(("keydown"===e.type&&A[n][a].keydown||"keyup"===e.type&&A[n][a].keyup)&&A[n][a].key){for(var u=A[n][a],l=u.splitKey,s=u.key.split(l),f=[],d=0;d<s.length;d++)f.push(T(s[d]));f.sort().join("")===N.sort().join("")&&H(e,u,i)}}}function q(e,t,n){N=[];var r=x(e),o=[],i="all",c=document,a=0,u=!1,l=!0,s="+";for(void 0===n&&"function"==typeof t&&(n=t),"[object Object]"===Object.prototype.toString.call(t)&&(t.scope&&(i=t.scope),t.element&&(c=t.element),t.keyup&&(u=t.keyup),void 0!==t.keydown&&(l=t.keydown),"string"==typeof t.splitKey&&(s=t.splitKey)),"string"==typeof t&&(i=t);a<r.length;a++)o=[],(e=r[a].split(s)).length>1&&(o=E(P,e)),(e="*"===(e=e[e.length-1])?"*":T(e))in A||(A[e]=[]),A[e].push({keyup:u,keydown:l,scope:i,mods:o,shortcut:r[a],method:n,key:r[a],splitKey:s});void 0!==c&&!function(e){return $.indexOf(e)>-1}(c)&&window&&($.push(c),_(c,"keydown",(function(e){J(e)})),_(window,"focus",(function(){N=[]})),_(c,"keyup",(function(e){J(e),function(e){var t=e.keyCode||e.which||e.charCode,n=N.indexOf(t);if(n>=0&&N.splice(n,1),e.key&&"meta"===e.key.toLowerCase()&&N.splice(0,N.length),93!==t&&224!==t||(t=91),t in K)for(var r in K[t]=!1,P)P[r]===t&&(q[r]=!1)}(e)})))}var z={setScope:M,getScope:R,deleteScope:function(e,t){var n,r;for(var o in e||(e=R()),A)if(Object.prototype.hasOwnProperty.call(A,o))for(n=A[o],r=0;r<n.length;)n[r].scope===e?n.splice(r,1):r++;R()===e&&M(t||"all")},getPressedKeyCodes:function(){return N.slice(0)},isPressed:function(e){return"string"==typeof e&&(e=T(e)),-1!==N.indexOf(e)},filter:function(e){var t=e.target||e.srcElement,n=t.tagName,r=!0;return!t.isContentEditable&&("INPUT"!==n&&"TEXTAREA"!==n&&"SELECT"!==n||t.readOnly)||(r=!1),r},unbind:function(e){if(e){if(Array.isArray(e))e.forEach((function(e){e.key&&U(e)}));else if("object"==typeof e)e.key&&U(e);else if("string"==typeof e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=n[0],i=n[1];"function"==typeof o&&(i=o,o=""),U({key:e,scope:o,method:i,splitKey:"+"})}}else Object.keys(A).forEach((function(e){return delete A[e]}))}};for(var B in z)Object.prototype.hasOwnProperty.call(z,B)&&(q[B]=z[B]);if("undefined"!=typeof window){var W=window.hotkeys;q.noConflict=function(e){return e&&window.hotkeys===q&&(window.hotkeys=W),q},window.hotkeys=q}var G=q;G.filter=function(){return!0};var V=function(e,t){var n=e.target,r=n&&n.tagName;return Boolean(r&&t&&t.includes(r))};function Z(e,t,n,o){n instanceof Array&&(o=n,n=void 0);var i=n||{},c=i.enableOnTags,a=i.filter,u=i.keyup,l=i.keydown,s=i.filterPreventDefault,f=void 0===s||s,d=i.enabled,p=void 0===d||d,h=i.enableOnContentEditable,m=void 0!==h&&h,y=Object(r.useRef)(null),v=Object(r.useCallback)((function(e,n){var r;return a&&!a(e)?!f:!!(V(e,["INPUT","TEXTAREA","SELECT"])&&!V(e,c)||null!=(r=e.target)&&r.isContentEditable&&!m)||(null===y.current||document.activeElement===y.current)&&(t(e,n),!0)}),o?[y,c,a].concat(o):[y,c,a]);return Object(r.useEffect)((function(){if(p)return u&&!0!==l&&(n.keydown=!1),G(e,n||{},v),function(){G.unbind(e,v)}}),[v,e,p]),y}function F(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return X(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return X(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Q(e){var t=e.children,n=e.projectId,a=e.defaultChunks,u=e.branchId,l=F(Object(r.useState)(""),2),s=l[0],f=l[1],d=F(Object(r.useState)(null),2),p=d[0],h=d[1],m=F(Object(r.useState)(!1),2),y=m[0],b=m[1];if(Z("cmd+shift+e",(function(){b(!y)})),!n)throw new Error("<Editmode projectId={...}> is missing a valid projectId");var g=n+"_provider";return Object(r.useEffect)((function(){var e=new URL(document.location.href).searchParams;f(u||e.get("em_branch_id")),b(window.location.href.indexOf("editmode")>-1),u&&y&&(e.set("em_branch_id","".concat(u)),history.pushState(null,null,"?"+e.toString())),window.chunksProjectIdentifier=n,window.chunksAppFramework="reactjs";var t=(e=>{if(c()){const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return(new Date).getTime()>n.expiry?(localStorage.removeItem(e),null):n.value}})(g);t&&(window.chunksProjectLoaded=!0);var r=document.createElement("script");(r.src="https://unpkg.com/editmode-magic-editor@^0/dist/magic-editor.js",document.body.append(r),t)?t.has_watermark&&h(!0):v.get("/projects/".concat(n)).then((function(e){((e,t)=>{if(c()){const n={value:t,expiry:new Date((new Date).setHours((new Date).getHours()+1)).getTime()};localStorage.setItem(e,JSON.stringify(n))}})(g,e.data),e.data.has_watermark&&h(!0)})).catch((function(e){console.error(e)}))}),[s,y]),o.a.createElement(i.Provider,{value:{branch:s,projectId:n,defaultChunks:a}},t,p&&o.a.createElement(j,{projectId:n}))}function Y(e,{identifier:t,type:n,contentKey:o,field:c}){const{projectId:l,defaultChunks:f,branch:p}=Object(r.useContext)(i);let[h,m]=Object(r.useState)(void 0);o||(o=e?function(e){if("string"==typeof e)return`${d()(e.slice(0,32))}-${s()(e)}`;console.error(`Cannot compute chunk.content_key. Expected a string, received ${typeof e}.`)}(e):null);let y,b=t||o+l+c;if(void 0!==f&&(y=Object(r.useMemo)(()=>t?f.find(e=>e.identifier===t):f.find(e=>e.content_key===o&&e.project_id==l),[f,t,p])),Object(r.useEffect)(()=>{let r=new URL(document.location.href).searchParams;const i=p||r.get("em_branch_id")||"";let c=`chunks/${t||o}?project_id=${l}&${i&&"branch_id="+i||""}`;i&&(b+=i);let s=a(b),f=s?JSON.parse(s):y||{chunk_type:n||"single_line_text",content:e,content_key:o};f&&m(f),v.get(c).then(e=>{u(b,e.data),s||m(e.data)}).catch(e=>console.log(e))},[b,p]),h&&"collection_item"==h.chunk_type&&c){c=c.toLowerCase();const e=h.content.find(e=>e.custom_field_identifier.toLowerCase()==c||e.custom_field_name.toLowerCase()==c);if(!e)return{Component:()=>null};m(e)}return h?{Component:e=>w(h,e,b),content:h.content}:{Component:()=>null}}function ee(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function te(e){var t=e.children,n=e.identifier,r=e.src,i=e.contentKey,c=e.field,a=void 0===c?"":c,u=ee(e,["children","identifier","src","contentKey","field"]),l=Y(r||t,{identifier:n,type:r?"image":void 0,contentKey:i,field:a}).Component;return o.a.createElement(l,u)}const ne=Object(r.createContext)(null);function re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function oe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?re(Object(n),!0).forEach((function(t){ie(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):re(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ie(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ce(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ae(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ae(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ae(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ue(e){var t=e.children,n=e.className,c=e.identifier,l=e.limit,s=void 0===l?"":l,f=e.tags,d=void 0===f?[]:f,p=e.itemClass,h=void 0===p?"":p,y=e.contentKey,b=void 0===y?null:y,g=ce(Object(r.useState)([]),2),O=g[0],w=g[1],k=c+s+d.join(""),j=Object(r.useContext)(i),C=j.projectId,_=j.branch;if(Object(r.useEffect)((function(){var e=a(k);if(e){var t=JSON.parse(e);w(t)}var n=new URL(document.location.href).searchParams,r=_||n.get("em_branch_id")||"",o=new URLSearchParams({limit:s,collection_identifier:c||b,project_id:C,branch_id:r});d.forEach((function(e){return o.append("tags[]",e)})),v.get("chunks?".concat(o)).then((function(t){if(t.data.error)throw t.data.error;u(k,t.data.chunks),e||w(t.data.chunks)})).catch((function(e){console.error("Something went wrong trying to retrieve chunk collection: ".concat(e,". Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?"))}))}),[c]),null==O||!O.length)return null;var E=O.length?oe(oe({},O[0]),{},{placeholder:!0}):{};function x(e,t){var n=e.content.find((function(e){return e.custom_field_name==t}));return n&&void 0!==n?n.content:""}return o.a.createElement("div",{className:m(n,"chunks-collection-wrapper"),"data-chunk-cache-id":k,"data-chunk-collection-identifier":c,"data-chunk-tags":d?d.join("|"):""},O.map((function(e,n){return o.a.createElement(ne.Provider,{key:e.identifier,value:e},o.a.createElement("div",{className:m(h,"chunks-collection-item--wrapper")},"function"==typeof t?t(x,e,n):t))})),O.length&&o.a.createElement(ne.Provider,{key:O[0].identifier+"dummy",value:E},o.a.createElement("template",{className:m(h,"chunks-col-placeholder-wrapper")},"function"==typeof t?t(x,E,0):t)))}function le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function se(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?le(Object(n),!0).forEach((function(t){fe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):le(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function fe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function de(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function pe(e){e.children;var t=e.identifier,n=(e.transformation,de(e,["children","identifier","transformation"])),o=Object(r.useContext)(ne);if(!o)return null;var i=o.content.find((function(e){return e.custom_field_identifier===t||e.custom_field_name===t}));if(!i)return console.warn("Could not find field ".concat(t," for ").concat(o.collection.name)),null;var c=(null==o?void 0:o.placeholder)&&se(se({},i),{},{identifier:"",content:""});return o&&i&&(n=se(se({},n),{},{"data-parent-identifier":o.identifier,"data-custom-field-identifier":i.custom_field_identifier})),w(c||i,n)}const he=(e,t="")=>{const{projectId:n}=Object(r.useContext)(i),[o,c]=Object(r.useState)(n),[l,s]=Object(r.useState)(void 0),f=e+o+t;if(Object(r.useEffect)(()=>{!o&&window.chunksProjectIdentifier&&c(window.chunksProjectIdentifier);const n=a(f);n&&s(JSON.parse(n));let r=`chunks/${e}?project_id=${o}`;v.get(r).then(e=>{e.data.error||e.data.message||(u(f,e.data),n||s(e.data))}).catch(n=>console.error(n,e,t))},[f]),t&&l&&"collection_item"==l.chunk_type){t=t.toLowerCase();const n=l.content.find(e=>e.custom_field_identifier.toLowerCase()==t||e.custom_field_name.toLowerCase()==t);if(!n)return console.error(`We can't find a ${e} content with ${t} field`),"";s(n)}return l&&l.content||""};function me(e,t="",n=[]){const[o,i]=Object(r.useState)([]),c=e+t+n.join("");return Object(r.useEffect)(()=>{const r=a(c);if(r){const e=JSON.parse(r);i(e)}const o=new URLSearchParams({limit:t,collection_identifier:e});n.forEach(e=>o.append("tags[]",e)),v.get("chunks?"+o).then(e=>{u(c,e.data.chunks),r||i(e.data.chunks)}).catch(e=>{console.error(`Something went wrong trying to retrieve chunk collection: ${e}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`)})},[e]),o||o.length?o:null}function ye(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ye(Object(n),!0).forEach((function(t){be(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ye(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function be(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ge(e){var t=e.chunks,n=e.className,r=e.children,i=e.identifier,c=e.tags,a=void 0===c?[]:c,u=e.limit,l=void 0===u?"":u,s=e.itemClass,f=void 0===s?"":s,d=i+l+a.join(""),p=t.length?ve(ve({},t[0]),{},{placeholder:!0}):{};return o.a.createElement("div",{className:n?n+" chunks-collection-wrapper":"chunks-collection-wrapper","data-chunk-cache-id":d,"data-chunk-collection-identifier":i},r,t.length&&o.a.createElement(ne.Provider,{key:t[0].identifier+"dummy",value:p},o.a.createElement("div",{className:m(f,"chunks-col-placeholder-wrapper chunks-hide")},r)))}function Oe(e){var t=e.chunk,n=e.children,r=e.className,i=void 0===r?"":r;return o.a.createElement(ne.Provider,{value:t},o.a.createElement("div",{className:m(i,"chunks-collection-item--wrapper")},n))}}]);