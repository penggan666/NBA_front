<template>
<div class="deit">
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span class="team_name">{{Names}}队</span>
        <!-- 球队分类展示 -->
        <span v-bind:class="{attack:categories=='进攻型球队',defense:categories=='防守型球队',comprehensive:categories=='综合型球队'} ">{{this.categories}}</span>
    </div>
    <div v-for="o in baseList" :key="o" class="main">
        <div class="img">
            <img :src="[require('@/logo/'+Names+'.png')]" style="float: left" height="120" width="120">
        </div>
        <div class="font" style="float: center">
            <p align="left">{{o.dateToNBA}}</p>
            <p align="left">{{o.home}}</p>
            <p align="left">官网: {{o.website}}</p>
            <p align="left">{{o.coach}}</p>
            <p align="left">{{o.intro}}</p>
        </div>
    </div>
</el-card>
   <div id="score" style="width: 1600px;height: 400px;position:absolute;top:0px;left:200px"></div>
    <div class="crumbs">
      <p align="left">{{Names}}阵容与数据</p>
        <div class="cantainer">
                    <el-table :data="userList" width="700">
                        <el-table-column type="index" width="100"align="center">    
                        </el-table-column>
                        <el-table-column label="球衣号" prop="id" width="100"align="center">    
                        </el-table-column>
                        <el-table-column label="姓名" prop="name" width="100"align="center">    
                        </el-table-column>
                        <el-table-column label="位置" prop="position" width="100"align="center">    
                        </el-table-column>
                        <el-table-column label="年龄" prop="age" width="100"align="center">    
                        </el-table-column>
                        <el-table-column label="球龄" prop="playage" width="100"align="center">    
                        </el-table-column>  
                        <el-table-column label="身高" prop="height" width="100" align="center">    
                        </el-table-column>  
                        <el-table-column label="体重" prop="weight" width="100"align="center">    
                        </el-table-column> 
                        <el-table-column label="年薪" prop="money" width="100"align="center">    
                        </el-table-column>
                        </el-table-column> 
                        <el-table-column label="场均得分" prop="score" width="100"align="center">    
                        </el-table-column>    
                        </el-table-column> 
                        <el-table-column label="场均助攻" prop="help" width="100"align="center">    
                        </el-table-column>  
                        </el-table-column> 
                        <el-table-column label="命中率" prop="hitrate" width="100"align="center">    
                        </el-table-column>  
                        </el-table-column> 
                        <el-table-column label="3分球命中率" prop="hitrate3" width="100"align="center">    
                        </el-table-column>  
                    </el-table>
        </div>
        <!-- <el-button @click="drawScore()">查询</el-button> -->
    </div>
  </div>

</template>
<script>
import echarts from 'echarts'
import { handleUserList,baseHandle,scoreHandle,get_team_type } from '../request/api';
export default{
    data(){
        return{
        userList:[],
        baseList:[],
        ScoreList:[],
        nums:[],
        // 球队类别
        categories: ''
    }},
    created(){
        this.Names=this.$route.query.Name,
        this.handleUserList2(this.Names),
        this.baseHandle2(this.Names),
        // 分类
        this.get_Categories(),
        this.scoreHandle2(this.Names),
        this.drawScore()
    },
    methods:{
        get_Categories(){
            console.log(this.Names)
            let para={'teamname':this.Names}
            get_team_type(para).then(
                    res=>{
                    console.log(res.data)
                    this.categories=res.data
                }
            )
        },
        handleUserList2(Names) {
            let para={
                Names:Names
            }
            var self=this;
            handleUserList(para).then(
                function(res)
                {
                    console.log(res);
                    self.userList=res.data
                })
                .catch(function(err){
                console.log(err);
                })
        },
        baseHandle2(Names) {
            var self=this;
            let para={
                Names:Names
            }
            baseHandle(para).then(
                function(res)
                {
                    console.log(res);
                    self.baseList=res.data
                    
                })
                .catch(function(err){
                console.log(err);
                })
        },
        scoreHandle2(Names) {
            var self=this;
            let para={
                Names:Names
            }
            scoreHandle(para).then(
                function(res)
                {
                    console.log(res);
                    self.ScoreList=res.data;
                    self.nums[0]=self.ScoreList[0].score;
                    self.nums[1]=self.ScoreList[0].help;
                    self.nums[2]=self.ScoreList[0].bank;
                    self.nums[3]=self.ScoreList[0].miss;
                    self.nums[4]=self.ScoreList[0].fault;
                    self.drawScore();
                })
                .catch(function(err){
                console.log(err);
                })
        },
        drawScore()
        {
            var self=this
            let myChart=this.$echarts.init(document.getElementById("score"))
            myChart.setOption({
                tooltip:{},
    radar: {
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 2,
                padding: [3, 5]
           }

        },
        indicator: [
           { name: '场均得分', max: 150},
           { name: '场均助攻', max: 150},
           { name: '场均篮板', max: 150},
           { name: '场均失分', max: 150},
           { name: '场均失误', max: 150}
        ],

    },
        series: [{
        type: 'radar',
        data : [
            {
                value : self.nums
            }
        ]
    }]
              
            });
        }
    }
}
</script>
<style>
  .text {
    font-size: 14px;
  }
  .team_name{
      font-size:18px
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .attack{
      font-size: 14px;
      color: brown
  }
  .defense{
      font-size: 14px;
      color:darkblue
  }
  .comprehensive{
      font-size: 14px;
      color: darkcyan
  }
</style>