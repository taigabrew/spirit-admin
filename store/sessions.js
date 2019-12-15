import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { createStore } from 'pinia'

Vue.use(VueCompositionApi)

export const useSessionsStore = createStore(
  'sessions',
  () => ({
    list: []
  }),
  {
    getSession: state => sid => state.list.find(session => session.id === sid),
    getSessionIndex: state => sid =>
      state.list.findIndex(session => session.id === sid),
    getLastId: state =>
      state.list.length ? state.list[state.list.length - 1].id : 0
  }
)

const store = useSessionsStore()

export async function fetchSessions($axios) {
  const { data } = await $axios.get(
    `${process.env.REST_API_URL}/user/get_all_sittings`
  )

  const { result } = data
  store.state.list = result
}

export async function createSession({ $axios, data }) {
  try {
    // await $axios.patch(`${process.env.REST_API_URL}/admin/put_sitting`, data)
    await console.log({ data })

    store.state.list.push({
      id: String(Number(store.getLastId.value) + 1),
      ...data
    })
  } catch (error) {
    console.error(error)
  }
}

export async function updateSession({ $axios, id, data }) {
  try {
    // await $axios.patch(`${process.env.REST_API_URL}/admin/update_sitting`, {
    //   id,
    //   ...data
    // })
    await console.log({ id, ...data })

    const session = store.getSession.value(id)

    if (session) {
      const index = store.getSessionIndex.value(id)
      Vue.set(store.state.list, index, { ...session, ...data })
    }
  } catch (error) {
    console.error(error)
  }
}

export async function removeSession({ $axios, id }) {
  try {
    // await $axios.delete(
    //   `${process.env.REST_API_URL}/admin/delete_sitting?id=${id}`
    // )

    await console.log({ id })

    const session = store.getSession.value(id)

    if (session) {
      const index = store.getSessionIndex.value(id)
      Vue.delete(store.state.list, index)
    }
  } catch (error) {
    console.error(error)
  }
}
