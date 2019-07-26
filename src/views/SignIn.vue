<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <h3 class="title">用户注册</h3>
            <el-form-item label="用户名:" prop="username">
                <el-input  v-model="ruleForm2.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm2.email"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm2.age"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="ruleForm2.gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支持的球队" prop="support_team">
                <el-select v-model="ruleForm2.support_team" filterable  placeholder="请选择支持球队" >
                  <el-option v-for="(value,key) in teamsC_E" :key="key" :label="key" :value="key"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"  @click="submitForm('ruleForm2')" >提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { requestSign,getTeamValues, getKey } from '../request/api';
export default {
    data() {
      teamsC_E:{}
      
      /**
   * 校验 包括中文字、英文字母、数字和下划线
   * 登录账号校验
   */
  var checkAcount =(rule, value, callback) =>{
    let acount = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    if (value && (!(acount).test(value))) {
      callback(new Error('账号不符合规范'))
    } else {
      callback()
    }
  };

      
      var checkTele = (rule, value, callback) => {
          if (!value) {
          return callback(new Error('邮箱不能为空'));
        } 
        else {
          const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的邮箱号'));
          }
        }
      };
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        logining:false,//提交缓冲
        ruleForm2: {
          pass: '',
          checkPass: '',
          username:'',
          email:'',
          age:'',
          gender:'',
          support_team:''
        },
        rules2: {
          username:[
            { required: true, message: '用户名不能为空', trigger: 'blur'},
              {
                validator: checkAcount, trigger: 'blur'
            }
        ],
          pass: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请确认密码', trigger: 'blur'},
            { validator: validatePass2, trigger: 'blur' }
          ],
        
          email:[
              { required: true, message: '邮箱不能为空', trigger: 'blur' },
               {validator: checkTele, trigger: 'blur'}
          ],
          age: [
            {required: true, message: '年龄不能为空', trigger: 'blur'},
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          support_team: [
            {required: false, message: '请选择球队', trigger: 'change'}
          ]
        }
      };
    },
    created() {
      this.teamsC_E=getTeamValues();
      getKey()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para={username:this.ruleForm2.username,password:this.ruleForm2.pass,email:this.ruleForm2.email,age:this.ruleForm2.age,gender:this.ruleForm2.gender,support_team:this.ruleForm2.support_team};
            requestSign(para).then(res=>{
              if(res.data==false){
                this.$message({
                  message:"用户名已注册",
                  type:'error'
                })
              }
              else{
                var permission=res.headers['permission']
                if(permission==4){
                  this.$message({
                    message:"注册管理员成功",
                    type: 'success'
                  })
                  this.$router.push({ path: '/compare' });
                }
                else{
                  this.$message({
                    message:"注册用户成功",
                    type: 'success'
                  })
                  this.$router.push({ name:'登录',params:{username:this.ruleForm2.username,password:this.ruleForm2.pass,key:sessionStorage.getItem("aesKey")} });
                }
                
                
              }
            });
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style >
.demo-ruleForm {
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
    
  }
  .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
</style>
