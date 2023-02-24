<template>
  <div class="container">
    <h1>
      <span>OMDb API</span><br />
      THE OPEN<br />
      MOVIE DATABASE
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users. <br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
  // scoped를 사용하면 해당 파일에서만 스타일이 적용되기 때문에 별도의 class 없이 태그 선택자만 사용해도 충분히 스타일을 지정할 수 있다.
  .container{
    padding-top: 40px;
    h1 {
      line-height: 1;
      font-family: "Oswald", sans-serif;
      font-size: 80px;
      span {
        color: $primary;
      }
    }
    p {
      margin: 30px 0;
      color: $gray-600;
    }
  }
</style>