<script setup>
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'
import BackButton from '../components/BackButton.vue'
import { store, showToast } from '../store'

const router = useRouter()
const MAX_STOPS = 5

function addStop() {
  if (store.stops.length - 1 >= MAX_STOPS) return showToast(`No máximo ${MAX_STOPS} paradas`)
  store.stops.push('')
}

function removeStop(i) {
  store.stops.splice(i, 1)
}

function done() {
  const filled = store.stops.slice(1).filter((s) => s.trim())
  if (!filled.length) return showToast('Adicione pelo menos uma parada')
  store.destination = filled[filled.length - 1]
  router.push('/ride')
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <header class="px-5 pt-6">
      <BackButton />
    </header>

    <div class="mt-4 px-5">
      <div v-for="(stop, i) in store.stops" :key="i" class="flex items-center gap-3 mb-[16px]">
        <!-- marcador: ponto de origem, número da parada ou "+" -->
        <div class="w-[30px] flex justify-center">
          <span v-if="i === 0" class="size-[9px] rounded-full bg-ink-4" />
          <span v-else class="min-w-[18px] h-[18px] px-1 bg-black text-white text-[13px] grid place-items-center">{{ i }}</span>
        </div>
        <label class="flex-1 h-[44px] bg-fill-2 flex items-center pr-4 focus-within:ring-2 focus-within:ring-black">
          <span class="sr-only">{{ i === 0 ? 'Embarque' : `Parada ${i}` }}</span>
          <input v-model="store.stops[i]" type="text" :placeholder="i === 0 ? 'Local de embarque' : 'Adicionar parada'" class="flex-1 min-w-0 bg-transparent px-3 text-[16px] placeholder:text-ink-4 outline-none" @keyup.enter="done" />
          <Icon name="drag" :size="22" class="text-[#7a74b8]" />
        </label>
        <button v-if="i > 0" :aria-label="`Remover parada ${i}`" class="size-8 grid place-items-center rounded-full hover:bg-fill transition-colors" :class="store.stops.length > 2 ? '' : 'invisible'" @click="removeStop(i)">
          <Icon name="close" :size="20" />
        </button>
        <span v-else class="size-8" />
      </div>

      <button class="flex items-center gap-3 text-ink-3 hover:text-ink transition-colors" @click="addStop">
        <span class="w-[30px] flex justify-center"><Icon name="plus" :size="18" /></span>
        <span class="text-[16px]">Adicionar outra parada</span>
      </button>

      <p class="mt-6 text-[16px] text-ink-3">Agora você pode adicionar várias paradas</p>
    </div>

    <div class="relative mt-5 flex-1 min-h-[280px]">
      <img src="/img/map-stops.png" alt="Mapa da região" class="absolute inset-0 size-full object-cover object-top" />
      <div class="absolute inset-x-5 bottom-6">
        <button class="w-full h-16 bg-black text-white text-[18px] font-semibold hover:bg-neutral-800 active:scale-[.99] transition shadow-lg" @click="done">
          Concluir
        </button>
      </div>
    </div>
  </div>
</template>
