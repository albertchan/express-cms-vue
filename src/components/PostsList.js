import Vue from 'vue';
import { fetchPosts } from '../store/api';

const template = `
<div class="posts">
  <div class="panel panel-default">
    Post title
  </div>
</div>
`;

const PostsList = {
  template: template
}

export default PostsList;
