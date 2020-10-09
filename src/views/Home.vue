<template>
  <div class="home" @click="send">
    <van-nav-bar
            title="首页"
            left-arrow
            class="back"
    />
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import V from '@/mixins/v'

export default {
  name: 'Home',
  mixins:[V],
  data(){
    return {
      mgs:'Home'
    }
  },
  methods:{
    send(){
      console.log(this.msv)

      this.msv.user.getUserInfo({
        type:'post'
      })
      
      setTimeout(()=>{
        console.log(this.getUserInfo)
      },3000)
      
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
  }
}
</script>
<style lang="scss">
  .home{
    font-size: 24px;/*px*/
  }
</style>