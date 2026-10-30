<script setup>
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import BackButton from '../components/BackButton.vue'
import { trips, showToast, formatBRL } from '../store'

const tabs = [
  { id: 'all', label: 'Todas' },
  { id: 'personal', label: 'Pessoal' },
  { id: 'work', label: 'Trabalho' },
]
const tab = ref('all')
const tabIndex = computed(() => tabs.findIndex((t) => t.id === tab.value))

// agrupa por mês mantendo a ordem original
const groups = computed(() => {
  const out = []
  for (const t of trips) {
    if (tab.value !== 'all' && t.type !== tab.value) continue
    let g = out.find((x) => x.month === t.month)
    if (!g) out.push((g = { month: t.month, items: [] }))
    g.items.push(t)
  }
  return out
})
</script>

<template>
  <div class="flex-1 flex flex-col overflow-y-auto no-scrollbar">
    <header class="px-5 pt-6">
      <BackButton />
      <h1 class="mt-3 text-[28px] font-semibold">Minhas viagens</h1>
    </header>

    <div class="relative mt-4 grid grid-cols-3 border-b border-line" role="tablist">
      <button
        v-for="t in tabs"
        :key="t.id"
        role="tab"
        :aria-selected="tab === t.id"
        class="pb-2.5 text-[20px] font-semibold transition-colors"
        :class="tab === t.id ? 'text-ink' : 'text-ink-3 hover:text-ink-2'"
        @click="tab = t.id"
      >
        {{ t.label }}
      </button>
      <span class="absolute -bottom-px h-[3px] w-1/3 bg-mint transition-transform duration-300" :style="{ transform: `translateX(${tabIndex * 100}%)` }" />
    </div>

    <transition name="page" mode="out-in">
      <div :key="tab" class="px-5 pb-8">
        <section v-for="g in groups" :key="g.month">
          <h2 class="pt-6 pb-1 text-[18px] font-bold">{{ g.month }}</h2>
          <ul class="divide-y divide-line">
            <li v-for="(t, i) in g.items" :key="i">
              <button class="w-full flex items-center gap-4 py-3 text-left hover:bg-fill-3 transition-colors" @click="showToast(t.cancelled ? 'Esta viagem foi cancelada' : 'Recibo enviado para o seu e-mail')">
                <span class="size-12 shrink-0 rounded-full bg-[#f4f4f6] border border-[#e9eaee] grid place-items-center"><Icon name="car" :size="26" /></span>
                <span class="flex-1 min-w-0">
                  <span class="block text-[18px] font-medium truncate">{{ t.place }}</span>
                  <span class="block text-[15px] text-ink-2 mt-1">{{ t.date }}</span>
                </span>
                <span class="shrink-0 text-right">
                  <span class="block text-[18px] font-bold">{{ formatBRL(t.price) }}</span>
                  <span v-if="t.cancelled" class="block text-[13px] text-ink-3 mt-0.5">Cancelada</span>
                </span>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </transition>
  </div>
</template>
