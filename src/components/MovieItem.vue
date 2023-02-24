<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    class="movie"
    :style="{ backgroundImage: `url(${movie.Poster})` }">
    <Loader
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  data() {
    return {
      imageLoading: true
    }
  },
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      default: () => ({})
      // default: () => {
      //   return {}
      // }
    }
  },
  mounted() {
    // html과 연결된 직후에 init 메소드를 실행시키기 위해 mounted 사용
    this.init()
  },
  methods: {
    async init() {
      const poster = this.movie.Poster
      if(poster && poster !== "N/A"){
        await this.$loadImage(this.movie.Poster)
        // await로 로드가 끝날 때 까지 기다리다가 끝나면
        // imageLoading을 false로
      }
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
// 부트스트랩에서 제공하는 변수들을 사용하기 위해서 부트스트랩이 import 되어있는 main.scss를 import해서 사용
.movie {
  $width: 200px;
  width: $width;
  height: calc($width * 3 / 2);
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary
    }
    .title {
      color: $white;
      white-space: nowrap;
      // 내용이 넘쳐도 줄바꿈을 하지 않겠다.
      overflow: hidden;
      // 컨테이너를 벗어나는 내용은 숨기겠다.
      text-overflow: ellipsis;
    }
  }
  &:hover {
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 6px solid $primary;
    }
  }
}
</style>