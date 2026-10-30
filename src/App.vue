<script setup>
import { store } from './store'
</script>

<template>
  <!-- "Moldura" de celular: no desktop centraliza a tela de 440px, no mobile ocupa a tela toda -->
  <div class="min-h-dvh sm:py-6 flex justify-center">
    <main class="relative w-full max-w-[440px] h-dvh sm:h-[925px] sm:max-h-[calc(100dvh-3rem)] bg-white sm:rounded-[28px] sm:shadow-2xl overflow-hidden flex flex-col">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <transition name="toast">
        <div
          v-if="store.toast"
          role="status"
          class="absolute left-1/2 -translate-x-1/2 bottom-24 z-50 bg-black text-white text-[15px] font-medium px-5 py-3 rounded-full shadow-lg whitespace-nowrap"
        >
          {{ store.toast }}
        </div>
      </transition>
    </main>
  </div>
</template>
