<script setup lang="ts">
import { ref } from 'vue'
import { Setting as SettingIcon, CameraFive, InnerShadowBottomLeft } from '@icon-park/vue-next'
import Camera from './components/Camera.vue'
import Steting from './components/Steting.vue'
// import useDrag from './composables/useDrag'
// const drag = new useDrag()
// drag.run()
const page = ref<'camera' | 'setting'>('camera')
const round = ref<boolean>(true)
const setRound = () => {
  round.value = !round.value
}
const quit = () => {
  window.api.quit()
}
</script>

<template>
  <main class="relative group nodrag" @contextmenu.prevent="quit">
    <div
      class="absolute z-100 left-0 top-1/2 -translate-y-1/2 drag"
      style="height: 50%; width: 95%"
    ></div>
    <section>
      <SettingIcon
        v-if="page === 'camera'"
        class="absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer nodrag z-50 hidden group-hover:block"
        theme="outline"
        size="24"
        fill="white"
        @click="page = 'setting'"
      />
      <CameraFive
        v-if="page === 'setting'"
        class="absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer nodrag hidden group-hover:block"
        theme="outline"
        size="24"
        fill="white"
        @click="page = 'camera'"
      />
      <InnerShadowBottomLeft
        v-if="page === 'camera'"
        class="absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer nodrag bottom-4 z-50 hidden group-hover:block"
        theme="outline"
        size="24"
        fill="White"
        @click="setRound"
      />
    </section>
    <Suspense>
      <section>
        <Camera v-if="page === 'camera'" :round="round" />
        <Steting v-else />
      </section>
    </Suspense>
  </main>
</template>
