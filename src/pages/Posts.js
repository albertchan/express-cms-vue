import Vue from 'vue';
import PostsList from '../components/PostsList';
import Spinner from '../components/Spinner.vue';

const template = `
<div class="container container-content">
  <h2>Posts</h2>
  <posts-list type="post"></posts-list>
</div>
`;

const Posts = {
  name: 'posts-page',

  components: {
    Spinner,
    PostsList
  },

  template: template,

  preFetch: fetchPosts,

  beforeMount() {
    fetchPosts(this.$store)
  }
}

function fetchPosts(store) {
  return store.dispatch('FETCH_LIST_DATA', { type: 'post' });
}

export default Posts;
