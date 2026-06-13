import { reactive } from 'vue'
import axios from 'axios'

const baseUrl = 'http://localhost:3000/eatery'

const state = reactive({
    recipes: [],
    recipeNew: {},
    recipeEdit: {}
})

const methods = {
    onLoad: async () => {
        try {
            const {data} = await axios.get(`${baseUrl}`)
            methods.onLoadSuccess(data)
        } catch (err) {
            console.error(err?.message)
        }
    },
    onLoadSuccess: (recipes) => {
        state.recipes = recipes
    },
    onAdd: async (recipeObj) => {
        try {
            const {data} = await axios.post(`${baseUrl}`, recipeObj)
            methods.onAddSuccess(data)
        } catch (err) {
            console.error(err?.message)
        }
    },
    onAddSuccess: (recipeNew) => {
        state.recipeNew = recipeNew
        state.recipeEdit = {}
        state.recipes.push(recipeNew)
    },
    onUpdate: async (recipeObj, recipeId) => {
        try {
            const {data} = await axios.put(`${baseUrl}/${recipeId}`, recipeObj)
            methods.onUpdateSuccess(data)
        } catch (err) {
            console.error(err?.message)
        }
    },
    onUpdateSuccess: (recipeEdit) => {
        state.recipeEdit = recipeEdit
        state.recipeNew = {}
        state.recipes = state.recipes.map(rec => recipeEdit.id === rec.id ? recipeEdit : rec)
    },
    onDelete: async (recipeId) => {
        try {
            const {data} = await axios.delete(`${baseUrl}/${recipeId}`)
            methods.onDeleteSuccess(data)
        } catch (err) {
            console.error(err?.message)
        }
    },
    onDeleteSuccess: (recipe) => {
        state.recipeNew = {}
        state.recipeEdit = {}
        state.recipes = state.recipes.filter(rec => rec.id !== recipe.id)
    }
}

const getters = {}

export default {
    state,
    methods,
    getters,
}