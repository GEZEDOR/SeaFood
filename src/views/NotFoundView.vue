<template>
  <main class="not-found container">
    <div class="content">
      <h1>404</h1>
      <h2>Oops! Page not found</h2>
      <p>Looks like you've swum into the wrong waters. The page you're looking for doesn't exist.</p>
      <router-link to="/" class="btn btn-primary mt-4">Back to home</router-link>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content h1 {
  font-size: 8rem;
  color: var(--secondary-color);
  margin-bottom: 0;
  line-height: 1;
}

.content h2 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.content p {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.mt-4 {
  margin-top: 2rem;
}
</style>
