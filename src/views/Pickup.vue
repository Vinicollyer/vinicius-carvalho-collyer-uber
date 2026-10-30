<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import { store, rides, showToast } from '../store'

const router = useRouter()
const zones = ['Frei Caneca - Escolha a zona de embarque -- Entrada 2', 'Frei Caneca - Escolha a zona de embarque -- Entrada principal']
const zone = ref(1)
const search = ref(store.pickup)
const editing = ref(false)

function confirm() {
  store.pickup = search.value.trim() || store.pickup
  const ride = rides.find((r) => r.id === store.rideId)
  const when = store.schedule ? ` para ${store.schedule.date}, ${store.schedule.time.split(' – ')[0]}` : ''
  showToast(`${ride.name} solicitado${when}!`)
  router.push('/')
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-y-auto no-scrollbar">
    <div class="relative shrink-0 aspect-[440/461]">
      <img src="/img/map-pickup.png" alt="Mapa da zona de embarque" class="absolute inset-0 size-full object-cover" />
      <div class="absolute left-5 top-5"><BackButton floating /></div>
      <!-- balão da zona selecionada -->
      <div class="absolute left-[24.5%] top-[42.5%] max-w-[65%] bg-accent text-white text-[16px] leading-5 px-[14px] py-[11px] rounded-[30px] shadow-md">
        {{ zones[zone] }}
      </div>
    </div>

    <p class="py-[22px] text-center text-[18px] font-medium text-[#1e1e1e] border-b border-line">Escolha o local de embarque</p>

    <div class="flex items-center gap-3 px-5 py-[19px] border-b border-line">
      <input
        v-if="editing"
        v-model="search"
        type="text"
        aria-label="Local de embarque"
        class="flex-1 min-w-0 text-[15px] outline-none border-b border-black py-1"
        @keyup.enter="editing = false"
      />
      <span v-else class="flex-1 text-[15px] truncate">{{ search }}</span>
      <button class="h-[38px] px-[17px] rounded-full bg-fill text-[16px] font-medium hover:bg-[#e4e4e4] transition-colors" @click="editing = !editing">
        {{ editing ? 'OK' : 'Buscar' }}
      </button>
    </div>

    <ul class="bg-fill-2 py-6 px-5 space-y-6 text-[22px] font-medium" role="radiogroup" aria-label="Zonas de embarque">
      <li v-for="(z, i) in zones" :key="z">
        <button
          role="radio"
          :aria-checked="zone === i"
          class="w-full transition-colors"
          :class="zone === i ? 'text-accent text-center' : 'text-ink-3 text-left truncate hover:text-ink-2'"
          @click="zone = i; showToast('Zona de embarque atualizada')"
        >
          {{ z }}
        </button>
      </li>
    </ul>

    <div class="mt-auto border-t border-line px-5 pt-5 pb-6">
      <button class="w-full h-16 bg-black text-white text-[18px] font-semibold hover:bg-neutral-800 active:scale-[.99] transition" @click="confirm">
        Confirmar embarque
      </button>
    </div>
  </div>
</template>
