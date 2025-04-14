const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/choose-Dmy1OXLU.js","assets/index-c4ra9B1y.js","assets/index-CBf0pHpa.css","assets/choose-C2qaRyMN.css","assets/feedback-BYJ1kj_a.js","assets/feedback-B5t6YWRH.css"])))=>i.map(i=>d[i]);
import{c as y,j as l,r as x,R,_ as T,H as $,L as z}from"./index-c4ra9B1y.js";import{S as q}from"./switchtheme-C7AwbB2E.js";import{y as H,L as M}from"./index-CV3gr8uL.js";import{c as P}from"./index-CaerTkd7.js";function U(){const t=y.c(2);let e;t[0]===Symbol.for("react.memo_cache_sentinel")?(e=l.jsx("h3",{children:l.jsx("a",{href:"/files",children:"File Share"})}),t[0]=e):e=t[0];let s;return t[1]===Symbol.for("react.memo_cache_sentinel")?(s=l.jsxs("header",{children:[e,l.jsx("div",{className:"wrapper",children:l.jsx(q,{})})]}),t[1]=s):s=t[1],s}const A="/assets/fileupload-OrM6AcDC.png",B={closeOnClick:!0,autoClose:3e3,pauseOnFocusLoss:!1,pauseOnHover:!1,draggable:!0},S=(t,e,s)=>{H[e](t,{...B,theme:s})},X=x.memo(J);function J({fileref:t,uploading:e,setFile:s,less:r,setper:n,setuploading:c,setoutput:i}){const o=a=>{if(a.target.files.length!==0)if(a.target.files[0].size/1e3>25e3){S("File Size Exceeded","error",localStorage.getItem("theme")||"dark");return}else s(a.target.files[0]),n(0),c(!1),i(null)};return l.jsxs("div",{className:"img"+(r?" less":""),onClick:()=>t.current.click(),children:[l.jsx("img",{src:A,alt:"File upload image"}),l.jsx("p",{children:"Click Here To Upload A File"}),l.jsx("p",{children:"Max File Size: 25MB"}),l.jsx("input",{ref:t,onClick:a=>{e&&a.preventDefault()},onChange:o,type:"file",name:"uploadedfile"})]})}function O(t){const e=y.c(9),{file:s,per:r}=t;let n,c;if(s){if(s.name.length>16){const m=s.name.length;n=s.name.slice(0,10)+"....."+s.name.slice(m-5,m)}else n=s.name;/^[0-9]{1,2}.[0-9]{2} MB$/.test(s.size)?c=s.size:c=parseFloat(s.size/1e6).toFixed(2).toString()+" MB"}let i;e[0]!==s||e[1]!==n||e[2]!==c?(i=s&&l.jsxs("div",{className:"info",children:[l.jsxs("p",{children:[l.jsx("strong",{children:"File:"})," ",n]}),l.jsxs("p",{children:[l.jsx("strong",{children:"Size:"})," ",c]})]}),e[0]=s,e[1]=n,e[2]=c,e[3]=i):i=e[3];let o;e[4]!==r?(o=l.jsx("div",{className:"progressouter",children:l.jsx("div",{className:"inner",style:{width:r}})}),e[4]=r,e[5]=o):o=e[5];let a;return e[6]!==i||e[7]!==o?(a=l.jsxs("div",{className:"status",children:[i,o]}),e[6]=i,e[7]=o,e[8]=a):a=e[8],a}const V=(t,e)=>{t.target.classList.remove("red"),t.target.classList.remove("green"),e(!1);let s=t.target.value;s.length>4&&(t.target.value=s.slice(0,4))},N=(t,e,s)=>{let r=t.current.querySelector("#ccode"),n=/^[0-9]{4}$/,c=r.value;if(!n.test(c)){S("Invalid Code","error",localStorage.getItem("theme")||"dark"),r.classList.add("red");return}fetch("/api/files/cverify",{method:"POST",headers:{"Content-Type":"application/json","X-Requested-For":s.current},body:JSON.stringify({ccode:c})}).then(i=>i.json()).then(i=>{e(i.status),i.status===!1?(S(i.message,"warn",localStorage.getItem("theme")||"dark"),r.classList.add("red"),r.classList.remove("green")):(S(i.message,"success",localStorage.getItem("theme")||"dark"),r.classList.remove("red"),r.classList.add("green"))})},G=(t,e)=>{let s=e.current,r=s.querySelector("svg");s.classList.contains("show")?(s.classList.remove("show"),r.classList.add("normal")):(s.classList.add("show"),r.classList.remove("normal"))},K=(t,e,s)=>{s.current===null?fetch("https://ip.ageerasaiteja.workers.dev").then(r=>r.json()).then(r=>{s.current=r.ip,N(t,e,s)}):N(t,e,s)};function W(t){const e=y.c(25),{setccodestatus:s,ccref:r,dodref:n,ccodestatus:c,ip:i}=t,o=x.useRef(null);let a;e[0]===Symbol.for("react.memo_cache_sentinel")?(a=k=>{G(k,o)},e[0]=a):a=e[0];let d;e[1]===Symbol.for("react.memo_cache_sentinel")?(d=l.jsxs("div",{className:"optionstitle show",onClick:a,ref:o,children:[l.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 -960 960 960",fill:"var(--back)",children:l.jsx("path",{d:"m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"})}),l.jsx("p",{children:"Options"})]}),e[1]=d):d=e[1];let m;e[2]===Symbol.for("react.memo_cache_sentinel")?(m=l.jsxs("div",{className:"chead",children:[l.jsx("input",{type:"checkbox",id:"ccodeo"}),l.jsx("label",{htmlFor:"ccodeo",children:"Click To Set Custom Code Of 4 Digits"})]}),e[2]=m):m=e[2];let u;e[3]!==s?(u=l.jsx("input",{onInput:k=>{V(k,s)},type:"number",id:"ccode",placeholder:"Enter Custom Code"}),e[3]=s,e[4]=u):u=e[4];let p;e[5]!==r||e[6]!==i||e[7]!==s?(p=K.bind(null,r,s,i),e[5]=r,e[6]=i,e[7]=s,e[8]=p):p=e[8];let f;e[9]!==c||e[10]!==p?(f=l.jsx("button",{onClick:p,disabled:c,children:"Verify"}),e[9]=c,e[10]=p,e[11]=f):f=e[11];let g;e[12]!==u||e[13]!==f?(g=l.jsxs("div",{className:"cbody",children:[u,f]}),e[12]=u,e[13]=f,e[14]=g):g=e[14];let h;e[15]!==r||e[16]!==g?(h=l.jsxs("div",{className:"ccode",ref:r,children:[m,g]}),e[15]=r,e[16]=g,e[17]=h):h=e[17];let j,b;e[18]===Symbol.for("react.memo_cache_sentinel")?(b=l.jsx("input",{type:"checkbox",id:"dod"}),j=l.jsx("label",{htmlFor:"dod",children:"Check To Download Only Once"}),e[18]=j,e[19]=b):(j=e[18],b=e[19]);let v;e[20]!==n?(v=l.jsxs("div",{className:"dod",ref:n,children:[b,j]}),e[20]=n,e[21]=v):v=e[21];let w;return e[22]!==v||e[23]!==h?(w=l.jsxs("div",{className:"options",children:[d,h,v]}),e[22]=v,e[23]=h,e[24]=w):w=e[24],w}function Y(t){const e=y.c(2),{submit:s}=t;let r;return e[0]!==s?(r=l.jsx("div",{className:"submit",children:l.jsx("button",{onClick:s,children:"Upload"})}),e[0]=s,e[1]=r):r=e[1],r}function Z(t){const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}const Q=(t,e)=>{let s=t.target.innerHTML.slice(5,9),r=s==="Code"?e.id:e.link;navigator.clipboard?navigator.clipboard.writeText(r):Z(r),S(`${s} Copied To Clipboard`,"success",localStorage.getItem("theme")||"dark")};function ee(t){const e=y.c(10),{data:s}=t;let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r=l.jsx("p",{children:"File Has Been Uploaded Successfully!!"}),e[0]=r):r=e[0];let n;e[1]!==s.id?(n=l.jsxs("p",{className:"showcode",children:["Your Code is ",l.jsx("strong",{children:s.id})]}),e[1]=s.id,e[2]=n):n=e[2];let c;e[3]===Symbol.for("react.memo_cache_sentinel")?(c=l.jsx("p",{children:"Code Expires In 2 Hours"}),e[3]=c):c=e[3];let i;e[4]===Symbol.for("react.memo_cache_sentinel")?(i=["Code","Link"],e[4]=i):i=e[4];let o;e[5]!==s?(o=l.jsx("div",{className:"buttons",children:i.map(d=>l.jsxs("button",{onClick:m=>{Q(m,s)},children:["Copy ",d]},d))}),e[5]=s,e[6]=o):o=e[6];let a;return e[7]!==n||e[8]!==o?(a=l.jsxs("div",{className:"output",children:[r,n,c,o]}),e[7]=n,e[8]=o,e[9]=a):a=e[9],a}const te=(t,e,s,r,n,c,i)=>{S("File Uploaded Succesfully!!","success",localStorage.getItem("theme")||"dark"),e.value="",e.classList.remove("green"),e.classList.remove("red"),s.checked=!1,r.checked=!1,n(!1);let o=window.location.origin+"/api/files/download/"+t.str,a=t.id.toString();for(;a.length!=4;)a="0"+a;console.log(o,a),c({id:a,link:o}),i(!1)},I=(t,e,s,r,n,c,i,o,a)=>{let d=t.current.querySelector("#ccode"),m=t.current.querySelector("#ccodeo"),u=e.current.querySelector("#dod"),p=parseFloat(s.size/1e6).toFixed(2).toString()+" MB";if(s===null){S("No File Selected","error",localStorage.getItem("theme")||"dark");return}if(m.checked&&!a){S("Custom Code Not Verified !!","error",localStorage.getItem("theme")||"dark"),d.focus(),d.classList.add("red");return}let f=new FormData;f.append("file",s),f.append("customstatus",m.checked),f.append("deleteondownload",u.checked),f.append("size",p),m.checked&&f.append("customid",d.value);let g=new XMLHttpRequest;g.open("POST","/api/files/upload"),g.setRequestHeader("X-Forwarded-For",r.current),g.upload.addEventListener("progress",h=>{let j=parseInt(h.loaded/h.total*100);n(`${j}%`)}),g.send(f),c(!0),g.onload=()=>{if(g.getResponseHeader("Content-Type").includes("application/json")){let j=JSON.parse(g.response);j.status?te(j,d,m,u,i,o,c):S(j.message,"error",localStorage.getItem("theme")||"dark")}else S("Please Try Again!!","error",localStorage.getItem("theme")||"dark")}},se=(t,e,s,r,n,c,i,o,a)=>{r.current===null?fetch("https://ip.ageerasaiteja.workers.dev").then(d=>d.json()).then(d=>{r.current=d.ip,I(t,e,s,r,n,c,i,o,a)}):I(t,e,s,r,n,c,i,o,a)};function _(t){const e=y.c(19),{choose:s,ip:r}=t,n=x.useRef(null),c=x.useRef(null),i=x.useRef(null),[o,a]=x.useState(null),[d,m]=x.useState(!1),[u,p]=x.useState("0%"),[f,g]=x.useState(!1),[h,j]=x.useState(null);let b;e[0]!==d||e[1]!==o||e[2]!==r?(b=()=>{se(c,i,o,r,p,g,m,j,d)},e[0]=d,e[1]=o,e[2]=r,e[3]=b):b=e[3];const v=b,w="upload"+(s==="Upload"?"":" disnone"),k=o!==null;let F;e[4]!==k||e[5]!==f?(F=l.jsx(X,{fileref:n,setFile:a,less:k,setper:p,uploading:f,setuploading:g,setoutput:j}),e[4]=k,e[5]=f,e[6]=F):F=e[6];let C;e[7]!==d||e[8]!==o||e[9]!==r||e[10]!==h||e[11]!==v||e[12]!==u||e[13]!==f?(C=o===null?o:l.jsxs("div",{className:"file",children:[l.jsx(O,{file:o,per:u}),f||h!==null?null:l.jsx(W,{setccodestatus:m,ccref:c,dodref:i,ccodestatus:d,ip:r}),f||h!==null?null:l.jsx(Y,{submit:v}),h===null?h:l.jsx(ee,{data:h})]}),e[7]=d,e[8]=o,e[9]=r,e[10]=h,e[11]=v,e[12]=u,e[13]=f,e[14]=C):C=e[14];let L;return e[15]!==w||e[16]!==F||e[17]!==C?(L=l.jsxs("div",{className:w,children:[F,C]}),e[15]=w,e[16]=F,e[17]=C,e[18]=L):L=e[18],L}const le=R.memo(({submit:t,buttonref:e,inputref:s,file:r})=>{const n=o=>{if(r){o.preventDefault();return}let a=o.clipboardData.getData("text");/^[0-9]{4}$/.test(a)?s.current.forEach((m,u)=>{m.value=a[u-1],u<=3&&(m.disabled=!0,s.current[u+1].disabled=!1,s.current[u+1].focus())}):(S("Pasting Invalid Code","warn",localStorage.getItem("theme")||"dark"),o.preventDefault())},c=o=>{if(r){o.target.value="",o.target.disabled=!0,S("File Is Being Downloaded!","warn",localStorage.getItem("theme")||"dark"),o.preventDefault();return}e.current.disabled=!0;let a=o.target.value.trim(),d=a.length;if(d==0)return;d>1&&(o.target.value=a.slice(d-1,d));let m=o.target.nextSibling;m?(o.target.disabled=!0,m.disabled=!1,m.focus()):e.current.removeAttribute("disabled")},i=o=>{if(r){o.target.value="",o.target.disabled=!0,S("File Is Being Downloaded!","warn",localStorage.getItem("theme")||"dark"),o.preventDefault();return}if(o.key=="Backspace"){if(e.current.disabled=!0,o.target.value){o.target.value="";return}let a=o.target.previousSibling;a&&(o.target.disabled=!0,a.disabled=!1,a.focus())}else o.key=="Enter"&&e.current.disabled==!1&&t()};return l.jsx("div",{className:"dinput",children:[1,2,3,4].map(o=>l.jsx("input",{type:"number",ref:a=>s.current[o]=a,name:`i${o}`,onInput:c,onKeyDown:i,disabled:o>1||r!=!1,onPaste:n},o))})}),E=(t,e,s,r,n)=>{let c="";if(t.current.forEach(d=>{c+=d.value}),!/^[0-9]{4}$/.test(c)){S("Invalid Code!","warn",localStorage.getItem("theme")||"dark");return}let o=JSON.stringify({id:c}),a=P.AES.encrypt(o,"c7NAugAqajNELIyl8DwWrujnb03PAzrb").toString();fetch("/api/files/download",{method:"POST",headers:{"Content-Type":"application/json","X-Forwarded-For":n.current},body:JSON.stringify({token:a})}).then(d=>d.json()).then(d=>{if(d.status){r(d),t.current.forEach(p=>{p.disabled=!0}),e.current.disabled=!0;let m=d.redirect;m=window.location.origin+"/api"+m;let u=new XMLHttpRequest;u.open("GET",m),u.responseType="blob",u.setRequestHeader("X-Forwarded-For",n.current),u.send(),u.onprogress=p=>{let f=parseInt(p.loaded/p.total*100).toString();s(`${f}%`)},u.onload=()=>{if(setTimeout(()=>{s("0%"),r(!1),t.current[1].disabled=!1,t.current[1].focus(),e.current.disabled=!1,localStorage.getItem("filesfeedback")===null&&document.querySelector(".mainfeedback").classList.remove("disnone")},3e3),u.getResponseHeader("Content-Type").includes("application/json")){S("Some Error Occured!!","error",localStorage.getItem("theme")||"dark");return}let f=u.response,g=URL.createObjectURL(f),h=document.createElement("a");h.href=g,h.download=d.name,h.click(),S("File Downloaded Successfully","success",localStorage.getItem("theme")||"dark"),t.current.forEach(j=>{j&&(j.value="")})}}else S(d.message,"error",localStorage.getItem("theme")||"dark")})},re=(t,e,s,r,n)=>{n.current===null?fetch("https://ip.ageerasaiteja.workers.dev").then(c=>c.json()).then(c=>{n.current=c.ip,E(t,e,s,r,n)}):E(t,e,s,r,n)};function D({choose:t,ip:e}){const s=x.useRef(null),r=x.useRef([]),[n,c]=x.useState("0%"),[i,o]=x.useState(!1),a=x.useCallback(()=>re(r,s,c,o,e),[]);return x.useEffect(()=>{s.current.addEventListener("click",a),r.current[1].focus()},[]),l.jsxs("div",{className:"download"+(t==="Download"?"":" disnone"),children:[l.jsx("h3",{children:"Download"}),l.jsx("p",{className:"desc",children:"Enter Code To Download File"}),l.jsx(le,{submit:a,buttonref:s,inputref:r,file:i}),l.jsx("div",{className:"submit",children:l.jsx("button",{disabled:!0,ref:s,children:"Download"})}),i?l.jsx(O,{file:i,per:n}):null]})}function oe(t){const e=y.c(3),{showchoose:s,choose:r}=t,n=x.useRef(null);let c;return e[0]!==r||e[1]!==s?(c=l.jsxs("div",{className:"files",children:[s==!0?l.jsx(D,{choose:r,ip:n}):l.jsx(D,{choose:"Download",ip:n}),s==!0?l.jsx(_,{choose:r,ip:n}):l.jsx(_,{choose:"Upload",ip:n})]}),e[0]=r,e[1]=s,e[2]=c):c=e[2],c}const ae=x.lazy(()=>T(()=>import("./choose-Dmy1OXLU.js"),__vite__mapDeps([0,1,2,3]))),ne=x.lazy(()=>T(()=>import("./feedback-BYJ1kj_a.js"),__vite__mapDeps([4,1,2,5])));function fe(){const t=y.c(18);let e;t[0]===Symbol.for("react.memo_cache_sentinel")?(e=window.matchMedia("(max-width: 749px)"),t[0]=e):e=t[0];const[s,r]=x.useState(e.matches),[n,c]=x.useState("Download");let i,o;t[1]===Symbol.for("react.memo_cache_sentinel")?(i=()=>{window.addEventListener("resize",()=>{r(window.matchMedia("(max-width: 749px)").matches)}),new URLSearchParams(window.location.search).get("error")==="File Not Found"&&setTimeout(ce,500)},o=[],t[1]=i,t[2]=o):(i=t[1],o=t[2]),x.useEffect(i,o);let a;t[3]===Symbol.for("react.memo_cache_sentinel")?(a=l.jsxs($,{children:[l.jsx("title",{children:"File Share"}),l.jsx("link",{rel:"icon",href:"/fileslogo.svg"}),l.jsx("meta",{name:"title",content:"File Share"}),l.jsx("meta",{property:"og:title",content:"File Share"}),l.jsx("meta",{name:"description",content:"Upload and share files easily with a unique code system. Files are stored securely and auto-delete after 2 hours. Try now!"}),l.jsx("meta",{property:"og:description",content:"Upload and share files easily with a unique code system. Files are stored securely and auto-delete after 2 hours. Try now!"}),l.jsx("meta",{name:"keywords",content:"file share, file sharing, share files, file sharing website, file share website"})]}),t[3]=a):a=t[3];let d;t[4]===Symbol.for("react.memo_cache_sentinel")?(d=l.jsx(z,{}),t[4]=d):d=t[4];let m;t[5]===Symbol.for("react.memo_cache_sentinel")?(m=l.jsx(U,{}),t[5]=m):m=t[5];let u;t[6]!==s?(u=s?l.jsx(ae,{setchoose:c}):null,t[6]=s,t[7]=u):u=t[7];let p;t[8]!==n||t[9]!==s?(p=l.jsx(oe,{showchoose:s,choose:n}),t[8]=n,t[9]=s,t[10]=p):p=t[10];let f;t[11]!==u||t[12]!==p?(f=l.jsx("div",{className:"fileshare",children:l.jsxs("div",{className:"main",children:[m,u,p]})}),t[11]=u,t[12]=p,t[13]=f):f=t[13];let g,h;t[14]===Symbol.for("react.memo_cache_sentinel")?(h=localStorage.getItem("filesfeedback")===null?l.jsx(ne,{application:"files"}):null,g=l.jsx(M,{}),t[14]=g,t[15]=h):(g=t[14],h=t[15]);let j;return t[16]!==f?(j=l.jsxs(l.Fragment,{children:[a,l.jsxs(x.Suspense,{fallback:d,children:[f,h,g]})]}),t[16]=f,t[17]=j):j=t[17],j}function ce(){return S("File Not Found!","error",localStorage.getItem("theme")||"dark")}export{fe as default};
