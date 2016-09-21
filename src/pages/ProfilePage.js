import Vue from 'vue';
import Spinner from '../components/Spinner.vue';

const templateEdit = `
<div class="container container-content">
  <h2>Edit Profile</h2>
</div>
`;

const templateRead = `
<div class="container container-content">
  <h2>User Profile</h2>
</div>
`;

export default function ProfilePage(type) {
  const template = type === 'edit' ? templateEdit : templateRead;

  return {
    name: `profile-page`,

    components: {
      Spinner
    },

    template: template,

    beforeMount() {
      fetchPosts(this.$store)
    }
  }
}
