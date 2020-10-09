<template>
  <div class="home" @click="send">
    发送
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return {
      mgs:'Home'
    }
  },
  methods:{
    send(){
      this.msv.user.getUserInfo({
        type:'post',
        data:{},
        bindName:''
      })
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