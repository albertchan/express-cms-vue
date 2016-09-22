import Vue from 'vue';

const template = `
<div class="panel panel-default">
  <div class="panel-body">
    <h4><a v-bind:href="'/posts/'.concat(item.id)">{{item.title}}</a></h4>
    <div class="meta">{{item.user_id}} | {{item.created_at}}</div>
    <p>{{item.body}}</p>
  </div>
</div>
`;

const PostItem = {
  name: 'post-item',

  template: template,

  props: ['item']
}

export default PostItem;
