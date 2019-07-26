<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>彭淦</span>
    </div>
        <div class="img">
            <el-avatar shape="square" :size=large :src="squareUrl"></el-avatar>
        </div>
        <div class="font" style="float: center">
            <p align="left">彭淦</p>
            <p align="left">18</p>
            <p align="left">男</p>
            <p align="left">465548114@qq.com</p>
            <p align="left">湖人队</p>
        </div>
</el-card>
</template>
<script>
  export default {
    data() {
      return {
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      };
    },

    methods: {
    }
  }
</script>
<style>

</style>
