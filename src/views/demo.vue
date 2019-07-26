<template >
    <div class="demo">
        <div class="left">左</div>
        <div class="middle">1月25日下午，吉林长春多名网友发布视频称，红旗街万达广场附近疑似发生爆炸，现场传来“砰砰”声。目击者张女士告诉北青报记者，事发时她正在万达广场的一家餐厅吃饭，大约3点10分左右，突然听到巨大的爆炸声，“炸了有二十多下，商场广播里说让大家撤离，我们就赶紧跑出来了”。张女士称，疏散时，有火星溅到她旁边，但具体是哪边爆炸、是否有人员伤亡暂不清楚。
1月25日下午4时，北青报记者从长春市当地消防部门获悉，目前消防人员已在现场处理，事发原因及是否有人员受伤的情况暂不方便透露。消防人员叮嘱，当地市民请勿靠近事故发生地点，以确保安全。</div>
        <div class="right">右</div>
    </div>
    
</template>

<script>
export default {

}
</script>

<style scoped>
.demo{
    
}
.left{
    width: 200px;
    height: 500px;
    position: absolute ;
    left: 230px;
    top: 0;
    background: #ccc
}
.right{
    width: 300px;
    height: 500px;
    position: absolute ;
    right: 0;
    top: 0;
    background: rgb(180, 24, 24)
}
.middle{

    height: 500px;
    margin: 0 300px 0 200px;
    
    background: rgb(87, 80, 80)
}
</style>
