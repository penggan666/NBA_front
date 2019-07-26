<template>
    <div>
        <el-table :data="feed_data.slice((currentPage-1)*pagesize,currentPage*pagesize)" width="700">
            <!-- <el-table-column label="id" prop="log_id" > </el-table-column> -->
            <el-table-column label="时间" prop="log_date" > </el-table-column> -->
            <el-table-column label="邮箱回复"  >  
                <template slot-scope="scope">
                    <a :href="'mailto:'+scope.row.email" v-on:click="handle_log2(scope.row.log_id)">{{scope.row.email}}</a>
                </template>
            </el-table-column>
            <el-table-column label="反馈内容" prop="content" > 

            </el-table-column>
            <el-table-column label="状态" prop="hashandled" > 
                <template slot-scope="scope">
                    {{scope.row.hashandled==0?'未处理':'已处理'}}
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"     
        layout="total,prev, pager, next, jumper"
        :total="feed_data.length"
        ></el-pagination>

    </div>
</template>

<script>
import { get_feed,handle_log, decrypt } from '../request/api';
export default {
    data(){
        return{
            feed_data:[],
             // 分页属性
            currentPage:1,
            pagesize:10,
        }
        
    },
    created(){
        this.get_feed2()
    },
    methods:{
        handleCurrentChange:function(currentPage){//分页跳转
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
        handle_log2(log_id){
            var self=this
            let params={log_id:log_id};
            handle_log(params)
            .then(function(res){
                var permission=res.headers['permission']
                if(permission>1&&res.data==true){
                    self.get_feed2()
                }
                else{
                    invaild()
                    self.$message('请先登录');
                    self.$router.push({ path: '/login' });
                }
            })
            
        },
        get_feed2(){
            var self=this
            get_feed().then(function(res)
            {
                var permission=res.headers['permission']
                if(permission>1&&res.data!=null){
                    self.feed_data=JSON.parse(decrypt(res.data))
                }
                else{
                    invaild()
                    self.$message('请先登录');
                    self.$router.push({ path: '/login' });
                }
            })
        },
    }
}
</script>

<style>

</style>