/* Basic interactive terminal-like portfolio
   Commands (examples):
   - LISTAR_PROYECTOS
   - VER_PROYECTO <n>
   - EJECUTAR_CV
   - DATOS_CONTACTO
   - EJECUTAR_DEMO <n>
   - AYUDA
*/

const projects = [
  {
    id:1, title:"Reels Creator - Editor de video creativo",
    desc:"Editor especializado en reels y tendencias. Generación de intros automáticas, plantillas y export optimizado.",
    tech:["React","FFmpeg","Node.js","Tailwind"], demo:"#"
  },
  {
    id:2, title:"Gestor de Turnos - App web",
    desc:"Sistema de gestión de turnos con roles, notificaciones y calendario integrable.",
    tech:["Vue","Firebase","PostgreSQL"], demo:"#"
  },
  {
    id:3, title:"Visualizador de Datos - Dashboard interactivo",
    desc:"Dashboard con visualizaciones custom, filtros avanzados y export CSV.",
    tech:["D3.js","React","Python"], demo:"#"
  }
];

const cmdInput = document.getElementById('cmd');
const workspace = document.getElementById('workspace');
const template = document.getElementById('window-template');
const hints = document.querySelectorAll('.hint');
const bootOverlay = document.getElementById('boot-overlay');

// --- Gestor de ventanas para cierre por comando ---
let winCounter = 0;
const windowStack = [];

function createWindow(title, htmlContent){
  const tpl = template.content.cloneNode(true);
  const win = tpl.querySelector('.win');
  win.style.left = (50 + Math.random()*200) + 'px';
  win.style.top = (50 + Math.random()*120) + 'px';
  tpl.querySelector('.win-title').textContent = title;
  tpl.querySelector('.win-body').innerHTML = htmlContent;
  workspace.appendChild(tpl);
  const created = workspace.lastElementChild;
  created.dataset.winId = (++winCounter).toString();
  windowStack.push(created);
  makeDraggable(created);
  const closeBtn = created.querySelector('.close');
  const minBtn = created.querySelector('.min');
  closeBtn.onclick = ()=> closeWindow(created);
  minBtn.onclick = ()=> created.style.display = 'none';
  return created;
}

function closeWindow(el){
  const idx = windowStack.indexOf(el);
  if(idx>=0) windowStack.splice(idx,1);
  el.remove();
}
function closeLastWindow(){
  const el = windowStack.pop();
  if(el) el.remove();
}
function closeAllWindows(){
  while(windowStack.length){
    const el = windowStack.pop();
    el.remove();
  }
}

function makeDraggable(el){
  const bar = el.querySelector('.win-titlebar');
  let dragging=false, offsetX=0, offsetY=0;
  bar.addEventListener('pointerdown', (e)=>{
    dragging=true; bar.setPointerCapture(e.pointerId);
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    el.style.cursor='grabbing';
  });
  window.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
  });
  window.addEventListener('pointerup', ()=>{
    dragging=false; el.style.cursor='default';
  });
}

function listProjects(){
  let html = '<h3 class="glitch" data-text="MÓDULOS DE SISTEMA">MÓDULOS DE SISTEMA</h3><ul>';
  projects.forEach(p=>{
    html += `<li><strong>${p.id}. ${p.title}</strong> — <em>${p.tech.join(', ')}</em> <button onclick="runProject(${p.id})">ABRIR</button></li>`;
  });
  html += '</ul>';
  createWindow('LISTA DE MÓDULOS', html);
}

function runProject(id){
  const p = projects.find(x=>x.id===id);
  if(!p) return;
  const tech = p.tech.map(t=>`<span style="padding:4px 8px;border-radius:6px;border:1px solid rgba(0,240,255,0.06);margin-right:6px">${t}</span>`).join('');
  const html = `
    <h2 class="glitch" data-text="${p.title}">${p.title}</h2>
    <p>${p.desc}</p>
    <div>TECNOLOGÍAS: ${tech}</div>
    <div style="margin-top:12px"><button onclick="alert('Aquí podrías abrir la demo: ${p.demo}')">EJECUTAR_DEMO</button></div>
    <div style="margin-top:12px">
      <strong>FOTO:</strong>
      <div style="margin-top:8px">
        <img src="assets/photo_placeholder.svg" alt="Foto de Kennei (placeholder)" style="width:96px;height:96px;border-radius:8px;border:1px solid rgba(0,240,255,0.06)" />
        <div style="font-size:12px;color:#9ef7ff;margin-top:6px">Reemplaza por tu foto real en assets/kennei.jpg o .png</div>
      </div>
    </div>
  `;
  createWindow(`MÓDULO: ${p.title}`, html);
}

function ejecutarCV(){
  const html = `
    <h2 class="glitch" data-text="CURRÍCULUM">CURRÍCULUM</h2>
    <p><strong>Nombre:</strong> Kennei Santiago Romero Becerra</p>
    <p><strong>Rol:</strong> Desarrollador Web | Editor de Video | Ingeniero de Productos</p>
    <p><strong>Resumen:</strong> Apasionado por crear experiencias digitales y soluciones para redes y contenido visual. Especializado en creación de reels y UI interactivas.</p>
    <h4>Habilidades</h4>
    <div class="skill-map"></div>
  `;
  const win = createWindow('CV - VISOR', html);
  renderSkillMapIn(win);
}

function renderSkillMapIn(root){
  const el = root.querySelector('.skill-map');
  if(!el) return;
  el.innerHTML = '';
  const skills = ["HTML","CSS","JavaScript","Python","SQL","Git","Linux"];
  skills.forEach((s,i)=>{
    const d = document.createElement('div');
    d.textContent = s;
    d.style.display='inline-block';
    d.style.margin='6px';
    d.style.padding='8px 10px';
    d.style.borderRadius='8px';
    d.style.border='1px solid rgba(0,240,255,0.06)';
    d.style.opacity = 0.9 - (i*0.04);
    el.appendChild(d);
  });
}

function datosContacto(){
  const html = `
    <h2 class="glitch" data-text="PROTOCOLO DE COMUNICACIÓN">PROTOCOLO DE COMUNICACIÓN</h2>
    <p>Correo: <a href="mailto:kennei@example.com">kennei@example.com</a></p>
    <p>LinkedIn: <a href="#" onclick="alert('Abrir LinkedIn')">linkedin/kennei</a></p>
    <p>Github: <a href="#" onclick="alert('Abrir Github')">github/kennei</a></p>
    <div style="margin-top:12px"><button onclick="createWindow('FORM: COMMS','<h3>FORMULARIO DE CONTACTO</h3><p>Reemplaza con formulario real o Netlify form</p>')">INICIAR PROTOCOLO</button></div>
  `;
  createWindow('COMMS', html);
}

// --- Secciones solicitadas ---
function sobreMi(){
  const html = `
    <h2 class="glitch" data-text="SOBRE MÍ">SOBRE MÍ</h2>
    <div style="display:flex;gap:16px;align-items:center">
      <img src="assets/kennei.png" alt="Foto de Kennei Santiago Romero Becerra" style="width:120px;height:120px;border-radius:12px;border:1px solid rgba(0,240,255,0.06)" />
      <div>
        <p><strong>Nombre:</strong> Kennei Santiago Romero Becerra</p>
        <p><strong>Perfil:</strong> Creativo y técnico, enfocado en productos digitales, edición de video y desarrollo web.</p>
        <p><strong>Intereses:</strong> Reels, UI/UX, herramientas de productividad y experiencias interactivas.</p>
      </div>
    </div>
    <p style="font-size:12px;color:#9ef7ff">Para usar tu foto real, coloca un archivo en <code>assets/kennei.jpg</code> y actualiza la ruta.</p>
  `;
  createWindow('SOBRE MÍ', html);
}

function habilidades(){
  const html = `
    <h2 class="glitch" data-text="HABILIDADES">HABILIDADES</h2>
    <div class="skill-map"></div>
  `;
  const win = createWindow('HABILIDADES', html);
  renderSkillMapIn(win);
}

function proyectos(){
  listProjects();
}

function contacto(){
  datosContacto();
}

function showHelp(){
  const html = `
    <h3 class="glitch" data-text="AYUDA">AYUDA</h3>
    <pre>
LISTAR_PROYECTOS         — ver módulos disponibles
VER_PROYECTO &lt;n&gt;      — abrir módulo / proyecto
EJECUTAR_CV              — abrir currículum
DATOS_CONTACTO           — abrir protocolo de comunicación
SOBRE_MI                 — abrir sección Sobre mí
HABILIDADES              — abrir sección Habilidades
PROYECTOS                — abrir sección Proyectos
CONTACTO                 — abrir sección Contacto
CERRAR_ULTIMA            — cerrar la última ventana
CERRAR_TODO              — cerrar todas las ventanas
    </pre>
  `;
  createWindow('AYUDA', html);
}

function processCommand(raw){
  const cmd = raw.trim().toUpperCase();
  if(!cmd) return;
  if(cmd.startsWith('VER_PROYECTO')){
    const parts = cmd.split(' ');
    const id = parseInt(parts[1]||'0');
    runProject(id || 1);
  } else if(cmd==='LISTAR_PROYECTOS' || cmd==='PROYECTOS') listProjects();
  else if(cmd==='EJECUTAR_CV') ejecutarCV();
  else if(cmd==='DATOS_CONTACTO' || cmd==='CONTACTO') datosContacto();
  else if(cmd==='SOBRE_MI') sobreMi();
  else if(cmd==='HABILIDADES') habilidades();
  else if(cmd==='CERRAR_TODO') closeAllWindows();
  else if(cmd==='CERRAR_ULTIMA') closeLastWindow();
  else if(cmd==='AYUDA') showHelp();
  else {
    createWindow('CONSOLE', `<p>Comando no reconocido: <strong>${cmd}</strong></p><p>Escribe <code>AYUDA</code> para ver comandos.</p>`);
  }
}

cmdInput.addEventListener('keydown', (e)=>{
  if(e.key==='Enter'){
    processCommand(cmdInput.value);
    cmdInput.value='';
  } else if(e.key==='Tab'){
    e.preventDefault();
    // simple autocomplete: pick first hint
    const first = document.querySelector('.hint');
    if(first) cmdInput.value = first.dataset.cmd;
  }
});

hints.forEach(h=>{
  h.addEventListener('click', ()=> {
    cmdInput.value = h.dataset.cmd;
    cmdInput.focus();
  });
});

bootOverlay.addEventListener('click', ()=> {
  bootOverlay.style.display='none';
  cmdInput.focus();
});
