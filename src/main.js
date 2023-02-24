import { createApp } from 'vue'
import App from './App'
import router from './routes/'
import store from './store/'
import loadImage from './plugins/loadImage'
// import router from './routes/index.js'
// import router from './store/index.js'
// 특정 폴더 안에 있는 index라는 이름의 파일은 불러올 때 파일명을 생략할 수 있음


createApp(App)
  .use(router) // $route, $router
  .use(store) // $store
  .use(loadImage) // $loadImage
  .mount('#app')

  // use는 vuejs에 사용할 플러그인을 적용하는 메소드