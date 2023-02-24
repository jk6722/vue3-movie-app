<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      @click="toAbout"
      class="user">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  computed: {
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.about
    // }
    ...mapState('about', [
      'image',
      'name'
    ])
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/' // main 페이지
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988', // movie 페이지
          path: /^\/movie/
        },
        {
          name: 'About',
          href: '/about' // about 페이지
        }
      ]
    }
  },
  methods: {
    isMatch(path) {
      if (!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      transition: .4s;
      &:hover {
        background-color: darken($gray-200, 10%);
      }
      img {
        width: 100%;
      }
    }
    @include media-breakpoint-down(sm) {
      //viewport의 크기가 small(sm)사이즈보다 작아졌을 때의 스타일을 따로 적용 가능
      .nav {
        display: none;
      }
    }
  }
</style>