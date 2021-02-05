<template>
  <div id="app">
    <div id="nav">
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
      <van-button type="primary loginBtn" @click="auth()">999</van-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name:'App',
    created(){


    },

    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx815629929dadc0fd&redirect_uri=http://localhost:8080/wx/getOpenId&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    methods:{
      auth(){
        let openId = '';
        if(!openId){
          this.wxRedirect();
        }
      },
      wxRedirect(){
        this.msv.wechart.wxRedirect({
          type: 'get',
          data:{
              url:'http%3a%2f%2fm.imooc.com%3a81',
              scope:'snsapi_userinfo'
          },
          success: (res) => {
            if(res.code==1){
              window.location.href = res.data.authorizeUrl;

            }
            console.log(res);
          }
        });
      }
    }
  }
</script>

<style lang="scss">
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
