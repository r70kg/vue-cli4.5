/**
 * Created by Dell on 2020/10/9.
 */
 export default {
    created() {
        this.msv.v(this);
        console.log('全局混入的钩子函数');
    }
}