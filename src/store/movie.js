// 영화 검색과 관련된 데이터를 저장하는 공간
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // movie.js가 module화 되어 사용될 수 있다는 것을 명시하는 것
  namespaced: true,
  // 실제로 취급해야되는 각각의 데이터를 의미
  // data!
  state: () => {
    return {
      movies: [],
      message: _defaultMessage, // message state의 초기값 지정
      loading: false,
      theMovie: {} // 영화의 상세 정보를 담을 객체
    }
  },
  // computed!
  getters: {
    // state 부분의 데이터를 계산해서 새로운 형태의 데이터를 만들어내는 것이 getter의 역할
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },
  // methods! (mutations & actions)

  // mutations(변이)를 통해서 우리가 관리하는 데이터들을 변경시켜줄 수 있다.
  // 데이터를 수정할 때는 반드시 mutations 안에서 변경해야 함
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
        //state['movie'] = payload['movie']
        //state['message'] = payload['message']
        //state['loading'] = payload['loading']
      })
    },
    resetMovies(state) {
      state.movies = [],
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 비동기로 동작
  actions: {
    // actions에서는 state에 바로 접근할 수 없음. context를 통해 간접적으로 접근 (변수 이름을 꼭 context로는 안 해도 됨)

    //비동기로 처리해야하기 때문에 async
    async searchMovies({ state, commit }, payload) {
      if(state.loading) return
      // 검색을 처음 시작했을 때는 loading 값이 false일 것임.
      // 그렇다면 이 조건문에 걸리는 경우는? 아직 영화를 검색 중인데, 사용자가 또 다시 검색을 시도하는 경우

      try {
        // 구조분해를 통해 데이터를 받아옴
        // Search movies ...
        commit('updateState', {
          message: '', // 검색이 시작되면 초기 message값을 지워줌
          loading: true
        })
        
        const res = await _fetchMovie({
          ...payload, // 전개 연산자를 통해 인자 전달
          page: 1 
        })
        const { Search, totalResults } = res.data
        // 여기서 꺼낸 Search 데이터를 movies 배열에 넣어주어야 하는데
        // 데이터를 변경하는 것은 반드시 mutations에서만 가능함.
        // mutations에 정의된 메소드는 commit을 통해 동작시킬 수 있다
        commit('updateState', {
          // update할 데이터를 객체 데이터로 payload로 전달
          movies: _uniqBy(Search, 'imdbID')
          // imdbID를 기준으로 고유화
        })
        console.log(totalResults) // 268
        console.log(typeof totalResults) // String

        const total = parseInt(totalResults, 10) // String을 10진법 정수로 변경 
        const pageLength = Math.ceil(total / 10)

        if (pageLength > 1) {
          // 추가 요청이 필요함
          for(let page = 2; page <= pageLength; page++) {
            if(page > payload.number / 10) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ]
              // 전개 연산자를 통해 기존의 데이터를 유지하면서 새로 요청한 데이터를 movies에 추가
            })
          }
        }
      } catch (message) {
        // _fetchMovie 함수 실행 결과 에러가 발생한 경우
        commit('updateState', {
          movies: [],
          message // message: message
        })
      } finally {
        commit('updateState', {
          loading: false
          // 검색이 정상적으로 이루어지든 에러가 발생하든 loading은 끝나야 함.
          // 그렇기 때문에 finally 구문에 작성
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return

      commit('updateState', {
        theMovie:{},
        // 이전에 검색된 영화의 내용이 남아있는 채로 새로운 영화를 검색하게 되면
        // 새로운 영화가 검색되기 전까지 이전에 검색했던 영화의 정보가 화면에 나타날 것임
        // 그걸 방지하기 위해서 theMovie 객체를 초기화
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: res.data
        })
      }catch(err){
        commit('updateState', {
          theMovie: {}
        })
      }finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

const _fetchMovie = (payload) => {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '9b40be0b'
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error) {
          reject(res.data.Error)
          // omdbapi에서 자체적으로 에러를 처리하여 에러가 발생해야할 상황에도 정상적으로 작동하는 경우가 있음
          // 그걸 막아주기 위한 예외처리
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}