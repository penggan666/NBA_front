<template>
    
    <div class='content'>
        <el-card  class="news_card" >
            <div slot="header" class="clearfix">
                <span class="title">{{news.title}}</span>
            </div>
        <p class="text" v-html="news.content"></p>     
        </el-card>
        <el-divider content-position="left" class="divider" name="分割评论">评论区</el-divider>
        <el-card v-for="(comment,index) in comment_data.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" class="comm_item" >
            <div slot="header" class="comm_title_container" >
                <span class="comm_title" >{{comment.user_id}}</span>
                <!-- <img class="comm_likeimg" v-if="comment.already!=1" :src="[require('@/logo/nolike.png')]"  />
                <img class="comm_likeimg" v-if="comment.already==1" :src="[require('@/logo/like.png')]"/> -->
                <el-button plain class='comm_img' v-if="comment.already==1" icon="el-icon-my-export"></el-button>
                <el-button plain class='comm_img2' v-if="comment.already!=1" icon="el-icon-my-export2" @click.native="upLike(comment.com_id,(currentPage-1)*pagesize+index)"></el-button>
                <div class="comm_like">{{comment.count}}</div>
            </div>
            <div class="comm_content">{{comment.content}}</div>
                <div class="comm_time">{{comment.time}}</div>
             <el-button class="del_comm" v-if="permission>1" size="mini" type="danger" @click.native="delcomment(comment.com_id)" plain>删除评论</el-button>
        </el-card>
    <!-- 分页 -->
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-size="pagesize"       
        layout="total,prev, pager, next, jumper"
        :total="comment_data.length"
        > 
    </el-pagination>
        <!-- 评论 -->
        <b_comment 
		ref="my_comment" 
		:placeholder="placeholder"
		:if_not_logined="if_not_logined"
        :emoji_list="emoji_list"
		:verify_once="verify_once"
		@submit_click="submit_click"
        class="footer"
	/>
    </div>
    
</template>

<script>
import { getIDnews,getComment,save_comment,isAlive,getZZANG,alreadyZZANG,upZZANG,delComment, invaild} from '../request/api';
import b_comment from '@/components/vue_comment/b_comment.vue'

export default {
    components: {
		'b_comment':b_comment,
	},
    data(){
        return{
        id:'',
        news:'',
        comment_data:[],
        comment:"",
        placeholder: "想说点什么？",//默认文字提示。
        if_not_logined: true,//用户是否没有登录。
	    //颜文字列表。
		emoji_list: ['(⌒▽⌒)', '（￣▽￣）', '(=・ω・=)', '(｀・ω・´)', '(〜￣△￣)〜', '(･∀･)', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', '←_←', '→_→', '(<_<)', '(>_>)', '(;¬_¬)', '("▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', '(｡･ω･｡)', '(´･_･`)', '（￣へ￣）', '(╯°口°)╯(┴—┴', '_(:3」∠)_'],
        verify_once: false,//未登录时，每次评论都需输入验证码
        // 分页属性
        currentPage:1,
        pagesize:5,
        dialogFormVisible:false,
        permission:0,
    }},
    computed:{
	  comment_text(){//获取子组件的评论内容。
		  return this.$refs.my_comment.insert_comment.comment_text;
	  },
	  comment_name(){//获取子组件的评论昵称。
		  return this.$refs.my_comment.insert_comment.comment_name;
	  }
  },
    created(){
        this.id=this.$route.query.id,
        this.init()
    },
    methods:{
        init(){
            let _this=this
            this.news=getIDnews({ID:this.id}).then(function(res){
                _this.news=res.data
            })
            this.comment_data=getComment({news_id:this.id}).then(function(res){
                _this.permission=res.headers['permission'];
                _this.comment_data=res.data
                console.log(res.data);
            })
        },
        delcomment(com_id){
            this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            var self=this;
            delComment({com_id:com_id}).then(function(res){
                self.permission=res.headers['permission']
                if(self.permission>1){
                    self.init();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
                else{
                    invaild()
                    self.$message('请先登录');
                    self.$router.push({ path: '/login' });
                }
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        //点赞
        upLike(com_id,index){
          console.log("点到了赞！");
          var self=this;
          if(self.comment_data[index].already==1) return
          upZZANG({com_id:com_id}).then(res=>{
              self.permission=res.headers['permission']
              if(self.permission>0)
              {
                  if(res.data==1){
                    console.log(index);
                    self.comment_data[index].already=1;
                    self.comment_data[index].count=self.comment_data[index].count+1;
                  }
              }
              else{
                invaild()
                self.$message('请先登录');
                self.$router.push({ path: '/login' });
              }
          })

        },
        handleCurrentChange:function(currentPage){//分页跳转
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
        //点击评论按钮后，触发的事件。
	  //（在这之前会先检验是否为空、是否输入验证码）
	  submit_click(){
        var self=this;
        console.log("用户输入的评论内容是：" + self.comment_text);
        let para={
                content:self.comment_text,
                news_id:self.id
        }
        console.log(para)
        save_comment(para).then(res=>{
            self.permission=res.headers['permission']
              if(self.permission>0){
                if(res.data==true){
                    self.init();
                    self.$refs.my_comment.success_submit("评论成功",1500)
                }
                else this.$refs.my_comment.err_submitFn("评论失败",1500)
            }
            else{
                invaild()
                self.$message('请先登录');
                self.$router.push({ path: '/login' });
            }
        })
	  }
    }
}
</script>

<style>
.footer{
    float:left
}
.comm_title_container{
    margin: -10px;
}
 .news_card{
     width: 80%;
 }
 .text {
    font-size: 18px;
  }
  .clearfix{
    text-align: center;
  }
  .title {
   
    font-size: 25px;
    font-weight: bold
  }
  .comm_item{
      margin-bottom: 5px;
      width: 80%;
  }
  .comm_title{
      font-size: 20px;
      /* font-weight: bold; */
      color: #0A98D5;
  }
  .comm_like{
      float: right;
      font-size: 20px;
  }
  .comm_img{
      float: right;
      height: 20px;
      width: 10px;
      border: none;
  }
  .el-icon-my-export{
    background: url(../logo/like.png) center no-repeat;
    background-size: cover;
    margin-bottom: 2px;
    height: 15px;
    width: 20px;
}
.el-icon-my-export:before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
}
.comm_img2{
      float: right;
      height: 20px;
      width: 10px;
      border: none;
}
.el-icon-my-export2{
    background: url(../logo/nolike.png) center no-repeat;
    background-size: cover;
    margin-bottom: 2px;
    height: 15px;
    width: 20px;
}
.el-icon-my-export2:before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
}

  .comm_content{
      font-size: 15px;
      margin: -10px;
      margin-bottom: 10px
  }
  .comm_time{
      font-size: 10px;
      margin: -10px;
  }
  .del_comm{
      float: right;

  }
  .divider{
      font-size: 20px
  }
  .footer{
      margin-left: 20px
  }

</style>
