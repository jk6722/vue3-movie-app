import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
  // 여기서 지정한 module의 이름으로 모듈이 사용됨
  modules: {
    movie, // movie: movie와 같음. 속성과 값의 이름이 같을 때는 값을 속성을 생략해도 된다
    about
  }
})