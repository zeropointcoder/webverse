<script setup>
import { inject, onMounted, ref } from 'vue'
// import axios from 'axios'

const store = inject('store')

// const baseUrl = 'http://localhost:3000/eatery'

const recipes = ref([])
// const recipeNew = ref({})
// const recipeEdit = ref({})

const recipeId = ref('')

const dish = ref('')
const recipe = ref('')
const price = ref(null)
const diet = ref('')
const desc = ref('')
const prepTime = ref(null)
const available = ref(false)

onMounted(() => {
  // onLoad()
  store.methods.onLoad()
})

// const onLoad = async () => {
//   try {
//     const {data} = await axios.get(`${baseUrl}`)
//     recipes.value = data
//   } catch (err) {
//     console.error(err?.message)
//   }
// }

const onAdd = () => {
  if(!dish.value || !recipe.value || price.value === null || !diet.value || !desc.value || prepTime.value === null) {
    return
  }
  
  const recipeObj = createRecipeObj(dish.value, recipe.value, price.value, diet.value, desc.value, prepTime.value, available.value)

  // try {
  //   const {data} = await axios.post(`${baseUrl}`, recipeObj)
  //   recipeNew.value = data
  //   recipeEdit.value = {}
  //   recipes.value = [...recipes.value, data]

  //   onResetForm()
  //   onCloseModal()
  // } catch (err) {
  //   console.error(err?.message)
  // }
  store.methods.onAdd(recipeObj)

  onResetForm()
  onCloseModal()
}

const onUpdate = () => {
  if(!dish.value || !recipe.value || price.value === null || !diet.value || !desc.value || prepTime.value === null) {
    return
  }

  const recipeObj = createRecipeObj(dish.value, recipe.value, price.value, diet.value, desc.value, prepTime.value, available.value)

  // try {
  //   const {data} = await axios.put(`${baseUrl}/${recipeId.value}`, recipeObj)
  //   recipeEdit.value = data
  //   recipeNew.value = {}
  //   recipes.value = recipes.value.map(recipe => recipe.id === recipeId.value ? data : recipe)

  //   onResetForm()
  //   onCloseModal()
  // } catch (err) {
  //   console.error(err?.message)
  // }
  store.methods.onUpdate(recipeObj, recipeId.value)

  onResetForm()
  onCloseModal()
}

const onDelete = (recipeId) => {
  // try {
  //   const {data} = await axios.delete(`${baseUrl}/${recipeId}`)
  //   console.log(data)
  //   recipeNew.value = {}
  //   recipeEdit.value = {}
  //   recipes.value = recipes.value.filter(recipe => recipe.id !== recipeId)

  //   onResetForm()
  // } catch (err) {
  //   console.error(err?.message)
  // }
  store.methods.onDelete(recipeId)

  onResetForm()
}

const onFileChange = (event) => {
  const file = event.target.files[0]

  if(!file) return

  // validate file type
  if(!file.type.startsWith('image/')) {
    alert('Only image files are allowed!')
    return
  }

  // limit file size (up to 2MB)
  if(file.size > 2 * 1024 * 1024) {
    alert('Image must be less than 2MB!')
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    dish.value = reader.result 
  }

  reader.readAsDataURL(file)
}

const createRecipeObj = (dish, recipe, price, diet, desc, prepTime, available) => {
  return {
    dish: dish,
    recipe: recipe,
    price: Number(price),
    diet: diet,
    desc: desc,
    prepTime: Number(prepTime),
    available: available === 'true' || available === true
  }
}

const onUpdateCta = (recipeObj) => {
  dish.value = recipeObj.dish
  recipe.value = recipeObj.recipe
  price.value = recipeObj.price
  diet.value = recipeObj.diet
  desc.value = recipeObj.desc
  prepTime.value = recipeObj.prepTime
  available.value = recipeObj.available

  recipeId.value = recipeObj.id
}

const onResetForm = () => {
  dish.value = ''
  recipe.value = ''
  price.value = null
  diet.value = ''
  desc.value = ''
  prepTime.value = null
  available.value = false
}

const onCloseModal = () => {
  const btnclose = document.getElementById('btn-close')
  btnclose?.click()
}

</script>

<template>
    
  <div class="table-responsive">
    <table class="table table-success">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">update</th>
          <th scope="col">delete</th>
          <th scope="col">id</th>
          <th scope="col">dish</th>
          <th scope="col">recipe</th>
          <th scope="col">price</th>
          <th scope="col">diet</th>
          <th scope="col">desc</th>
          <th scope="col">prepTime</th>
          <th scope="col">available</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recipe, index) in store.state.recipes" :key="recipe.id">
          <th scope="row">{{index+1}}</th>
          <td>
            <button @click="onUpdateCta(recipe)" type="button" class="btn btn-sm btn-outline-info" data-bs-toggle="modal" data-bs-target="#recipeFormModal">✏️</button>
          </td>
          <td>
            <button @click="onDelete(recipe.id)" type="button" class="btn btn-sm btn-outline-secondary">🗑️</button>
          </td>
          <td>{{recipe.id}}</td>
          <td>
            <img :src="recipe.dish || 'https://placehold.co/40'" width="40" height="40" style="border-radius: 50%; object-fit: cover;" :alt="recipe.recipe" />
          </td>
          <td>{{recipe.recipe}}</td>
          <td>{{recipe.price}}</td>
          <td>{{recipe.diet}}</td>
          <td>{{recipe.desc}}</td>
          <td>{{recipe.prepTime}}</td>
          <td>{{recipe.available}}</td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="recipeFormModal" tabindex="-1" aria-labelledby="recipeFormModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-uppercase text-dark" id="recipeFormModalLabel">Recipe form</h1>
          <button type="button" id="btn-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row g-3 align-items-center mb-3">
                <div id="detailsHelp" class="form-text">We'll never share your personal details with anyone else.</div>

                <div class="col">
                    <label for="dish" class="form-label">dish</label>
                </div>
                <div class="col">
                    <input @change="onFileChange($event)" name="dish" type="file" accept="image/*" class="form-control" id="recipe" />
                    <img v-if="dish" :src="dish" width="90" height="90" class="mt-2" style="border-radius: 50%; object-fit: cover;" />
                    <p>Image selected ✅</p>
                </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
                <div class="col">
                    <label for="recipe" class="form-label">recipe</label>
                </div>
                <div class="col">
                    <input v-model="recipe" name="recipe" type="text" class="form-control" id="recipe" placeholder="e.g. Margherita Pizza" aria-describedby="detailsHelp" />
                </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
                <div class="col">
                    <label for="price" class="form-label">price</label>
                </div>
                <div class="col">
                    <input v-model.number="price" name="price" type="number" class="form-control" id="price" placeholder="e.g. 9.99" aria-describedby="detailsHelp" />
                </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
                <div class="col">
                    <label for="diet" class="form-label">diet</label>
                </div>
                <div class="col">
                    <select v-model="diet" name="diet"  class="form-control" id="diet" aria-describedby="detailsHelp">
                      <option disabled value="">Select diet</option>
                      <option value="vegan">vegan</option>
                      <option value="vegetarian">vegetarian</option>
                      <option value="non-veg">non-vegetarian</option>
                    </select>
                </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
                <div class="col">
                    <label for="desc" class="form-label">desc</label>
                </div>
                <div class="col">
                    <textarea v-model="desc" name="desc" class="form-control" id="desc" placeholder="Short description of the dish" aria-describedby="detailsHelp">
                    </textarea>
                </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
                <div class="col">
                    <label for="prepTime" class="form-label">prepTime</label>
                </div>
                <div class="col">
                    <input v-model.number="prepTime" name="prepTime" type="number" min="1" class="form-control" id="prepTime" placeholder="Time in minutes" aria-describedby="detailsHelp" />
                </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
                <div class="col">
                    <label for="available" class="form-label">available</label>
                </div>
                <div class="col">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" :value="true" v-model="available" />
                      <label class="form-check-label">available</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" :value="false" v-model="available" />
                      <label class="form-check-label">Not available</label>
                    </div>
                </div>
            </div>
        </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">cancel</button>
          <button @click="onUpdate()" type="button" class="btn btn-info btn-sm">update</button>
          <button @click="onAdd()" type="button" class="btn btn-danger btn-sm">add</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  
</template>
