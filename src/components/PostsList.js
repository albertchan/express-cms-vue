import Vue from 'vue';
import PostItem from './PostItem';

const template = `
<div class="posts">
  <post-item v-for="item in items" :item="item"></post-item>
</div>
`;

const PostsList = {
  name: 'posts-list',

  template: template,

  components: {
    PostItem
  },

  props: {
    items: {
      type: Object,
      default: null,
    },
  },
}

export default PostsList;
