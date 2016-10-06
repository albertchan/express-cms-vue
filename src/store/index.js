import Vue from 'vue'
import Vuex from 'vuex'
import {
  fetchItem,
  fetchItems,
  fetchIdsByType,
  fetchPost,
  fetchPosts,
  fetchProfile,
  fetchUser,
  updateProfile
} from './api'

Vue.use(Vuex);

const anonymousUser = {
  id: null,
  displayName: 'Anonymous',
};

const store = new Vuex.Store({
  state: {
    activeType: null,
    activeUser: anonymousUser,
    itemsPerPage: 20,
    item: {},
    items: {/* [id: number]: Item */},
    profiles: {/* [id: string]: Profile */},
    users: {/* [id: string]: User */},
    lists: {
      post: [/* number */],
      profile: []
    }
  },

  actions: {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
      const options = state.route.params || {};
      commit('SET_ACTIVE_TYPE', { type });

      return fetchPosts(options).then(result => {
        const items = result.posts;

        commit('SET_ITEMS', { items });
        commit('SET_LIST', { type, ids: Object.keys(state.items) });
      }).catch(err => {
        console.error('[store]:', err);
      });
    },

    FETCH_POST: ({ commit, state }, { options }) => {
      return fetchPost(options)
        .then(item => {
          commit('SET_ITEM', { item });
        })
        .catch(err => {
          console.error('[store]:', err);
        });
    },

    FETCH_POSTS: ({ commit, state }, { options }) => {
      return fetchPosts(options)
        .then(result => {
          const items = result.posts || [];
          commit('SET_ITEMS', { items });
        })
        .catch(err => {
          console.error('[store]:', err);
        });
    },

    FETCH_PROFILE: ({ commit, state }, { id }) => {
      const options = state.route.params || {};
      id = id || options.user_id;

      return state.profiles[id]
        ? Promise.resolve(state.profiles[id])
        : fetchProfile(id).then(profile => {
            commit('SET_PROFILE', { profile: profile });
          }).catch(err => {
            console.error('[store]:', err);
          });
    },

    UPDATE_PROFILE: ({ commit, state }, { profile }) => {
      const options = state.route.params || {};

      return !options.user_id
        ? Promise.resolve(state.profile)
        : updateProfile(options.user_id, profile).then(result => {
          //
        }).catch(err => {
          console.error('[store]: (UPDATE_PROFILE)', err);
        });
    },

    FETCH_USER: ({ commit, state }, { id }) => {
      return state.users[id]
        ? Promise.resolve(state.users[id])
        : fetchUser(id).then(user => commit('SET_USER', { user }));
    }
  },

  mutations: {
    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type
    },

    SET_LIST: (state, { type, ids }) => {
      state.lists[type] = ids
    },

    SET_ITEM: (state, { item }) => {
      state.item = item;
    },

    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    },

    SET_PROFILE: (state, { profile }) => {
      state.profile = profile;
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

    // current profile for view
    activeProfile(state) {
      return state.profile;
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems(state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    },

    item(state, getters) {
      return state.item;
    },

    items(state, getters) {
      return state.items;
    },
  }
})

export default store
