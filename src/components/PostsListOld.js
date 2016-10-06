import Vue from 'vue';
import PostItem from './PostItem';
import { fetchPosts } from '../store/api';

const template = `
<div class="posts">
  <post-item v-for="item in displayedItems" :item="item"></post-item>
</div>
`;

const PostsList = {
  name: 'posts-list',

  template: template,

  components: {
    PostItem
  },

  props: {
    type: String
  },

  // short form for `data: function data(){ }``
  data() {
    const isInitialRender = !this.$root._isMounted;
    return {
      loading: false,
      transition: 'slide-left',
      // if this is the initial render, directly render with the store state
      // otherwise this is a page switch, start with blank and wait for data load.
      // we need these local state so that we can precisely control the timing
      // of the transitions.
      displayedItems: isInitialRender ? this.$store.getters.activeItems : []
    }
  },

  beforeMount() {
    if (this.$root._isMounted) {
      this.loadItems(this.page);
    }
  },

  beforeDestroy() {},

  methods: {
    loadItems() {
      this.loading = true;
      this.$store.dispatch('FETCH_POSTS', {
        type: this.type
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems;
        this.loading = false;
      });
    }
  }
}

export default PostsList;
