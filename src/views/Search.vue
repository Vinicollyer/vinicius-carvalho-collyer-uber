<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'
import BackButton from '../components/BackButton.vue'
import { store, searchResults, showToast } from '../store'

const router = useRouter()
const pickup = ref('')
const query = ref('')
const whereInput = ref(null)

onMounted(() => whereInput.value?.focus())

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return searchResults
  return searchResults.filter((r) => (r.name + ' ' + r.address).toLowerCase().includes(q))
})

function choose(place) {
  store.destination = place.name
  if (pickup.value.trim()) store.pickup = pickup.value.trim()
  router.push('/ride')
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-y-auto no-scrollbar">
    <header class="relative px-5 pt-6 flex items-center">
      <BackButton />
      <button class="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-[16px] hover:bg-fill rounded-full pl-1 pr-3 py-1 transition-colors" @click="showToast('Viajando como você')">
        <span class="size-[26px] rounded-full bg-fill grid place-items-center text-ink-4"><Icon name="person" :size="18" /></span>
        Trocar passageiro
        <Icon name="chevron-down" :size="18" />
      </button>
    </header>

    <!-- origem / destino -->
    <div class="mt-4 pl-5 pr-5 flex items-center gap-3">
      <div class="w-[30px] flex flex-col items-center self-stretch py-[14px]">
        <span class="size-[9px] rounded-full bg-black" />
        <span class="w-px flex-1 bg-ink my-1" />
        <span class="size-[9px] bg-ink-3" />
      </div>
      <div class="flex-1 space-y-3">
        <input
          v-model="pickup"
          type="text"
          placeholder="Local de embarque"
          class="w-full h-[37px] bg-fill px-4 text-[16px] placeholder:text-ink-3 outline-none focus:ring-2 focus:ring-black"
        />
        <input
          ref="whereInput"
          v-model="query"
          type="text"
          placeholder="Para onde?"
          class="w-full h-[37px] bg-fill-2 px-4 text-[16px] placeholder:text-ink-3 outline-none focus:ring-2 focus:ring-black"
          @keyup.enter="results[0] && choose(results[0])"
        />
      </div>
      <router-link to="/stops" aria-label="Adicionar paradas" class="size-[44px] rounded-full bg-fill grid place-items-center hover:bg-[#e4e4e4] transition-colors">
        <Icon name="plus" :size="26" />
      </router-link>
    </div>

    <button class="mt-[26px] mx-5 flex items-center gap-6 text-[16px] text-left" @click="showToast('Nenhum local salvo ainda')">
      <span class="size-[41px] rounded-full bg-ink-4 grid place-items-center text-white"><Icon name="star" :size="20" /></span>
      Locais salvos
    </button>

    <hr class="mt-[15px] border-t-[5px] border-[#ededed]" />

    <ul class="divide-y divide-line">
      <li v-for="r in results" :key="r.name">
        <button class="w-full flex items-center gap-6 px-5 py-[12px] text-left hover:bg-fill-3 transition-colors" @click="choose(r)">
          <span class="size-[41px] shrink-0 rounded-full bg-ink-4 grid place-items-center text-white"><Icon name="clock" :size="20" /></span>
          <span class="min-w-0">
            <span class="block text-[16px] truncate">{{ r.name }}</span>
            <span class="block text-[15px] text-ink-5 truncate mt-1">{{ r.address }}</span>
          </span>
        </button>
      </li>
      <li v-if="!results.length" class="px-5 py-8 text-center text-ink-3">Nenhum resultado para “{{ query }}”</li>
    </ul>
  </div>
</template>
