<template>
<div class="deit">
     <div class="crumbs" >
      <p align="left"></p>
        <div class="cantainer">
                    <el-table :data="scheduleList" stripe border width="700" align="center" :span-method="cellMerge" style="font-size: 20px">
                        <el-table-column label="日期" prop="Stime" align="center" >    
                        </el-table-column>
                        <el-table-column label="开始时间" prop="Dtime" align="center">    
                        </el-table-column>
                        <el-table-column label="主场队伍" prop="Team1" align="center">
                              <template slot-scope="scope">
                                <div style="color:black;text-decoration:underline;cursor:pointer;" @click="getMore(scope.row.Team1)">{{ scope.row.Team1 }}</div>
                              </template>  
                        </el-table-column>
                        <el-table-column label="客场队伍" prop="Team2" align="center">
                              <template slot-scope="scope">
                                <div style="color:black;text-decoration:underline;cursor:pointer;" @click="getMore(scope.row.Team2)">{{ scope.row.Team2 }}</div>
                              </template>     
                        </el-table-column>
                    </el-table>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
        scheduleList:[],
        spanArr:[]
        }
    },
    created(){
        this.scheduleHandle()
    },
    methods:{
        getMore(Name) {
        var _this=this
        _this.$router.push({name: "球队详细信息",query :{'Name':Name}});
            },
        scheduleHandle() {
            var self=this;
            this.$ajax({
                method:'get',
                url:'http://localhost:8082/schedule',
                responseType:'json',
            }).then(
                function(res)
                {
                    console.log(res);
                    self.scheduleList=res.data;
                      for (var i = 0; i < self.scheduleList.length; i++) {
                        if (i === 0) {
                            self.spanArr.push(1);
                            self.pos = 0
                      } else {
          // 判断当前元素与上一个元素是否相同
                        if (self.scheduleList[i].Stime === self.scheduleList[i - 1].Stime) {
                            self.spanArr[self.pos] += 1;
                            self.spanArr.push(0);
                        } else {
                            self.spanArr.push(1);
                            self.pos = i;
                            }
                    }
                    }
                    console.log('spanarr'+self.spanArr)
                })
                .catch(function(err){
                console.log(err);
                })
        },
cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
                  rowspan: _row,
                  colspan: _col
            }
      }
}
    }
  };
</script>
