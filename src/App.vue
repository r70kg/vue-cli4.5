<template>
  <div id="app">
    <div id="nav">
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name:'App',
    created(){
      this.wxRedirect();
    },
    methods:{
      wxRedirect(){
        this.msv.wechart.wxRedirect({
          type: 'get',
          data:{
              url:'http://82.156.63.111/',
              scope:'snsapi_userinfo'
          },
          success: (res) => {
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
