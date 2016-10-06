import Vue from 'vue';
import PostItem from '../components/PostItem';
import Spinner from '../components/Spinner.vue';

const template = `
<div class="container container-content">
  <h2>Read Posts</h2>
  <post-item :item="item"></post-item>
</div>
`;

function fetchPost(store) {
  const options = store.state.route.params;
  return store.dispatch('FETCH_POST', { options });
}

export default function PostRead() {
  return {
    name: 'post-read',

    components: {
      Spinner,
      PostItem,
    },

    computed: {
      item() {
        return this.$store.getters.item;
      },
    },

    template: template,

    preFetch: fetchPost,

    beforeMount() {
      fetchPost(this.$store)
    },
  }
}
