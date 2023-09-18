<script setup lang="ts">
import * as mars3d from "mars3d";
import * as mapWork from "./map";
import { onMounted, onUnmounted, ref } from "vue";

const extentVal = ref("");
let map;
onMounted(async () => {
  console.log(process.env.BASE_URL);
  await mars3d.Util.fetchJson({
    url: `${process.env.BASE_URL}config/config.json`,
  }).then((data) => {
    initMap(data.map3d);
  });
  mapWork.initMap(map);
});

onUnmounted(() => {
  mapWork.removeMap();
});

function initMap(mapOptions: any) {
  //创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions);
  // map.openFlyAnimation(); //飞行到配置的初始位置
}

const onClickDrawExtent = () => {
  // alert(111);
  mapWork.drawExtent();
};
mapWork.eventTarget.on("drawExtent", (extent: any) => {
  extentVal.value = extent.extent;
  console.log(extent);
});
</script>

<template>
  <div id="mars3dContainer" class="container">
    <div class="widget">
      <mars-button style="color: #fff" @click="onClickDrawExtent"
        >绘制</mars-button
      >
      <mars-input v-model:value="extentVal" :allowClear="true"></mars-input>
      <mars-dialog :visible="true"></mars-dialog>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.widget {
  position: absolute;
  z-index: 1000;
}
</style>
