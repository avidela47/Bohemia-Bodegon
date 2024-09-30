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
  
  // Iterar sobre cada receta y crear una tarjeta
  recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('card');

      const imgElement = document.createElement('img');
      imgElement.src = recipe.image;
      imgElement.alt = recipe.name;

      const titleElement = document.createElement('h3');
      titleElement.textContent = recipe.name;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = 'Delicious ' + recipe.name + ' recipe.';

      const linkElement = document.createElement('a');
      linkElement.href = 'recipe1.html'; // Enlazar a una página de detalles de receta
      linkElement.classList.add('btn');
      linkElement.textContent = 'Ver Receta';

      // Añadir los elementos a la tarjeta
      card.appendChild(imgElement);
      card.appendChild(titleElement);
      card.appendChild(descriptionElement);
      card.appendChild(linkElement);

      // Añadir la tarjeta al contenedor de tarjetas
      cardsContainer.appendChild(card);
  });
}

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', loadRecipes);
