import Vue from 'vue';
import ProfileItem from '../components/ProfileItem';
import Spinner from '../components/Spinner.vue';

const templateEdit = `
<div class="container container-content">
  <h2>Edit Profile</h2>
</div>
`;

const templateRead = `
<div class="container container-content">
  <h2>User Profile</h2>
  <profile-item :options="this.$route.params"><profile-item>
</div>
`;

export default function ProfilePage(type) {
  const template = type === 'edit' ? templateEdit : templateRead;

  return {
    name: `profile-page`,

    components: {
      ProfileItem,
      Spinner
    },

    template: template,

    beforeMount() {
      fetchProfile(this.$store)
    }
  }
}

function fetchProfile(store) {
  return store.dispatch('FETCH_PROFILE', { id: store.state.route.params.id });
}
