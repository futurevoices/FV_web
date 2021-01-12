<template>
  <!-- https://bootstrap-vue.org/docs/components/navbar -->
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Future Voices</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav> -->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link">Stream</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/upload" class="nav-link">Upload</nuxt-link>
            </li>
            <!-- <li class="nav-item">
              <nuxt-link to="/fileupload" class="nav-link"
                >Upload(file)</nuxt-link
              >
            </li> -->
            <li class="nav-item">
              <nuxt-link to="/explore" class="nav-link">Explore</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/about" class="nav-link">About</nuxt-link>
            </li>
            <!-- <li class="nav-item">
              <nuxt-link to="/manager" class="nav-link">Manager</nuxt-link>
            </li> -->
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <!-- <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item> -->
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>
<style scoped></style>
