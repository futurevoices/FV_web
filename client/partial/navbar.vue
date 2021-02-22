<template>
  <!-- https://bootstrap-vue.org/docs/components/navbar -->
  <header>
    <div>
      <b-navbar toggleable="lg">
        <b-navbar-brand class="active"
          ><nuxt-link to="/">Future Voices</nuxt-link></b-navbar-brand
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav> -->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <li class="nav-item">
              <nuxt-link to="/" class="nav-link">Stream</nuxt-link>
            </li> -->
            <li class="nav-item">
              <nuxt-link
                to="/contribute"
                class="nav-link"
                :class="$route.name === 'contribute' ? 'active' : ''"
                >contribute</nuxt-link
              >
            </li>
            <!-- <li class="nav-item">
              <nuxt-link to="/fileupload" class="nav-link"
                >Upload(file)</nuxt-link
              >
            </li> -->
            <li class="nav-item">
              <nuxt-link
                to="/explore"
                class="nav-link"
                :class="$route.name === 'explore' ? 'active' : ''"
                >explore</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/about"
                class="nav-link"
                :class="$route.name === 'about' ? 'active' : ''"
                >about</nuxt-link
              >
            </li>
            <!-- <li class="nav-item">
              <nuxt-link to="/manager" class="nav-link">Manager</nuxt-link>
            </li> -->
            <b-nav-item-dropdown text="en" right>
              <b-dropdown-item href="#">en</b-dropdown-item>
              <!-- <b-dropdown-item href="#">en</b-dropdown-item>
              <b-dropdown-item href="#">en</b-dropdown-item> -->
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
<style lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background-color: $lightweight;
}

nav {
  height: 40px;
  background-color: transparent;
  padding: 0 !important;
  // padding: 10px 24px 0px 24px;
  padding-left: 24px !important;
  padding-right: 0px !important;
  z-index: 100;
  border-bottom: $black 1px solid;

  #__BVID__88__BV_toggle_ {
    padding: 0;
  }

  & .navbar-brand {
    font-size: 24px !important;
    margin-top: -3px !important;
  }

  & .navbar-brand a:hover {
    text-decoration: none !important;
    font-weight: normal !important;
    font-style: italic !important;
    color: $black !important;
  }

  h1,
  p,
  a,
  h2,
  h3,
  div {
    margin: 0 !important;
    padding: 0 !important;
  }

  ul li {
    padding-left: 20px;
    padding-right: 20px;
    border-left: 1px solid $black;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    a {
      margin-top: -3px !important;
    }
  }

  .dropdown-menu-right {
    background-color: $lightweight;
    li {
      border: none !important;
      background-color: $lightweight;
    }
  }

  // u li a {
  //   margin: 0;
  //   padding: 0 !important;
  // }

  button {
    margin: 0;
  }
}

/*==========  Non-Mobile First Method  ==========*/

/*Above */
@media only screen and (min-width: 1201px) {
}

/* Large Devices, Wide Screens */
@media only screen and (max-width: 1200px) {
}

/* Medium Devices, Desktops */
@media only screen and (max-width: 992px) {
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  nav {
    height: auto;
    min-height: 40px;
    padding-left: 10px !important;

    & .navbar-brand {
      font-size: 24px !important;
      margin-top: -3px !important;
    }

    button:focus,
    button:active:focus,
    button.active:focus,
    button.focus,
    button:active.focus,
    button.active.focus {
      outline: none !important;
    }

    .navbar-toggler {
      border: none;
      .navbar-toggler-icon {
        background-image: url('~static/navbar-icon.svg') !important;
        background-size: 20px 20px;
        height: 20px;
        width: 20px;

        margin-bottom: 2px;
      }
    }

    #nav-collapse {
      padding-right: 10px;
      ul li {
        border-left: 0;
        justify-content: flex-end;

        a {
          font-size: 21px !important;

          span {
            font-size: 21px !important;
          }
        }
      }
    }
  }
}

/* Custom, iPhone Retina */
@media only screen and (max-width: 320px) {
}
</style>
