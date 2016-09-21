import Vue from 'vue';

const template = `
<div class="panel panel-default">
  <div class="panel-body">
    <h4>{{item.name}}</h4>
    <p>{{item.bio}}</p>
  </div>
</div>
`;

const ProfileItem = {
  name: 'profile-item',

  template: template,

  props: {
    options: Object
  },

  data() {
    const isInitialRender = !this.$root._isMounted;
    return {
      loading: false,
      transition: 'slide-left',
      // if this is the initial render, directly render with the store state
      // otherwise this is a page switch, start with blank and wait for data load.
      // we need these local state so that we can precisely control the timing
      // of the transitions.
      item: isInitialRender ? this.$store.getters.activeItem : {}
    }
  }
}

export default ProfileItem;
