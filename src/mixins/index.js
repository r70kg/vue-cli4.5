/**
 * Created by Dell on 2020/10/9.
 */

 export default {
    mounted() {
        this.msv.v(this);
        console.log('混入的钩子函数');
    }
}