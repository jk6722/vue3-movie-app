import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

// createRouter 메소드를 실행한 결과를 내보내겠다
// 이렇게 내보낸 객체 데이터를 main.js에서 router라는 이름으로 받아서 사용

export default createRouter({
  // Hash모드와 History모드가 있음
  // 이번 프로젝트에서는 Hash모드를 사용할 것임
  // https://google.com/#/search
  // url 뒤에 해시(#)기호를 사용해서 페이지를 찾는다
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // pages
  // https://google.com
  routes: [
    {
      path: '/', // '/'는 메인 페이지를 의미함
      component: Home //메인 페이지로 접근했을 때 어떤 vuejs 컴포넌트를 연결해서 사용할 것인지 명시해주면 된다.
    },
    {
      path: '/about', // about 페이지를 의미
      component: About
    },
    {
      path: '/movie/:id',
      // movie 페이지를 의미
      // : 을 사용해서 주소 값이 동적으로 바뀔 수 있음을 명시
      component: Movie
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})