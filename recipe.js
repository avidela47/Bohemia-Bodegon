// Función para cargar el archivo JSON
async function loadRecipes() {
  try {
      const response = await fetch('recetas.json'); // Cargar el archivo JSON
      if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
      }

      const recipesData = await response.json(); // Convertir la respuesta a JSON
      renderRecipes(recipesData.recipes); // Pasar los datos de las recetas a la función de renderizado
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
      descriptionElement.textContent = 'Delicious ' + recipe.name + ' recipe.';

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

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', loadRecipes);

