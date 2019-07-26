<template>

<div class="p_t">
  <el-row >
    <el-col :span="4" v-for="(team,index) in Team" :key="index">
      <label for="1"></label>
      <img :src="[require('@/logo/'+team.text+'.png')]" @click="getName(team.text)" >
      <p >{{team.text}}</p>
    </el-col>  
  </el-row>
</div>

</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    Team: [
      {text: '76人'},
      {text: '步行者'},
      {text: '独行侠'},
      {text: '公牛'},
      {text: '国王'},
      {text: '湖人'},
      {text: '黄蜂'},
      {text: '灰熊'},
      {text: '活塞'},
      {text: '火箭'},
      {text: '掘金'},
      {text: '爵士'},
      {text: '开拓者'},
      {text: '凯尔特人'},
      {text: '快船'},
      {text: '篮网'},
      {text: '老鹰'},
      {text: '雷霆'},
      {text: '马刺'},
      {text: '猛龙'},
      {text: '魔术'},
      {text: '尼克斯'},
      {text: '奇才'},
      {text: '骑士'},
      {text: '热火'},
      {text: '森林狼'},
      {text: '太阳'},
      {text: '鹈鹕'},
      {text: '雄鹿'},
      {text: '勇士'},

    ]
    }
  },
  created(){
  },
  mounted(){
  },

methods:{
    getName:function(Name){
      var _this=this
      _this.$router.push({name: "球队详细信息",query :{'Name':Name}});
    }
}


}
</script>

<style>
    .p_t {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>