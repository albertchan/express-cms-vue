import Vue from 'vue';
import PostItem from '../components/PostItem';
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
  <posts-list type="post" :options="this.$route.params"></posts-list>
</div>
`;

const templateRead = `
<div class="container container-content">
  <h2>Read Posts</h2>
  <posts-item :item=""></posts-item>
</div>
`;

export default function PostsPage(type) {
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
      PostItem,
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
