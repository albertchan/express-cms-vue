import Vue from 'vue';
import PostsList from '../components/PostsList';
import Spinner from '../components/Spinner.vue';

const templateEdit = `
<div class="container container-content">
  <h2>Edit Post</h2>
</div>
`;

const templateList = `
<div class="container container-content">
  <h2>Posts</h2>
  <posts-list type="post"></posts-list>
</div>
`;

const templateRead = `
<div class="container container-content">
  <h2>Posts</h2>
</div>
`;

export default function Posts(type) {
  let template;

  switch(type) {
    case 'edit':
      template = templateEdit;
      break;
    case 'list':
      template = templateList;
      break;
    case 'read':
      template = templateRead;
      break;
    default:
      break;
  }

  return {
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
}

function fetchPosts(store) {
  return store.dispatch('FETCH_LIST_DATA', { type: 'post' });
}
