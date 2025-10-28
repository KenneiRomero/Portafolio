/* Portafolio interactivo tipo terminal retro / sci-fi
   Comandos:
   - LISTAR_PROYECTOS
   - VER_PROYECTO <n>
   - EJECUTAR_CV
   - DATOS_CONTACTO
   - EJECUTAR_DEMO <n>
   - AYUDA
*/

const projects = [
  {
    id: 1,
    title: "HappyFeet Veterinaria",
    desc: "HappyFeet es un sistema integral de gestión para clínicas veterinarias desarrollado en Java que implementa todos los módulos requeridos para el correcto funcionamiento de una clinica veterinaria. El sistema maneja desde la gestión básica de pacientes hasta actividades especiales como adopciones y jornadas de vacunación.",
    tech: ["MySQL", "Java"],
    demo: "https://github.com/Monteroo0/HappyFeet_Veterinaria_MonteroJuan_RomeroKennei",
    image: "assets/happyfeet.png"
  },
  {
    id: 2,
    title: "ACME Bank",
    desc: "El Banco Acme ha desarrollado una aplicación web que permite a los usuarios la autogestión de sus cuentas bancarias, ofreciendo funcionalidades como registro, recuperación de contraseña, visualización de movimientos, transacciones en línea, pagos de servicios y emisión de certificados.",
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://github.com/Monteroo0/ACME-Bank",
    image: "assets/acmebank.png"
  },
  {
    id: 3,
    title: "Gestión de Finca El Ubérrimo",
    desc: "ProyectoFinca es un sistema de base de datos MySQL diseñado para gestionar las operaciones de la finca El Ubérrimo en Montería, Córdoba, Colombia. Permite el control eficiente de empleados, cultivos, inventarios y ventas, optimizando la administración agrícola y comercial de la finca.",
    tech: ["MySQL"],
    demo: "https://github.com/KenneiRomero/Proyecto_MYSQL_GestionFinca",
    image: "assets/gestionfinca.jpg"
  },
  {
    id: 4,
    title: "Sitio Web para Bodas",
    desc: "Captura de Emociones es un sitio web profesional y responsivo diseñado para un servicio de planificación de bodas y fotografía. Su propósito es destacar la esencia de las celebraciones nupciales mediante un diseño visual estructurado y una experiencia interactiva. Construido con HTML y CSS, permite explorar servicios, visualizar galerías, personalizar paquetes y contactar al equipo, optimizado para escritorio y dispositivos móviles.",
    tech: ["HTML", "CSS"],
    demo: "https://github.com/KenneiRomero/Proyecto-CSS-y-HTML",
    image: "assets/htmlcss.png"
  }
];

const cmdInput = document.getElementById('cmd');
const workspace = document.getElementById('workspace');
const template = document.getElementById('window-template');
const hints = document.querySelectorAll('.hint');
const bootOverlay = document.getElementById('boot-overlay');

// --- Gestor de ventanas ---
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
    if (e.target.closest('.win-actions')) return;
    dragging=true; 
    bar.setPointerCapture(e.pointerId);
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


// === PROYECTOS ===
function listProjects(){
  let html = `
    <h3 class="glitch" data-text="PROYECTOS">PROYECTOS</h3>
    <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:12px">
  `;
  projects.forEach(p=>{
    const imageSrc = p.image || 'assets/projects/default.png';
    html += `
      <li style="background:rgba(0,240,255,0.05);border:1px solid rgba(0,240,255,0.1);padding:12px;border-radius:12px;box-shadow:0 0 8px rgba(0,240,255,0.1)">
        <strong style="color:#00eaff;font-size:16px;">${p.id}. ${p.title}</strong>
        <p style="margin-top:4px;color:#aefaff;">${p.desc}</p>
        <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
          ${p.tech.map(t=>`<span style="border:1px solid rgba(0,240,255,0.2);padding:4px 8px;border-radius:6px;font-size:12px;color:#9ef7ff;">${t}</span>`).join('')}
        </div>
        <div style="margin-top:10px;display:flex;align-items:center;gap:12px;">
          <img src="${imageSrc}" alt="Imagen del proyecto ${p.title}" onerror="this.src='assets/projects/default.png'" style="width:120px;height:80px;border-radius:8px;border:1px solid rgba(0,240,255,0.15);object-fit:cover;background:rgba(0,240,255,0.03)">
          <button onclick="runProject(${p.id})" style="padding:6px 10px;border-radius:8px;border:1px solid rgba(0,240,255,0.4);background:none;color:#00eaff;cursor:pointer;">VER DETALLES</button>
        </div>
      </li>
    `;
  });
  html += `</ul>`;
  createWindow('LISTA DE PROYECTOS', html);
}

function runProject(id){
  const p = projects.find(x=>x.id===id);
  if(!p) return;
  const tech = p.tech.map(t=>`<span style="padding:4px 8px;border-radius:6px;border:1px solid rgba(0,240,255,0.2);margin-right:6px;color:#9ef7ff">${t}</span>`).join('');
  const imageSrc = p.image || 'assets/projects/default.png';
  const html = `
    <h2 class="glitch" data-text="${p.title}">${p.title}</h2>
    <p>${p.desc}</p>
    <div style="margin:8px 0;">TECNOLOGÍAS: ${tech}</div>
    <div style="margin-top:10px;">
      <img src="${imageSrc}" alt="Imagen del proyecto ${p.title}" onerror="this.src='assets/projects/default.png'" style="width:100%;max-width:420px;border-radius:12px;border:1px solid rgba(0,240,255,0.15);object-fit:cover;background:rgba(0,240,255,0.03)">
    </div>
    <div style="margin-top:12px">
      <a href="${p.demo}" target="_blank" style="color:#00eaff;text-decoration:none;border:1px solid rgba(0,240,255,0.4);padding:6px 10px;border-radius:6px;">🔗 Ver en GitHub</a>
    </div>
  `;
  createWindow(`PROYECTO: ${p.title}`, html);
}

// === HABILIDADES ===
function renderSkillMapIn(root){
  const el = root.querySelector('.skill-map');
  if(!el) return;
  el.innerHTML = '';

  const techSkills = [
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  ];

  const techContainer = document.createElement('div');
  const techTitle = document.createElement('h3');
  techTitle.textContent = "Habilidades Técnicas";
  techTitle.style.color = "#00eaff";
  techTitle.style.marginBottom = "8px";
  techContainer.appendChild(techTitle);
  techContainer.appendChild(document.createElement('div')).style.height = "10px";
  techContainer.style.display = 'flex';
  techContainer.style.flexWrap = 'wrap';
  techContainer.style.gap = '16px';

  techSkills.forEach(skill => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.width = '90px';
    div.style.padding = '8px';
    div.style.border = '1px solid rgba(0,240,255,0.25)';
    div.style.borderRadius = '10px';
    div.style.background = 'rgba(0,240,255,0.05)';
    div.style.boxShadow = '0 0 8px rgba(0,240,255,0.15)';
    div.style.transition = '0.3s ease all';
    div.onmouseenter = () => div.style.boxShadow = '0 0 15px rgba(0,240,255,0.5)';
    div.onmouseleave = () => div.style.boxShadow = '0 0 8px rgba(0,240,255,0.15)';

    const img = document.createElement('img');
    img.src = skill.icon;
    img.alt = skill.name;
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.marginBottom = '6px';

    const label = document.createElement('span');
    label.textContent = skill.name;
    label.style.fontSize = '12px';
    label.style.color = '#aefaff';

    div.appendChild(img);
    div.appendChild(label);
    techContainer.appendChild(div);
  });

  el.appendChild(techContainer);

  const softSkills = [
    "Liderazgo", "Creatividad", "Empatía", "Disciplina",
    "Adaptabilidad", "Paciencia", "Proactividad", "Comunicación"
  ];

  const softContainer = document.createElement('div');
  const softTitle = document.createElement('h3');
  softTitle.textContent = "Habilidades Blandas";
  softTitle.style.color = "#00eaff";
  softTitle.style.margin = "20px 0 8px";
  softContainer.appendChild(softTitle);
  softContainer.appendChild(document.createElement('div')).style.height = "10px";
  softContainer.style.display = 'flex';
  softContainer.style.flexWrap = 'wrap';
  softContainer.style.gap = '10px';

  softSkills.forEach(skill => {
    const tag = document.createElement('div');
    tag.textContent = skill;
    tag.style.padding = '6px 10px';
    tag.style.border = '1px solid rgba(0,240,255,0.25)';
    tag.style.borderRadius = '8px';
    tag.style.fontSize = '13px';
    tag.style.color = '#9ef7ff';
    tag.style.background = 'rgba(0,240,255,0.05)';
    tag.style.boxShadow = '0 0 6px rgba(0,240,255,0.15)';
    tag.style.transition = '0.3s ease';
    tag.onmouseenter = () => tag.style.boxShadow = '0 0 12px rgba(0,240,255,0.5)';
    tag.onmouseleave = () => tag.style.boxShadow = '0 0 6px rgba(0,240,255,0.15)';
    softContainer.appendChild(tag);
  });

  el.appendChild(softContainer);
}

function habilidades(){
  const html = `
    <p>Estas son mis habilidades técnicas y blandas que me permiten crear, colaborar y liderar proyectos con eficiencia.</p>
    <div class="skill-map" style="margin-top:10px"></div>
  `;
  const win = createWindow('HABILIDADES', html);
  renderSkillMapIn(win);
}

// === CURRÍCULUM ===
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

// === CONTACTO ===
function datosContacto(){
  const html = `
    <h2 class="glitch" data-text="PROTOCOLO DE COMUNICACIÓN">PROTOCOLO DE COMUNICACIÓN</h2>
    <p>Correo: <a href="mailto:kennei@example.com" style="color:#00eaff">kennei@example.com</a></p>
    <p>LinkedIn: <a href="https://linkedin.com/in/kennei" target="_blank" style="color:#00eaff">linkedin.com/in/kennei</a></p>
    <p>GitHub: <a href="https://github.com/KenneiRomero" target="_blank" style="color:#00eaff">github.com/KenneiRomero</a></p>
    <div style="margin-top:12px">
      <button onclick="createWindow('FORM: COMMS','<h3>FORMULARIO DE CONTACTO</h3><p>Puedes reemplazar este texto con un formulario real o con integración a Netlify.</p>')" 
      style="padding:8px 12px;border-radius:8px;background:none;color:#00eaff;border:1px solid rgba(0,240,255,0.4);cursor:pointer;">
        INICIAR PROTOCOLO
      </button>
    </div>
  `;
  createWindow('COMMS', html);
}

// === SOBRE MÍ ===
function sobreMi(){
  const html = `
    <h2 class="glitch" data-text="SOBRE MÍ">SOBRE MÍ</h2>
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
      <img src="assets/kennei.png" alt="Foto de Kennei Santiago Romero Becerra" 
      style="width:120px;height:120px;border-radius:12px;border:1px solid rgba(0,240,255,0.06);object-fit:cover;" />
      <div>
        <p><strong>Nombre:</strong> Kennei Santiago Romero Becerra</p>
        <p><strong>Perfil:</strong> Creativo y técnico, enfocado en productos digitales, edición de video y desarrollo web.</p>
        <p><strong>Intereses:</strong> Reels, UI/UX, herramientas de productividad y experiencias interactivas.</p>
      </div>
    </div>
    <p style="font-size:12px;color:#9ef7ff;margin-top:10px;">
      Para usar tu foto real, coloca un archivo en <code>assets/kennei.png</code> y actualiza la ruta.
    </p>
  `;
  createWindow('SOBRE MÍ', html);
}

// === AYUDA ===
function showHelp(){
  const html = `
    <h3 class="glitch" data-text="AYUDA">AYUDA</h3>
    <pre style="color:#9ef7ff">
LISTAR_PROYECTOS       — Ver lista de proyectos
VER_PROYECTO <n>      — Abrir proyecto por ID
EJECUTAR_CV            — Mostrar currículum
DATOS_CONTACTO         — Ver datos de contacto
SOBRE_MI               — Mostrar información personal
HABILIDADES            — Mostrar habilidades
CERRAR_ULTIMA          — Cerrar la última ventana
CERRAR_TODO            — Cerrar todas las ventanas
AYUDA                  — Mostrar este panel de ayuda
    </pre>
  `;
  createWindow('AYUDA', html);
}

// === PROCESADOR DE COMANDOS ===
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
  else if(cmd==='SOBRE_MI' || cmd==='SOBREMI') sobreMi();
  else if(cmd==='HABILIDADES') habilidades();
  else if(cmd==='CERRAR_ULTIMA') closeLastWindow();
  else if(cmd==='CERRAR_TODO') closeAllWindows();
  else if(cmd==='AYUDA') showHelp();
  else createWindow('ERROR', `<p>Comando no reconocido: <strong>${cmd}</strong></p><p>Usa <strong>AYUDA</strong> para ver la lista.</p>`);
}

// === BOOT DEL SISTEMA ===
function bootSequence(){
  bootOverlay.style.opacity = 1;
  bootOverlay.innerHTML = "<p>Inicializando sistema...</p>";
  setTimeout(()=>bootOverlay.innerHTML += "<p>Cargando módulos de interfaz...</p>", 1000);
  setTimeout(()=>bootOverlay.innerHTML += "<p>Configurando entorno de usuario...</p>", 2000);
  setTimeout(()=>{
    bootOverlay.style.transition = "opacity 1s ease";
    bootOverlay.style.opacity = 0;
    setTimeout(()=>bootOverlay.style.display = "none", 1000);
    createWindow("TERMINAL", "<p>Sistema iniciado. Escribe <strong>AYUDA</strong> para comenzar.</p>");
  }, 3500);
}

// === INTERACCIÓN DE ARRANQUE ===
bootOverlay.addEventListener('click', () => {
  // Transición de apagado del overlay
  bootOverlay.style.transition = "opacity 1s ease";
  bootOverlay.style.opacity = 0;
  setTimeout(() => {
    bootOverlay.style.display = "none";
    createWindow("TERMINAL", "<p>Sistema iniciado. Escribe <strong>AYUDA</strong> para comenzar.</p>");
  }, 1000);
});


// === INPUT COMANDOS ===
cmdInput.addEventListener('keydown', e=>{
  if(e.key === 'Enter'){
    const value = cmdInput.value.trim();
    if(value){
      processCommand(value);
      cmdInput.value = '';
    }
  }
});

// === EVENTOS DE HINTS ===
hints.forEach(hint=>{
  hint.addEventListener('click', ()=>{
    cmdInput.value = hint.dataset.cmd;
    cmdInput.focus();
  });
});

// === INICIO AUTOMÁTICO ===
