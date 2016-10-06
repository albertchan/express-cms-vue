import Vue from 'vue';
import PostsList from '../components/PostsList';
import Spinner from '../components/Spinner.vue';

const template = `
<div class="container container-content">
  <h2>Posts</h2>
  <posts-list type="post" :items="items"></posts-list>
</div>
`;

function fetchPosts(store) {
  const options = store.state.route.params;
  return store.dispatch('FETCH_POSTS', { options });
}

export default function PostBrowse (type) {
  return {
    name: 'posts-browse',

    components: {
      Spinner,
      PostsList
    },

    data() {
      return {
        items: this.$store.getters.items
      }
    },

    template: template,

    preFetch: fetchPosts,

    beforeMount() {
      fetchPosts(this.$store)
    }
  }
}
