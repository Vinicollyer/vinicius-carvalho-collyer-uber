<script setup>
import { ref, computed, watch } from 'vue'
import { store, showToast } from '../store'

const open = defineModel('open', { type: Boolean })

// próximos 7 dias e janelas de 10 minutos a cada 15 min
const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  const label = `${d.toLocaleDateString('pt-BR', { weekday: 'short' })} ${d.getDate()} ${d.toLocaleDateString('pt-BR', { month: 'short' })}`.replace(/\./g, '')
  return i === 0 ? `Hoje (${label})` : label
})
const pad = (n) => String(n).padStart(2, '0')
const slots = Array.from({ length: 96 }, (_, i) => {
  const a = i * 15
  const b = a + 10
  return `${pad(Math.floor(a / 60))}:${pad(a % 60)} – ${pad(Math.floor(b / 60) % 24)}:${pad(b % 60)}`
})

const dayIdx = ref(0)
const slotIdx = ref(37) // 09:15
const editing = ref(null) // 'day' | 'time'

watch(open, (v) => {
  if (v) {
    editing.value = null
    // abre na próxima janela disponível a partir de agora
    const now = new Date()
    slotIdx.value = Math.min(95, Math.ceil((now.getHours() * 60 + now.getMinutes() + 15) / 15))
  }
})

const list = computed(() => (editing.value === 'day' ? days : slots))
const current = computed(() => (editing.value === 'day' ? dayIdx.value : slotIdx.value))

function choose(i) {
  if (editing.value === 'day') dayIdx.value = i
  else slotIdx.value = i
  editing.value = null
}

function confirm() {
  store.schedule = { date: days[dayIdx.value], time: slots[slotIdx.value] }
  open.value = false
  showToast(`Embarque: ${days[dayIdx.value]}, ${slots[slotIdx.value]}`)
}

function reset() {
  store.schedule = null
  open.value = false
}
</script>

<template>
  <Teleport to="main">
    <transition name="sheet">
      <div v-if="open" class="absolute inset-0 z-40 flex flex-col justify-end" role="dialog" aria-modal="true" aria-labelledby="schedule-title">
        <div class="absolute inset-0 bg-black/60" @click="open = false" />
        <div class="sheet-panel relative bg-white pb-[env(safe-area-inset-bottom)]">
          <h2 id="schedule-title" class="text-center text-[32px] pt-9 pb-[30px]">Agendar viagem</h2>
          <hr class="border-line" />

          <div v-if="!editing">
            <button class="w-full py-[30px] text-[24px] hover:bg-fill-3 transition-colors" @click="editing = 'day'">
              {{ days[dayIdx] }}
            </button>
            <hr class="mx-5 border-line" />
            <button class="w-full py-[30px] text-[24px] hover:bg-fill-3 transition-colors" @click="editing = 'time'">
              {{ slots[slotIdx] }}
            </button>
          </div>
          <ul v-else class="max-h-[190px] overflow-y-auto no-scrollbar py-2">
            <li v-for="(item, i) in list" :key="item">
              <button
                class="w-full py-3 text-[22px] transition-colors"
                :class="i === current ? 'text-ink font-medium bg-fill' : 'text-ink-3 hover:bg-fill-3'"
                :ref="(el) => i === current && el && el.scrollIntoView({ block: 'center' })"
                @click="choose(i)"
              >
                {{ item }}
              </button>
            </li>
          </ul>
          <hr class="border-line" />

          <div class="px-5 pt-[33px] pb-9 space-y-3">
            <button class="w-full h-16 bg-black text-white text-[18px] font-semibold hover:bg-neutral-800 active:scale-[.99] transition" @click="confirm">
              Definir horário
            </button>
            <button v-if="store.schedule" class="w-full h-12 text-[16px] font-medium hover:bg-fill transition-colors" @click="reset">
              Viajar agora
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
