<template>
    <div>
    <el-card  v-for="(news,index) in newslist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" class="title" shadow="hover" @click.native="goto_News_detail(news.news_id)" >
            {{news.title}}
            <!-- <el-button style="float: right; padding: 3px 0 ;font-size: 25px;" type="text" class="button" @click="goto_News_detail(news.id)" >详情</el-button> -->
    </el-card>
    <!-- 分页 -->
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-size="pagesize"       
        layout="total,prev, pager, next, jumper"
        :total="newslist.length"
        > 
    </el-pagination>
    </div>
</template>

<script>
import { requestgetNews,isAlive } from '../request/api';
export default {
    created(){
        requestgetNews().then(res=>{
            this.newslist=res.data
        })
    },
    data(){
        return{
            newslist:[],
            // 分页属性
            currentPage:1,
            pagesize:10,
            dialogFormVisible:false,


        }
    },
    methods:{
        goto_News_detail(id){
				console.log(id)
                this.$router.push({name: "新闻详情",query :{'id':id}});
				
            },
        handleCurrentChange:function(currentPage){//分页跳转
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
    }
}
</script>

<style>
    .title {
    font-size: 25px;
    margin-bottom: 18px;
    cursor:pointer;
  }
</style>
