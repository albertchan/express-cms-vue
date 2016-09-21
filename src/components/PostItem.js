import Vue from 'vue';

const template = `
<div class="panel panel-default">
  <div class="panel-body">
    <h4><a v-bind:href="'/posts/'.concat(item.slug)">{{item.title}}</a></h4>
    <div class="meta">{{item.created_at}}</div>
    <p>{{item.summary}}</p>
  </div>
</div>
`;

const PostItem = {
  name: 'post-item',

  template: template,

  props: ['item']
}

export default PostItem;
