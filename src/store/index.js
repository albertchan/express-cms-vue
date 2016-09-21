import Vue from 'vue'
import Vuex from 'vuex'
import {
  fetchItem,
  fetchItems,
  fetchIdsByType,
  fetchPosts,
  fetchProfile,
  fetchUser
} from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeType: null,
    itemsPerPage: 20,
    items: {/* [id: number]: Item */},
    profiles: {/* [id: string]: Profile */},
    users: {/* [id: string]: User */},
    lists: {
      post: [/* number */],
      top: [],
      user: [],
      profile: []
    }
  },

  actions: {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
      const options = state.route.params || {};
      commit('SET_ACTIVE_TYPE', { type });

      return fetchPosts(options).then(result => {
        const items = result.data.posts;

        commit('SET_ITEMS', { items });
        commit('SET_LIST', { type, ids: Object.keys(state.items) });
      }).catch(err => {
        console.error('[store]:', err);
      });
    },

    // ensure all active items are fetched
    ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
      return dispatch('FETCH_ITEMS', {
        ids: getters.activeIds
      })
    },

    FETCH_ITEMS: ({ commit, state }, { ids }) => {
      // only fetch items that we don't already have.
      ids = ids.filter(id => !state.items[id])
      if (ids.length) {
        return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
      } else {
        return Promise.resolve()
      }
    },

    FETCH_POSTS: ({ commit, state }, { type }) => {
      commit('SET_ACTIVE_TYPE', { type });

      return fetchPosts().then(result => {
        const items = result.data.posts;
        commit('SET_ITEMS', { items });
      }).catch(err => {
        console.error('[store]:', err);
      });
    },

    FETCH_PROFILE: ({ commit, state }, { id }) => {
      console.log('state.profiles -->', state.profiles);
      return state.profiles[id]
        ? Promise.resolve(state.profiles[id])
        : fetchProfile(id).then(profile => {
            commit('SET_PROFILE', { profile })
          }).catch(err => {
            console.error('[store]:', err);
          });
    },

    FETCH_USER: ({ commit, state }, { id }) => {
      return state.users[id]
        ? Promise.resolve(state.users[id])
        : fetchUser(id).then(user => commit('SET_USER', { user }))
    }
  },

  mutations: {
    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type
    },

    SET_LIST: (state, { type, ids }) => {
      state.lists[type] = ids
    },

    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    },

    SET_PROFILE: (state, { profile }) => {
      console.log('profile -->', profile)
      Vue.set(state.profiles, profile.id, profile)
    },

    SET_USER: (state, { user }) => {
      Vue.set(state.users, user.id, user)
    }
  },

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds(state) {
      const { activeType, itemsPerPage, lists } = state;
      const page = Number(state.route.params.page) || 1;
      const filters = state.route.params || {};

      if (activeType) {
        const start = (page - 1) * itemsPerPage
        const end = page * itemsPerPage
        return lists[activeType].slice(start, end)
      } else {
        return []
      }
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItem (state, getters) {
      console.log('activeItem', state);
      return {};
      //return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems (state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    }
  }
})

export default store
