<template>
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex, // 속성의 이름과 데이터의 이름이 같으면 생략 가능
    }"
    class="spinner-border text-primary"
    :class="{
      absolute,
      fixed
    }">
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type:Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>