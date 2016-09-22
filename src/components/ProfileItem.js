import Vue from 'vue';

const template = `
<div class="panel panel-default">
  <div v-if="type === 'edit'" class="panel-body">
    <div class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" name="name" v-model.lazy="item.name">
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" name="username" v-model.lazy="item.username">
      </div>
      <div class="form-group">
        <label for="avatar_url">Avatar</label>
        <input type="text" class="form-control" name="avatar_url" v-model.lazy="item.avatar_url">
      </div>
      <div class="form-group">
        <label for="bio">Description</label>
        <textarea class="form-control" name="bio" rows="5" v-model.lazy="item.bio"></textarea>
      </div>
      <button type="button" class="btn btn-default" v-on:click="update">Save</button>
    </div>
  </div>
  <div v-else class="panel-body">
    <h4>{{item.name}}</h4>
    <div><img v-bind:src="item.avatar_url"></div>
    <p>{{item.bio}}</p>
  </div>
</div>
`;

const ProfileItem = {
  name: 'profile-item',

  template: template,

  props: {
    type: String
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
      item: isInitialRender ? this.$store.getters.activeProfile : {}
    }
  },

  methods: {
    update: function(event) {
      const profile = {
        name: this.item.name,
        username: this.item.username,
        // avatar_url: this.item.avatar_url,
        // bio: this.item.bio
        profile: {
          avatar_url: this.item.avatar_url,
          bio: this.item.bio
        }
      };

      this.$store.dispatch('UPDATE_PROFILE', { profile });
    }
  }
}

// function updateProfile(store) {
//   return store.dispatch('FETCH_PROFILE', { id: store.state.route.params.id });
// }

export default ProfileItem;
