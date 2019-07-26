<template>
    <div>
        <h2>东部</h2>
        <el-table :data="Eastlist">
            <el-table-column prop="rank" label="排名"></el-table-column>
            <el-table-column prop="name" label="队名"></el-table-column>
            <el-table-column prop="v" label="胜"></el-table-column>
            <el-table-column prop="l" label="负"></el-table-column>
            <el-table-column prop="v_per" label="胜率"></el-table-column>
            <el-table-column prop="v_dif" label="胜场差"></el-table-column>
            <el-table-column prop="h_park" label="主场"></el-table-column>
            <el-table-column prop="v_park" label="客场"></el-table-column>
            <el-table-column prop="gameside" label="赛区"></el-table-column>
            <el-table-column prop="part" label="东部"></el-table-column>
            <el-table-column prop="score" label="得分"></el-table-column>
            <el-table-column prop="losing" label="失分"></el-table-column>
            <el-table-column prop="net_win" label="净胜"></el-table-column>
            <el-table-column prop="s" label="连胜/负"></el-table-column>
        </el-table>
        <h2>西部</h2>
        <el-table :data="Westlist">
            <el-table-column prop="rank" label="排名"></el-table-column>
            <el-table-column prop="name" label="队名"></el-table-column>
            <el-table-column prop="v" label="胜"></el-table-column>
            <el-table-column prop="l" label="负"></el-table-column>
            <el-table-column prop="v_per" label="胜率"></el-table-column>
            <el-table-column prop="v_dif" label="胜场差"></el-table-column>
            <el-table-column prop="h_park" label="主场"></el-table-column>
            <el-table-column prop="v_park" label="客场"></el-table-column>
            <el-table-column prop="gameside" label="赛区"></el-table-column>
            <el-table-column prop="part" label="西部"></el-table-column>
            <el-table-column prop="score" label="得分"></el-table-column>
            <el-table-column prop="losing" label="失分"></el-table-column>
            <el-table-column prop="net_win" label="净胜"></el-table-column>
            <el-table-column prop="s" label="连胜/负"></el-table-column>
        </el-table> 
    </div>
     
</template>

<script>
import { requestgetGame_conditon } from '../request/api';
export default {
    created(){
        requestgetGame_conditon().then(res=>{
            this.Eastlist=res.data.east
            this.Westlist=res.data.west
            console.log(this.Eastlist)
        })
    },
    data(){
        return{
            Eastlist:[],
            Westlist:[]
        }
    }
}
</script>

<style>

</style>
