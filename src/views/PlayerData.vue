<template>
    <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input v-model="filters.playername" placeholder="球员名" @keyup.enter.native="getPlayerData"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getPlayerData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table :data="playerlist.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column label="排名" prop="a" align="center"></el-table-column>
        <el-table-column label="球员" prop="s" align="center"></el-table-column>
        <el-table-column label="球队" prop="d" align="center"></el-table-column>
        <el-table-column label="得分" prop="f" align="center"></el-table-column>
        <el-table-column label="命中-出手" prop="g" align="center"></el-table-column>
        <el-table-column label="命中率" prop="h" align="center"></el-table-column>
        <el-table-column label="命中-三分" prop="j" align="center"></el-table-column>
        <el-table-column label="三分命中率" prop="k" align="center"></el-table-column>
        <el-table-column label="命中-罚球" prop="l" align="center"></el-table-column>
        <el-table-column label="罚球命中率" prop="z" align="center"></el-table-column>
        <el-table-column label="场次" prop="x" align="center"></el-table-column>
        <el-table-column label="上场时间" prop="c" align="center"></el-table-column>
        
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-size="pagesize"       
        layout="total,prev, pager, next, jumper"
        :total="playerlist.length"
        > 
    </el-pagination>
    </div>
</template>

<script>
import { requestgetPlayerData } from '../request/api';
export default {
    created(){
        this.getPlayerData()
        // requestgetPlayerData().then(res=>{
        //     console.log(res.data)
        //     this.playerlist=res.data
        // })
    },
    data(){
        return{
            filters: {//搜索功能
				playername: ''
            },
            currentPage:1,
            pagesize:20,
            dialogFormVisible:false,
            playerlist:[]
        }
    },
    methods:{
        handleCurrentChange:function(currentPage){
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
        getPlayerData(){
            let para={'playername':this.filters.playername}
            requestgetPlayerData(para).then(
                    res=>{
                    console.log(res.data)
                    this.playerlist=res.data
                }
            )
        }
    }

}
</script>

<style>

</style>
