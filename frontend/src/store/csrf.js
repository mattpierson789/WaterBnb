async function csrfFetch(url, options = {}) {
    options.headers = options.headers || {};
    options.method = options.method || 'GET';
  
    if (options.method.toUpperCase() !== 'GET') {
      options.headers['Content-Type'] =
        options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    // options.headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').content;
    }
  
    const res = await fetch(url, options);
  
    if (res.status >= 400) throw res;
  
    return res;
  }
  
  function storeCSRFToken(response) {
    const csrfToken = response.headers.get('X-CSRF-TOKEN');
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
  }
  
  async function restoreCSRF() {
    const response = await csrfFetch('api/session');
    storeCSRFToken(response);
  }
  
  export { csrfFetch, restoreCSRF, storeCSRFToken };
  export default csrfFetch;
  