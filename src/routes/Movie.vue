<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <!-- Boolean 속성은 명시를 하는 것만으로 true값으로 전달됨 :fixed="true" 라고 한 것과 같음 -->
      <Loader 
        fixed
        :size="3"
        :z-index="9" />
    </template>
    <div
      class="movie-details"
      v-else>
      <div
        :style="{ backgroundImage: `url(${ requestDiffSizeImage(theMovie.Poster)})` }"
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="lables">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- 배열 내 객체를 구조분해 후 원하는 이름으로 alias를 명시해서 사용 -->
            <div
              v-for="{Source: name, Value: score} in theMovie.Ratings" 
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt~~
      // tt~~ 부분이 route의 params.id
      id: this.$route.params.id
    })
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if(!url || url === "N/A"){
        this.imageLoading = false
        return ''
      }
      else {
        const src = url.replace('SX300', `SX${size}`)
        this.$loadImage(src)
          .then(() => {this.imageLoading = false})
        // 여기서 asynce await를 사용하면 이미지를 로딩할 때까지 사이즈를 바꾼 새로운 주소인 src를 리턴하지 못함
        // 그럼 이 주소를 받아서 쓰는 html에서 이미지를 출력하지 못하게 됨
        // 그래서 async await로 비동기를 처리하는 것이 아닌 then을 사용해서 비동기 처리
        return src
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: calc(500px * 3 / 2);
    margin-right: 70px;
    position: relative;
  }
  .specs {
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster{
    width: 500px;
    height: calc(500px * 3 / 2);
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
  }
  .specs{
    flex-grow: 1;
    .title{
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .lables{
      color: $primary;
      span{
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot{
      margin-top: 20px;
    }
    .ratings{
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3{
      margin: 24px 0 6px;
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: calc(300px * 3 / 2);
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>