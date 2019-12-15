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
      `${process.env.REST_API_URL}/user/get_all_accuseds`
    )

    const { result } = data
    store.state.list = result
  } catch (error) {
    console.error(error)
  }
}

export async function createAccusedItem({ $axios, data }) {
  try {
    // await $axios.put(`${process.env.REST_API_URL}/admin/put_accused`, data)

    await console.log({ data })
    store.state.list.push({
      id: String(Number(store.getLastId.value) + 1),
      ...data
    })
  } catch (error) {
    console.error(error)
  }
}
export async function updateAccusedItem({ $axios, id, data }) {
  try {
    // await $axios.get(`${process.env.REST_API_URL}/admin/update_accused`, data)
    await console.log({ data })
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
    // await $axios.get(
    //   `${process.env.REST_API_URL}/admin/delete_accused?id=${id}`
    // )
    await console.log({ id })

    const session = store.findPerson.value(id)

    if (session) {
      const index = store.findPersonIndex.value(id)
      Vue.delete(store.state.list, index)
    }
  } catch (error) {
    console.error(error)
  }
}
