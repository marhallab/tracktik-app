<template>
  <nav id="navbar" class="navbar">
    <router-link
      :to="{ name: 'Clients' }"
      class="navbar__item"
      :class="{ ' -active': $route.name === 'Clients' }"
    >
      All clients
    </router-link>

    <router-link
      :to="{ name: 'Sites' }"
      class="navbar__item"
      :class="{ ' -active': $route.name === 'Sites' }"
    >
      All sites
    </router-link>
  </nav>
</template>
  