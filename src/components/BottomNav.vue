<script setup>
import Icon from './Icon.vue'
import { showToast } from '../store'

const items = [
  { label: 'Início', icon: 'home', to: '/' },
  { label: 'Serviços', icon: 'grid' },
  { label: 'Atividade', icon: 'receipt', to: '/trips' },
  { label: 'Conta', icon: 'person' },
]
</script>

<template>
  <nav class="sticky bottom-0 z-30 bg-white border-t border-line grid grid-cols-4 pt-2.5 pb-[max(14px,env(safe-area-inset-bottom))]" aria-label="Navegação principal">
    <component
      :is="item.to ? 'router-link' : 'button'"
      v-for="item in items"
      :key="item.label"
      :to="item.to"
      class="flex flex-col items-center justify-center gap-1 py-1 text-[14px] font-medium transition-colors"
      :class="item.to && $route.path === item.to ? 'text-ink' : 'text-ink-4 hover:text-ink-3'"
      @click="!item.to && showToast(`${item.label} em breve`)"
    >
      <Icon :name="item.icon" :size="24" />
      {{ item.label }}
    </component>
  </nav>
</template>
