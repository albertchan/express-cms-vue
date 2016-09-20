import Vue from 'vue';

const template = `
<main id="app">
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand" exact>Home</router-link>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/posts">Posts</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
  <transition name="fade" mode="out-in">
    <router-view class="view"></router-view>
  </transition>
</main>
`;

const App = {
  template: template
}

export default App;
