<script setup lang="ts">
import useConfig, { ConfigType } from '../composables/useConfig'
import { onMounted, defineProps, toRefs } from 'vue'
const config = useConfig()
// const devices = await navigator.mediaDevices.enumerateDevices()
// const cameras = devices.filter((device) => device.kind.includes('video'))
const props = defineProps<{ round: boolean }>()
const { round } = toRefs(props)
onMounted(() => {
  const constraints = {
    audio: false,
    video: { deviceId: config.deviceId }
  } as MediaStreamConstraints
  const video = document.querySelector('video')!

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream
    video.play()
  })
})
</script>

<template>
  <main class="w-sceen h-screen flex" :class="{ 'rounded-full': round }">
    <video class="object-cover" :class="{ 'rounded-full': round }"></video>
  </main>
</template>

<style lang="scss"></style>
