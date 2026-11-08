(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const MAIL="remontpokrivi.ivanov@abv.bg";
const b=$("#burger"),nav=$("#nav");
if(b&&nav){b.addEventListener("click",()=>{const o=nav.classList.toggle("show");b.setAttribute("aria-expanded",o)});
$$("#nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("show")));}
function prefill(type){
  const f=$("#f-msg"); if(f&&type) f.value="Интересувам се от: "+type+". ";
  const k=$("#kontakti"); if(k) k.scrollIntoView({behavior:"smooth"});
  setTimeout(()=>{const n=$("#f-name"); if(n) n.focus({preventScroll:true});},500);
}
$$(".offer .ask").forEach(x=>x.addEventListener("click",()=>prefill(x.dataset.t)));
const v=id=>($(id)?$(id).value.trim():"");
const ENDPOINT="https://formsubmit.co/ajax/"+MAIL;
function note(form,ok,html){
  let n=form.querySelector(".fmsg");
  if(!n){n=document.createElement("div");n.className="fmsg";n.setAttribute("role","status");n.setAttribute("aria-live","polite");form.appendChild(n)}
  n.style.cssText="display:block;margin-top:12px;padding:12px 14px;border-radius:12px;font-size:14px;font-weight:600;"+(ok?"background:#E7F4EA;border:1px solid #BCDFC5;color:#1B5E32":"background:#FDECEA;border:1px solid #F3B8B3;color:#8A1C14");
  n.innerHTML=html;
}
function send(form,subject,fields,mailtoBody){
  const btn=form.querySelector('button[type=submit]'),label=btn.textContent;
  btn.disabled=true;btn.textContent="Изпращане...";
  const body=Object.assign({_subject:subject,_template:"table",_captcha:"false",_honey:""},fields);
  const fallback='Не успяхме да изпратим запитването. Моля, обадете се на <a href="tel:+359895258558"><b>0895 25 85 58</b></a> или <a href="mailto:'+MAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(mailtoBody)+'"><b>пишете на имейл</b></a>.';
  fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(body)})
    .then(r=>r.json().then(j=>({r,j})))
    .then(({r,j})=>{
      if(r.ok&&String(j.success)!=="false"){form.reset();note(form,true,"Благодарим! Запитването е изпратено. Ще се свържем с вас в кратки срокове.");}
      else note(form,false,fallback);
    })
    .catch(()=>note(form,false,fallback))
    .finally(()=>{btn.disabled=false;btn.textContent=label});
}
const cf=$("#cf");
if(cf) cf.addEventListener("submit",e=>{e.preventDefault();
  const f={"Имена":v("#f-name"),"Телефон":v("#f-phone"),"Населено място":v("#f-city"),"Вид ремонт":v("#f-type"),"Съобщение":v("#f-msg")};
  send(cf,"Запитване за оглед: "+f["Вид ремонт"],f,"Имена: "+f["Имена"]+"\nТелефон: "+f["Телефон"]+"\nНаселено място: "+f["Населено място"]+"\nВид ремонт: "+f["Вид ремонт"]+"\n\n"+f["Съобщение"]);});
const rf=$("#rfq");
if(rf) rf.addEventListener("submit",e=>{e.preventDefault();
  const f={"Име или фирма":v("#r-name"),"Контакт":v("#r-contact"),"Тип обект":v("#r-type"),"Съобщение":v("#r-msg")};
  const ok=$("#rfqOk"); if(ok) ok.style.display="none";
  send(rf,"Запитване за обект: "+f["Тип обект"],f,"Име или фирма: "+f["Име или фирма"]+"\nКонтакт: "+f["Контакт"]+"\nТип обект: "+f["Тип обект"]+"\n\n"+f["Съобщение"]);});
const tip=$("#callTip");
if(tip) setTimeout(()=>{tip.style.display="block";setTimeout(()=>tip.style.display="none",7000)},6000);
$$(".acc details,.faq details").forEach(d=>{d.open=true;d.addEventListener("toggle",()=>{if(!d.open)d.open=true})});
if("IntersectionObserver" in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
  $$(".reveal").forEach(el=>io.observe(el));
  const y=$("#yrs"); if(y) y.dataset.count=Math.max(1,new Date().getFullYear()-1980);
  const nums=$$(".n[data-count]"),band=$(".statband");
  const run=el=>{const to=+el.dataset.count,t0=performance.now(),d=1500;
    if(matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent=to;return}
    (function f(t){const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);el.textContent=Math.round(to*e);if(k<1)requestAnimationFrame(f)})(t0)};
  if(band){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){nums.forEach(run);so.disconnect()}}),{threshold:.35});so.observe(band);}
}else{$$(".reveal").forEach(el=>el.classList.add("in"));}
})();
