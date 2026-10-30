<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'
import BackButton from '../components/BackButton.vue'
import { store, rides, formatBRL, showToast } from '../store'

const router = useRouter()
const selected = computed(() => rides.find((r) => r.id === store.rideId) ?? rides[0])
</script>

<template>
  <div class="flex-1 flex flex-col overflow-y-auto no-scrollbar">
    <!-- mapa com a rota (posições em % para escalar junto com a imagem 440x328) -->
    <div class="relative shrink-0 aspect-[440/328]">
      <img src="/img/map-trip.png" alt="Mapa com a rota da viagem" class="absolute inset-0 size-full object-cover" />
      <div class="absolute left-5 top-5"><BackButton floating /></div>

      <button
        class="absolute left-[31.8%] top-[23.5%] h-[46px] flex items-center bg-white shadow-md hover:shadow-lg transition-shadow"
        @click="router.push('/pickup')"
      >
        <span class="size-[46px] bg-black text-white flex flex-col items-center justify-center leading-none">
          <span class="text-[18px]">12</span><span class="text-[10px] font-light mt-0.5">MIN</span>
        </span>
        <span class="px-2.5 text-[15px] max-w-[170px] truncate">{{ store.pickup }}</span>
        <Icon name="chevron-right" :size="18" class="mr-2" />
      </button>
      <button
        class="absolute right-[8.6%] top-[67.4%] h-[46px] flex items-center bg-white shadow-md hover:shadow-lg transition-shadow pl-[15px]"
        @click="router.push('/search')"
      >
        <span class="text-[15px] max-w-[150px] truncate">{{ store.destination }}</span>
        <Icon name="chevron-right" :size="18" class="mx-2" />
      </button>
    </div>

    <div class="flex-1 flex flex-col bg-white">
      <span class="mx-auto mt-2.5 w-[60px] h-[5px] rounded-full bg-[#d9d9d9]" />
      <p class="mt-[21px] text-center text-[14px] font-medium text-ink-3">Os preços estão um pouco mais altos devido à alta demanda</p>

      <ul class="mt-[17px]" role="radiogroup" aria-label="Opções de viagem">
        <li v-for="r in rides" :key="r.id">
          <button
            role="radio"
            :aria-checked="r.id === store.rideId"
            class="w-full h-[110px] flex items-start gap-6 px-5 pt-[22px] text-left transition-colors"
            :class="r.id === store.rideId ? 'bg-fill' : 'hover:bg-fill-3'"
            @click="store.rideId = r.id"
          >
            <img :src="r.img" alt="" class="w-[81px] h-[66px] object-contain shrink-0" />
            <span class="flex-1 min-w-0">
              <span class="flex items-start justify-between gap-3">
                <span class="flex items-center gap-2" :class="r.id === store.rideId ? 'text-[22px] font-semibold' : 'text-[16px] font-medium'">
                  {{ r.name }}
                  <span v-if="r.seats" class="flex items-center text-[14px] font-medium"><Icon name="person" :size="14" />{{ r.seats }}</span>
                </span>
                <span class="text-[18px] font-semibold whitespace-nowrap">{{ formatBRL(r.price) }}</span>
              </span>
              <span class="block mt-1.5 text-[14px] whitespace-nowrap">{{ r.eta }} · {{ r.away }}</span>
              <span v-if="r.promo" class="block mt-1 text-[16px] font-semibold text-accent whitespace-nowrap">{{ r.promo }}</span>
            </span>
          </button>
        </li>
      </ul>

      <div class="mt-auto border-t-4 border-fill-3">
        <button class="w-full flex items-center gap-3 px-[18px] py-6 hover:bg-fill-3 transition-colors" @click="showToast('Por enquanto só aceitamos dinheiro')">
          <img src="/img/cash.png" alt="" class="w-[42px] h-8" />
          <span class="text-[18px] font-medium">Dinheiro</span>
          <Icon name="chevron-right" :size="20" class="ml-auto text-ink-4" />
        </button>
        <div class="px-5 pb-6">
          <button class="w-full h-16 bg-black text-white text-[18px] font-semibold hover:bg-neutral-800 active:scale-[.99] transition" @click="router.push('/pickup')">
            Confirmar {{ selected.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
