<template>
  <footer>
    <Logo />
    <a
      href="https://github.com/jk6722"
      target="_blank">
      (c){{ new Date().getFullYear }} JAEGUK
    </a>
  </footer>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: .3; // 30%의 불투명도
  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>