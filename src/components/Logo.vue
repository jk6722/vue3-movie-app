<template>
  <!-- RouterLink라는 컴포넌트는 a태그로 변경되어 적용됨 -->
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
  .logo {
    font-family: "Oswald", sans-serif;
    // CSS에서는 작은 따옴표보다는 큰 따옴표를 사용하는 것을 권장한다
    font-size: 20px;
    color: $black; // main.scss 파일내에서 import한 variables.scss 파일안에 선언된 $black 변수
    text-decoration: none;
    &:hover {
      color: $black;
    }
    span {
      color: $primary
    }
  }
</style>