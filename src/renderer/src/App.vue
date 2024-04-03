<script setup lang="ts">
import { ref } from 'vue'
import { Setting as SettingIcon, CameraFive } from '@icon-park/vue-next'
import Camera from './components/Camera.vue'
import Steting from './components/Steting.vue'
const page = ref<'camera' | 'setting'>('setting')
</script>

<template>
  <main class="relative">
    <section>
      <SettingIcon
        v-if="page === 'camera'"
        class="absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer nodrag z-50"
        theme="outline"
        size="16"
        fill="#7ed421"
        @click="page = 'setting'"
      />
      <CameraFive
        v-if="page === 'setting'"
        class="absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer nodrag"
        theme="outline"
        size="16"
        fill="#7ed421"
        @click="page = 'camera'"
      />
    </section>
    <Suspense>
      <section>
        <Camera v-if="page === 'camera'" />
        <Steting v-else />
      </section>
    </Suspense>
  </main>
</template>
