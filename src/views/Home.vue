<template>
  <div class="home" @click="send">
    发送
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
      this.msv.user.getUserInfo({
        type:'post',
        data:{}
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