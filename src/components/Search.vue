<template>
  <div class="container">
    <!-- v-model로 title 데이터와 연결해서 사용자가 입력하면 title 데이터가 변경되도록 함 -->
    <input
      v-model="title"
      type="text"
      class="form-control"
      placeholder="Searh for Movies, Series & more"
      @keyup.enter="apply" />
    <!-- keyup은 키가 눌렸다가 올라올 때 -->
    <div class="selects">
      <!-- $data["type"]는 $data.type과 동일하다  -->
      <!-- $data를 이용해서 해당하는 데이터의 값을 꺼낼 수 있다 -->
      <select
        v-for="filter in filters"
        :key="filter.name"
        v-model="$data[filter.name]"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear() // 현재 년도를 자동으로 반환
            for(let i = thisYear; i >= 1985; i--){
              years.push(i)
            }
            return years
          })() //즉시 실행 함수
        }
      ]
    }
  },
  methods: {
    async apply() {
      // store의 dispatch라는 메소드를 통해 movie 모듈의 searchMovies를 동작시키겠다
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
      // 객체 데이터를 payload 매개변수로 전달
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px; 
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
    // flex-item이 지정된 너비보다 줄어들지 않도록 하겠다
  }

  @include media-breakpoint-down(lg) {
    // 뷰포트 사이즈가 large(lg)보다 작아지면
    display: block; // 요소들이 수직으로 쌓이도록
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
