<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading" 
        absolute />
      <img
        v-else
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <a :href="blog">{{ blog }}</a>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      imageLoading: true
    }
  },
  components: {
    Loader
  },
  computed: {
    // image() {
    //   // store에서 state(상태)에 저장된 데이터를 가져올 건데 about이라는 모듈에서 image라는 데이터를 가져오겠다
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // email() {
    //   return this.$store.state.about.email
    // },
    // phone() {
    //   return this.$store.state.about.phone
    // },
    // blog() {
    //   return this.$store.state.about.blog
    // }
    // 반복되는 내용들이 많음 => vuex helper의 mapState를 사용할 수 있음
    
    ...mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
  a {
    text-decoration: none;
    color: $black;
  }
}
</style>