


<template>
    <div>
        <!-- <h2 v-for="(value,key,index) in teamsC_E" :key="key">{{value}}</h2> -->
        
        <el-row>
                <el-col :span="4" :offset="2">
                    <transition name="el-fade-in-linear">
                    <img v-if="form.Vteam!=''"  :src="[require('@/logo/'+form.Vteam+'.png')]"  >
                    <img v-if="form.Vteam===''"  :src="[require('@/logo/问号.png')]"  >
                    </transition>
                </el-col>
                <!-- <el-col :span="4" ><img  :src="[require('@/logo/vs.jpg')]"  ></el-col> -->
                <el-col :span="4" :offset="5">
                    <img v-if="form.Hteam!=''" :src="[require('@/logo/'+form.Hteam+'.png')]"  >
                    <img v-if="form.Hteam===''"  :src="[require('@/logo/问号.png')]" >
                </el-col>
            </el-row>
           
        <el-form :model="form" ref="form"   :rules="rules">
             <el-row>
                <el-col :span="5">
                    <el-form-item label="客场球队:"  prop="Vteam" >
                    <span class="guest_score">预计得分: {{guest_score}}</span>
                <el-select v-model="form.Vteam" filterable  placeholder="请选择客场球队" :disabled='btu_loading'>
                    <el-option v-for="(value,key) in teamsC_E" :key="key" :label="key" :value="key"></el-option>
                </el-select>
            </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        
                        <div class="f_sscore_jdt_b">
                            <div class="f_sscore_jdt_t" :style="'width:'+ comp+'%;'"></div>
                            <span class="f_left_percent pa">{{comp}}%</span>
                            <span class="f_right_percent pa">{{100-comp}}%</span>
						</div>
                         
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="主场球队:"  prop="Hteam" >
                        <span class="home_score">预计得分: {{home_score}}</span>
                <el-select v-model="form.Hteam" filterable  placeholder="请选择主场球队" :disabled='btu_loading'>
                    <el-option v-for="(value,key) in teamsC_E" :key="key" :label="key" :value="key"></el-option>
                </el-select>
            </el-form-item>
                </el-col >
                <el-col :span="3">
                    <el-form-item>
                    <el-button  type="primary"  @click="isAlive2" :loading="btu_loading" >对决</el-button>
                    <el-button @click.native.prevent="handleReset2">重置</el-button>
                    </el-form-item>
                </el-col>
           
             </el-row>
    </el-form>
    
    <div class="hello">
  <div id="myChart" :style="{width: '1000px', height: '1000px'}">
  </div>
  <div id = "myLine" :style="{width: '1000px', height: '1000px'}">
  </div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="gamedate"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="score"
      label="比分"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rebound"
      label="篮板球"
      width="180">
    </el-table-column>
    <el-table-column
      prop="swish"
      label="进球数"
      width="180">
    </el-table-column>
     <el-table-column
      prop="ftshoot"
      label="罚球数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="steal"
      label="抢断"
      width="180">
    </el-table-column>
  </el-table>
  
  </div>
    </div>
    
</template>

<script>
import { getTeamValues,getTeamValues_all,requestCompare,get_score } from '../request/api';
export default {
    created(){
        this.teamsC_E=getTeamValues()
        this.teamsC_E_A=getTeamValues_all()
    },
    data(){
        return{
            btu_loading:false,
            teamsC_E:{},
            teamsC_E_A:{},
            //表单验证属性
            form: {
                Vteam: '',
                Hteam: '',
            },
            comp:50,
            rules:{
                Vteam:[{required: true, message: '请输入客场队伍', trigger: 'blur'}],
                Hteam:[{required: true, message: '请输入主场队伍', trigger: 'blur'}],
                
            },
            data:['asda'],
            nbadata:[],
            team1data:{},
            team2data:{},
            tableData:[],
            scoredata:[],
            scoredata1:[],
            scoredata2:[],
            datedata:[],
            teamname:[],
            home_score:'',
            guest_score:''
        }
        
    },
    methods:{
        handleReset2(){//重置
          this.$refs.form.resetFields();
        },
        compare(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.btu_loading=true;
                    if(this.form.Vteam===this.form.Hteam){
                        this.comp=50
                        this.btu_loading=false;
                    }
                        
                    else{
                        let para = {
                            Vteam:this.teamsC_E_A[this.form.Vteam],
                            Hteam:this.teamsC_E_A[this.form.Hteam],
                            };
                        
                        requestCompare(para).then(res=>{
                            this.comp=res.data*100
                            this.btu_loading=false;
                        })
                    }
                
                this.getdata(this.form.Vteam,this.form.Hteam)
                this.get_score(this.form.Vteam, this.form.Hteam)
                this.drawline(this.form.Vteam,this.form.Hteam)
                this.fulltable(this.form.Hteam,this.form.Vteam)
                
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        isAlive2(){
            var self=this;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.btu_loading=true;
                    if(self.form.Vteam===self.form.Hteam){
                        self.comp=50
                        self.btu_loading=false;
                    }
                        
                    else{
                        let para = {
                            Vteam:self.teamsC_E_A[self.form.Vteam],
                            Hteam:self.teamsC_E_A[self.form.Hteam],
                            };
                        
                        requestCompare(para).then(res=>{
                            self.comp=res.data*100
                            self.btu_loading=false;
                        })
                    }            
                self.getdata(self.form.Vteam,self.form.Hteam)
                self.drawline(self.form.Vteam,self.form.Hteam)
                self.fulltable(self.form.Hteam,self.form.Vteam)
                this.get_score(self.form.Vteam, self.form.Hteam)
        } else {
            console.log('error submit!!');
            return false;
        }
        });
        },
        getdata(team1,team2){
      let self = this;
      //var url = "stat/" + team1 + "/vs/" + team2;
      var url = "/stat_radar?team1="+team1+"&team2="+team2
      this.$ajax({
        type:'get',
        url:url,
        responseType:'json'
      }).then(function(res){
        //console.log(res.data)
        self.nbadata = res.data;
        self.team1data = self.nbadata[0],
        self.team2data = self.nbadata[1],
        self.teamname = self.nbadata[2]
        console.log('请求结束'+self.teamname);
        self.drawradar(self.team1data,self.team2data,self.teamname)
      })
      
    },
    drawradar(data1,data2,data3){
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
            title: {
        text: '历史数据比对'
    },
    tooltip: {},
    legend: {
        data: data3
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '得分', max: 140},
           { name: '篮板球', max: 80},
           { name: '三分命中数', max: 25},
           { name: '进球数', max: 60},
           { name: '罚球数', max: 40},
           { name: '抢断', max: 15}
        ]
    },
    series: [{
        name: '历史数据比对',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : data1,
                name : data3[0]
            },
             {
                value : data2,
                name : data3[1]
            }
        ]
    }]
      });
    },
    drawline(team1,team2){
      var url = "vs_eighttimes?teamname1="+team1+"&teamname2="+team2;
        let self = this;
      console.log('正在请求');
      this.$ajax({
        type:'get',
        url:url,
        responseType:'json'
      }).then(function(res){
        //console.log(res.data)
        self.scoredata = res.data;
        self.datedata = self.scoredata['date'];
        self.scoredata1 = self.scoredata['home'];
        self.scoredata2 = self.scoredata['guest'];
        console.log('画线信息获取成功'+self.datedata+self.scoredata1)
        self.drawline2(self.datedata,self.scoredata1,self.scoredata2);
      })
    },
    drawline2(datedata,scoredata1,scoredata2){
      let myChart = this.$echarts.init(document.getElementById('myLine'));
      myChart.setOption({
           title: {
             text: '得分对比'
          },
          tooltip: {
              trigger: 'axis'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: datedata
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  name:'主场球队',
                  type:'line',
                  data:scoredata1 
              },
              {
                  name:'客场球队',
                  type:'line',
                  data:scoredata2
              }
          ]
      })
    },
    fulltable(team1,team2){
      var url = "/stat_table?teamname1="+team1+"&teamname2="+team2;
      let self = this;
      console.log('正在请求');
      this.$ajax({
        type:'get',
        url:url,
        responseType:'json'
      }).then(function(res){
        //console.log(res.data)
        self.tableData = res.data;
        console.log('请求完成',self.tableData);
      })
    },
    get_score(guest_name, home_name){
        console.log("jinru zhege fangfa !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(guest_name,home_name)
        get_score({home_team: home_name, guest_team: guest_name}).then(res =>{
            console.log(res.data)
            this.home_score =  res.data["home_score"]
            this.guest_score =  res.data["guest_score"]
        })
        
    }
        
    }
    
}
</script>

<style>
    .f_sscore_jdt_b {
    height: 15px;
    position: relative;
    background-color: #2f7ed3;
    top: 10px;
    margin-top: 10px;
    margin-right: 10px
}
    .f_sscore_jdt_b .f_sscore_jdt_t {
    height: 15px;
    position: absolute;
    left: 0;
    top: 0;
    background: #ea4444;
    font-size: 0;
}
.f_sscore_jdt_b .f_left_percent {
    color: #ea4444;
}
.f_sscore_jdt_b .f_right_percent {
    color: #2690fe;
    right: 0;
}
.f_sscore_jdt_b .pa {
    position: absolute;
    top: -30px;
}

</style>
