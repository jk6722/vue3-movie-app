<template>
  <div class="container">
    <div
      :class="{ 'no-result': !movies.length }"
      class="inner">
      <Loader
        v-if="loading" />
      <div 
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID" 
          :movie="movie" />
        <!-- props로 movies라는 객체 배열 안에 있는 movie라는 객체 데이터를 전달 -->
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
import { mapState } from 'vuex'

export default {
  components: {
    MovieItem,
    Loader
  },
  data() {
    return {
      // 우리가 검색한 영화 목록들이 movies에 들어갈 것임
      // Search component의 apply 메소드에서 axios를 통해 영화 목록들을 받아놨음.
      // 부모자식, 상하위 컴포넌트 관계에서는 props나 provide/inject를 사용하여 데이터 통신을 할 수 있었음.
      // 그런데 Search 컴포넌트와 MovieList 컴포넌트는 상하위 관계도 아니고 부모자식 관계도 아닌 형제 관계인데, 어떻게 데이터를 주고 받을까??
      // 물론 Search와 MovieList의 상위 컴포넌트인 Home을 거쳐서 전달해도 되겠지만, 해당 데이터를 필요로 하지 않는 Home이 굳이 데이터를 받아서 넘기는 것은 비효율적이다.
      // vuex(store)를 통해 중앙 저장 장소를 만들어 사용한다.

      // movies: []
    }
  },
  computed: {
    ...mapState('movie', [
      'movies',
      'message',
      'loading'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>