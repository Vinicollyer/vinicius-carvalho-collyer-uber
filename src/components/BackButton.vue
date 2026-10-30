<script setup>
import { useRouter } from 'vue-router'
import Icon from './Icon.vue'
defineProps({ floating: Boolean })

const router = useRouter()
// se a página foi aberta direto pelo link, não há histórico: volta para a Home
const goBack = () => (window.history.state?.back ? router.back() : router.push('/'))
</script>

<template>
  <button
    type="button"
    aria-label="Voltar"
    class="grid place-items-center transition active:scale-95"
    :class="floating ? 'size-[57px] rounded-full bg-white shadow-md' : 'size-10 -ml-2 rounded-full hover:bg-fill'"
    @click="goBack"
  >
    <Icon name="arrow-left" :size="30" />
  </button>
</template>
