<template>
  <el-form class="bg-[#2c3e50] w-screen h-screen p-5 flex flex-col py-12" label-position="top">
    <el-form-item class="nodrag">
      <el-select v-model="config.deviceId" placeholder="请选择摄像头" clearable>
        <el-option
          v-for="item in cameras"
          :key="item.deviceId"
          :label="item.label"
          :value="item.deviceId"
        />
      </el-select>
    </el-form-item>
    <el-form-item class="nodrag">
      <el-button class="bg-[#2c3e50]" style="width: 100%" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm, ElButton, ElSelect, ElFormItem, ElOption } from 'element-plus'
import useConfig from '../composables/useConfig'
const devices = await navigator.mediaDevices?.enumerateDevices()
const config = useConfig()
const cameras = devices.filter((device) => device.kind.includes('video'))
console.log(cameras)
const onSubmit = () => {
  console.log(123)
}
</script>

<style lang="scss" scoped></style>
