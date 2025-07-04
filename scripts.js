let posts = JSON.parse(localStorage.getItem("posts")) || [];

const form = document.getElementById("form-post");
const lista = document.getElementById("lista-posts");
const filtro = document.getElementById("filtro-categoria");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoPost = {
    id: Date.now(),
    titulo: document.getElementById("titulo").value,
    contenido: document.getElementById("contenido").value,
    autor: document.getElementById("autor").value,
    categoria: document.getElementById("categoria").value,
    fecha: new Date().toLocaleDateString(),
  };

  posts.push(nuevoPost);
  guardarYMostrar();
  form.reset();
});

filtro.addEventListener("change", mostrarPosts);

function guardarYMostrar() {
  localStorage.setItem("posts", JSON.stringify(posts));
  mostrarPosts();
}

function mostrarPosts() {
  const categoriaSeleccionada = filtro.value;
  lista.innerHTML = "";

  posts
    .filter(p => !categoriaSeleccionada || p.categoria === categoriaSeleccionada)
    .forEach(post => {
      const div = document.createElement("div");
      div.classList.add("card", "mb-3");
      div.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${post.titulo}</h5>
          <p class="card-text">${post.contenido}</p>
          <p class="card-text">
            <small class="text-muted">${post.fecha} - ${post.autor} - ${post.categoria}</small>
          </p>
          <button class="btn btn-warning btn-sm me-2" onclick="editar(${post.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminar(${post.id})">Eliminar</button>
        </div>
      `;
      lista.appendChild(div);
    });
}

function eliminar(id) {
  posts = posts.filter(p => p.id !== id);
  guardarYMostrar();
}

function editar(id) {
  const post = posts.find(p => p.id === id);
  document.getElementById("titulo").value = post.titulo;
  document.getElementById("contenido").value = post.contenido;
  document.getElementById("autor").value = post.autor;
  document.getElementById("categoria").value = post.categoria;
  eliminar(id);
}

// Mostrar al cargar
mostrarPosts();
