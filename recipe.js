// Función para cargar el archivo JSON
async function loadRecipes() {
  try {
    const response = await fetch('recetas.json'); // Cargar el archivo JSON
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }

    const recipesData = await response.json(); // Convertir la respuesta a JSON
    renderRecipes(recipesData.recipes); // Pasar los datos de las recetas a la función de renderizado
    return recipesData.recipes; // Devolver las recetas para usarlas en la búsqueda
  } catch (error) {
    console.error(error);
  }
}

// Función para renderizar las recetas en el HTML
function renderRecipes(recipes) {
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas recetas

  // Iterar sobre cada receta y crear una tarjeta
  recipes.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const imgElement = document.createElement('img');
    imgElement.src = recipe.image;
    imgElement.alt = recipe.name;

    const titleElement = document.createElement('h3');
    titleElement.textContent = recipe.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = 'Deliciosa ' + ' receta de' + recipe.tipo;

    const linkElement = document.createElement('button'); // Usar un botón en lugar de un enlace
    linkElement.classList.add('btn');
    linkElement.textContent = 'Ver Receta';
    linkElement.addEventListener('click', () => loadRecipeFromJson(index)); // Añadir evento para abrir el modal

    // Añadir los elementos a la tarjeta
    card.appendChild(imgElement);
    card.appendChild(titleElement);
    card.appendChild(descriptionElement);
    card.appendChild(linkElement);

    // Añadir la tarjeta al contenedor de tarjetas
    cardsContainer.appendChild(card);
  });
}

// Función para abrir el modal con los detalles de la receta
function openRecipeModal(recipe) {
  const modal = document.getElementById('recipeModal');
  const recipeImage = document.getElementById('recipeImage');
  const recipeTitle = document.getElementById('recipeTitle');
  const recipeIngredients = document.getElementById('recipeIngredients');
  const recipeInstructions = document.getElementById('recipeInstructions');

  // Setear la imagen, el título, los ingredientes y las instrucciones
  recipeImage.src = recipe.image;
  recipeTitle.textContent = recipe.name;

  // Limpiar contenido previo de ingredientes e instrucciones
  recipeIngredients.innerHTML = '';
  recipeInstructions.innerHTML = '';

  // Cargar los ingredientes
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
    recipeIngredients.appendChild(li);
  });

  // Cargar las instrucciones
  recipe.instructions.forEach(instruction => {
    const li = document.createElement('li');
    li.textContent = instruction;
    recipeInstructions.appendChild(li);
  });

  // Mostrar el modal
  modal.style.display = 'block';
}

// Función para cerrar el modal
function closeRecipeModal() {
  const modal = document.getElementById('recipeModal');
  modal.style.display = 'none';
}

// Cerrar el modal cuando se toca el botón de cierre
document.querySelector('.close-button').addEventListener('click', closeRecipeModal);

// Cargar y mostrar los detalles de la receta desde el JSON cuando se hace clic en "Ver Receta"
async function loadRecipeFromJson(recipeIndex) {
  try {
    const response = await fetch('recetas.json'); // Cargar el archivo JSON
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }

    const recipesData = await response.json();
    const recipe = recipesData.recipes[recipeIndex]; // Seleccionar la receta según el índice
    openRecipeModal(recipe); // Abrir el modal con la receta seleccionada
  } catch (error) {
    console.error(error);
  }
}

// Referencias de elementos HTML
const searchInput = document.getElementById('searchInput');
const cardsContainer = document.querySelector('.cards-container');
let allRecipes = []; // Variable para almacenar todas las recetas

// Función para mostrar las recetas
function displayRecipes(recipesToDisplay) {
  cardsContainer.innerHTML = ''; // Limpiar el contenedor

  recipesToDisplay.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('card'); // Asegúrate de que la clase sea 'card'

    card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}">
          <h3>${recipe.name}</h3>
          <p>Deliciosa receta de ${recipe.tipo}</p>
          <button class="btn" onclick="loadRecipeFromJson(${allRecipes.indexOf(recipe)})">Ver Receta</button>
      `;

    cardsContainer.appendChild(card);
  });
}

// Función para filtrar recetas por nombre
function filterRecipesByName(searchTerm) {
  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayRecipes(filteredRecipes);
}

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
  allRecipes = await loadRecipes(); // Cargar recetas y almacenarlas
  displayRecipes(allRecipes); // Mostrar todas las recetas al cargar la página
});

// Evento de búsqueda
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  filterRecipesByName(searchTerm);
});


