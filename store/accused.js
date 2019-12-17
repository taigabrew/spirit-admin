import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { createStore } from 'pinia'

Vue.use(VueCompositionApi)

export const useAccusedStore = createStore(
  'accussed',
  () => ({
    list: []
  }),
  {
    findPersonIndex: state => pid =>
      state.list.findIndex(person => person.id === pid),
    findPerson: state => pid => state.list.find(person => person.id === pid),
    getLastId: state =>
      state.list.length ? state.list[state.list.length - 1].id : 1
  }
)

const store = useAccusedStore()

export async function fetchAccusedList($axios) {
  try {
    const { data } = await $axios.get(
      `${process.env.API_PATH}/user/get_all_accuseds`
    )

    const { result } = data
    store.state.list = result
  } catch (error) {
    console.error(error)
  }
}

export async function createAccusedItem({ $axios, data }) {
  try {
    await $axios.put(`${process.env.API_PATH}/admin/put_accused`, data)

    fetchAccusedList($axios)
  } catch (error) {
    console.error(error)
  }
}
export async function updateAccusedItem({ $axios, id, data }) {
  try {
    await $axios.patch(`${process.env.API_PATH}/admin/update_accused`, data)
    const session = store.findPerson.value(id)

    if (session) {
      const index = store.findPersonIndex.value(id)
      Vue.set(store.state.list, index, { ...session, ...data })
    }
  } catch (error) {
    console.error(error)
  }
}
export async function deleteAccusedItem({ $axios, id }) {
  try {
    await $axios.delete(`${process.env.API_PATH}/admin/delete_accused?id=${id}`)

    const session = store.findPerson.value(id)

    if (session) {
      const index = store.findPersonIndex.value(id)
      Vue.delete(store.state.list, index)
    }
  } catch (error) {
    console.error(error)
  }
}
