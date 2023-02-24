<template>
  <Logo />
  <Header_ />
  <RouterView /> 
  <!-- vue-router에서 제공하는 전역화된 RouterView라는 컴포넌트를 사용해서 연결한 페이지를 출력할 수 있음 -->
  <Footer_ />
</template>

<script>
import Header_ from '~/components/Header'
import Footer_ from '~/components/Footer'

export default {
  components: {
    Header_,
    Footer_
  }
}
</script>