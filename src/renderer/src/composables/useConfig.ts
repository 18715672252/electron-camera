import { ref } from 'vue'

export type ConfigType = {
  deviceId: string
}

const config: ConfigType = ref<ConfigType>({
  deviceId: ''
})

export default () => {
  return config
}
