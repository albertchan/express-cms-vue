import Request from 'request-promise';
import config from '../config';

const inBrowser = typeof window !== 'undefined'
const apiURL = `http://${config.host}:${config.api.port}/api/v1`;

function _fetch (child) {
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}

export function fetchPost(options) {
  const { post_id, user_id } = options;
  const endpoint = isNaN(post_id)
    ? `${apiURL}/posts/${post_id}`
    : `${apiURL}/profiles/${user_id}/posts/${post_id}`;

  return fetch(endpoint);
}

export function fetchPosts(options) {
  const opts = options || {};
  let endpoint;

  if (opts.user_id) {
    endpoint = isNaN(opts.user_id)
      ? `${apiURL}/posts/@${opts.user_id}`
      : `${apiURL}/profiles/${opts.user_id}/posts`;
  } else {
    endpoint = `${apiURL}/posts`;
  }
  console.log('endpoint --->', endpoint);
  return fetch(endpoint);
}

export function fetchProfile(id) {
  const endpoint =`${apiURL}/profiles/${id}`;
  return fetch(endpoint);
}

export function updateProfile(id /* user_id */, dataObj) {
  const endpoint =`${apiURL}/profiles/${id}/edit`;
  return update(endpoint, dataObj);
}

function update(endpoint, dataObj) {
  const options = {
    method: 'POST',
    uri: endpoint,
    form: dataObj,
    headers: {/* 'content-type': 'application/x-www-form-urlencoded' */}
  };
  return Request(options);
}

function fetch(endpoint) {
  const options = {
    uri: endpoint,
    json: true
  };
  return Request(options);
}
