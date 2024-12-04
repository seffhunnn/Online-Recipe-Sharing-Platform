document.getElementById('postRecipeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const dishName = document.getElementById('dish-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const process = document.getElementById('process').value;
    const dishImage = document.getElementById('dish-image').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const newRecipe = { 
            dishName, 
            ingredients, 
            process, 
            imageUrl: event.target.result 
        };
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        alert('Recipe posted successfully!');
        document.getElementById('postRecipeForm').reset();
        window.location.href = 'index.html'; 
    };
    reader.readAsDataURL(dishImage); 
});


window.addEventListener('load', function() {
    const recipeList = document.querySelector('.recipe-list');
    if (recipeList) {
        renderRecipes();
    }
});


function renderRecipes() {
    const recipeList = document.querySelector('.recipe-list');
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipeList.innerHTML = ''; 

    recipes.forEach((recipe, index) => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        recipeItem.innerHTML = `
            <img src="${recipe.imageUrl}" width="250px" alt="${recipe.dishName}">
            <p>${recipe.dishName}</p>
            <button class="delete-recipe-btn" data-index="${index}">Delete</button>
        `;
        recipeItem.querySelector('.delete-recipe-btn').addEventListener('click', function() {
            deleteRecipe(index);
        });
        recipeItem.addEventListener('click', function() {
            localStorage.setItem('currentRecipe', JSON.stringify(recipe));
            window.location.href = 'recipe.html';
        });
        recipeList.appendChild(recipeItem);
    });
}


function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1); 
    localStorage.setItem('recipes', JSON.stringify(recipes)); 
    renderRecipes(); 
}

window.addEventListener('load', function() {
    const recipe = JSON.parse(localStorage.getItem('currentRecipe'));
    if (recipe) {
        document.getElementById('recipe-title').textContent = recipe.dishName;
        document.getElementById('recipe-description').innerHTML = `
            <strong>Ingredients:</strong> <br> ${recipe.ingredients} <br><br>
            <strong>Process:</strong> <br> ${recipe.process}
        `;
    }
});
