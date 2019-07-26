<template>
  <div>
      <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2"  class="demo-ruleForm login-container">
        <h3 class="title">NBA对战分析登录</h3>
        <el-form-item  label="用户名" prop="username" auto-complete="off" placeholder="账号">
          <el-input  v-model="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" auto-complete="off" placeholder="密码">
          <el-input type="password" v-model="ruleForm2.password"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button  @click.native.prevent="handleSubmit2" type="primary" style="width:100%;"  :loading="logining" >登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-row>
          <el-col :span="12" style="text-align: left; float:left"><el-button @click.native.prevent="handleReset2">重置</el-button></el-col>
          <el-col :span="12" style="text-align: right; float:right"><el-button @click="tosignin">注册</el-button></el-col>
          </el-row>
        </el-form-item>
      </el-form>
     
  </div>
</template>

<script>
  import { requestLogin,getInfo, decrypt } from '../request/api';
  import axios from 'axios'
  //import NProgress from 'nprogress'
  export default {
      data(){
        var checkPass=(rule, value, callback) => {
          if (value.length<6) {
            callback(new Error('最短为6'));
          } else {
            if (value.length<6) {
              callback(new Error('最短为6'));
            } else {
              callback();
            }
          }
      };
        return{
          logining: false,//控制登录按钮的缓存
          user:{name:'hah',type:'1',idcard:'12356',tele:'100'},
          //自定规则
            ruleForm2:{
              username:'',
              password:'',
              status:1
            },
            rules2:{
              username:[{required: true, message: '请输入用户名', trigger: 'blur'}],
              password:[
                {required: true, message: '请输入密码', trigger: 'blur'},
              //  {min:6,max:10,message:'长度在6到10个字符',trigger:'blur'}
               //{validator: checkPass, trigger: 'blur'}
              ]
            }
        }
      },
      methods:{

        handleReset2(){//重置
          this.$refs.ruleForm2.resetFields();
        },
        handleSubmit2() {
        var _this = this;
        console.log("aeskey:"+sessionStorage.getItem('aesKey'))
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            _this.logining = true;
            var loginParams = { username: this.ruleForm2.username, password: this.ruleForm2.password,key:sessionStorage.getItem('aesKey')};
            sessionStorage.setItem('uid',this.ruleForm2.username);
            requestLogin(loginParams).then(res => {
              this.logining = false;

              if (res.data==true) {
                getInfo().then(res=>{
                  var permission=res.headers['permission']
                  if(permission>0){
                    sessionStorage.setItem('user', decrypt(res.data));
                    sessionStorage.setItem('permission',permission)
                    this.$router.push({ path: '/compare' });
                  }
                })
              } else {
                this.$message({
                  message: "账户或密码错误",
                  type: 'error'
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        
        tosignin(){
          this.$router.push({path:'/signin'})
      }
      },
      created(){
        let info = this.$router.history.current.params;
        if (info) {
          sessionStorage.setItem("signinfo", JSON.stringify(info) );
        }
        let myinfo =JSON.parse(sessionStorage.getItem("signinfo"))
        this.ruleForm2.username=myinfo.username;
        this.ruleForm2.password=myinfo.password;
      }
  }
   
</script>


<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>