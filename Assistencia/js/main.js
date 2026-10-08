const NOMES = {todos:"Todos", montagem:"Montagem", hardware:"Hardware", software:"Software"};

document.querySelectorAll("[data-nome]").forEach(e => e.textContent = CONFIG.nome);
document.title = CONFIG.nome + " | Assistência Técnica de Computadores e Notebooks";
document.getElementById("ano").textContent = new Date().getFullYear();
document.querySelectorAll("[data-zap]").forEach(a => {
  a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(a.dataset.zap);
  a.target = "_blank"; a.rel = "noopener";
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("menu-principal");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));
}

const grid = document.getElementById("grid");
const filters = document.querySelector(".filters");

function esc(s){return s.replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}

function render(cat){
  grid.innerHTML = TRABALHOS.filter(t => cat === "todos" || t.cat === cat).map(t => `
    <article class="item">
      ${t.img ? `<img src="${esc(t.img)}" alt="${esc(t.titulo)}" loading="lazy">` : `<div class="ph">Foto do trabalho</div>`}
      <div class="t"><span class="tag">${NOMES[t.cat]}</span><h3>${esc(t.titulo)}</h3><p>${esc(t.desc)}</p></div>
    </article>`).join("");
}

Object.keys(NOMES).forEach(cat => {
  const b = document.createElement("button");
  b.type = "button"; b.textContent = NOMES[cat];
  b.setAttribute("aria-pressed", cat === "todos");
  b.onclick = () => {
    filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    render(cat);
  };
  filters.appendChild(b);
});
render("todos");
