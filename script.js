/* ============================================================
   MILORD REALTY — script.js
   Archivo de interactividad del sitio web
   
   FUNCIONES PRINCIPALES:
   1. Efecto scroll en la navegación
   2. Animación de aparición al hacer scroll
   3. Abrir ventana modal de propiedad
   4. Cerrar ventana modal
   5. Cerrar modal al clic fuera o tecla Escape
   6. Confirmación del formulario de contacto
   ============================================================ */

/* ── 1. NAVEGACIÓN ──────────────────────────────────────────
   Agrega la clase 'scrolled' cuando el usuario hace scroll,
   cambiando el fondo de transparente a oscuro ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

/* ── 2. ANIMACIÓN DE APARICIÓN AL HACER SCROLL ─────────────
   Usa IntersectionObserver para detectar cuando los elementos
   con clase 'rev' son visibles y los anima suavemente ── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e,i) => {
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('vis'),i*70); /* Retardo escalonado */
      obs.unobserve(e.target); /* Solo se anima una vez */
    }
  });
}, {threshold:0.06}); /* Se activa con el 6% del elemento visible */
document.querySelectorAll('.rev').forEach(el => obs.observe(el));

/* ── 3. ABRIR MODAL ─────────────────────────────────────────
   Recibe el ID de la propiedad (ej: 'balboa', 'isla', 'casa',
   'firstline', 'secondline') y muestra su ventana modal ── */
function openModal(id) {
  document.getElementById('modal-'+id).classList.add('open');
  document.body.style.overflow='hidden'; /* Bloquea scroll del fondo */
  document.getElementById('modal-'+id).scrollTop=0;
}

/* ── 4. CERRAR MODAL ────────────────────────────────────────
   Oculta la ventana modal y restaura el scroll ── */
function closeModal(id) {
  document.getElementById('modal-'+id).classList.remove('open');
  document.body.style.overflow='';
}

/* ── 5A. CERRAR AL HACER CLIC EN EL FONDO OSCURO ───────────
   Si el usuario hace clic fuera del contenido del modal,
   se cierra automáticamente ── */
document.querySelectorAll('.mo').forEach(o => {
  o.addEventListener('click', e => {
    if(e.target===o){
      o.classList.remove('open');
      document.body.style.overflow='';
    }
  });
});

/* ── 5B. CERRAR CON TECLA ESCAPE ────────────────────────────── */
document.addEventListener('keydown', e => {
  if(e.key==='Escape')
    document.querySelectorAll('.mo.open').forEach(m=>{
      m.classList.remove('open');
      document.body.style.overflow='';
    });
});

/* ── 6. FORMULARIO DE CONTACTO ──────────────────────────────
   Muestra confirmación visual cuando el usuario envía
   una consulta. El botón cambia temporalmente a verde ── */
document.getElementById('submitBtn').addEventListener('click', function(){
  this.textContent='Consulta Enviada ✓';
  this.style.background='#4a7c59'; /* Verde de confirmación */
  this.style.color='#fff';
  setTimeout(()=>{
    this.textContent='Send Inquiry';
    this.style.background='';
    this.style.color='';
  },3500);
});
