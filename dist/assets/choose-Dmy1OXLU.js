import{c as f,r as i,j as a}from"./index-c4ra9B1y.js";function u(n){const e=f.c(4),{setchoose:o}=n,r=i.useRef(null);let t;e[0]!==o?(t=()=>{r.current.querySelectorAll("p").forEach(l=>{l.addEventListener("click",()=>{r.current.querySelector(".active").classList.remove("active"),l.classList.add("active"),o(l.innerText)})})},e[0]=o,e[1]=t):t=e[1];let s;e[2]===Symbol.for("react.memo_cache_sentinel")?(s=[],e[2]=s):s=e[2],i.useEffect(t,s);let c;return e[3]===Symbol.for("react.memo_cache_sentinel")?(c=a.jsxs("div",{className:"choose",ref:r,children:[a.jsx("p",{className:"active",children:"Download"}),a.jsx("p",{children:"Upload"})]}),e[3]=c):c=e[3],c}export{u as default};
