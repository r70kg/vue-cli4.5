<template>
  <div class="home">
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
  components: {
    HelloWorld
  },
  mounted(){
    this.mserver.v(this).user.getUserInfo({
      type:'post',
      data:{},
      bindName:''
    })
  }
}
</script>
