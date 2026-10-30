<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'
import BottomNav from '../components/BottomNav.vue'
import ScheduleSheet from '../components/ScheduleSheet.vue'
import { store, recentPlaces, showToast } from '../store'

const router = useRouter()
const tab = ref('rides')
const scheduleOpen = ref(false)

const suggestions = [
  { label: 'Viagem', img: 'img/sug-ride.png', size: 95, to: '/search' },
  { label: 'Entrega', img: 'img/sug-package.png', size: 48 },
  { label: 'Por hora', img: 'img/sug-hourly.png', size: 73, schedule: true },
]

const saves = [
  [
    { title: 'Compartilhe', text: 'Divida a viagem e o custo', img: 'img/save-1.png', to: '/ride' },
    { title: 'Até 5 paradas', text: 'Busque amigos no caminho', img: 'img/save-2.png', to: '/stops' },
  ],
  [
    { title: 'Aeroporto', text: 'Chegue sempre no horário', img: 'img/save-3.png', to: '/search' },
    { title: 'Uber Eats', text: 'Comida na sua porta', img: 'img/save-4.png' },
  ],
]

const promos = [
  { title: 'Um motorista, várias paradas', cta: 'Usar Uber por hora' },
  { title: 'Planeje e chegue na hora', cta: 'Agendar viagem' },
  { title: 'Vá mais longe por menos', cta: 'Usar UberX Share' },
]
const promoIndex = ref(0)
const promoTrack = ref(null)
function onPromoScroll(e) {
  promoIndex.value = Math.round(e.target.scrollLeft / e.target.clientWidth)
}
function goToPromo(i) {
  promoTrack.value.scrollTo({ left: i * promoTrack.value.clientWidth, behavior: 'smooth' })
}
function promoAction(i) {
  if (i === 1) scheduleOpen.value = true
  else router.push(i === 0 ? '/stops' : '/ride')
}

const whenLabel = computed(() => (store.schedule ? store.schedule.time.split(' – ')[0] : 'Agora'))

function openSuggestion(s) {
  if (s.schedule) scheduleOpen.value = true
  else if (s.to) router.push(s.to)
  else showToast('Entregas em breve')
}

function pickRecent(place) {
  store.destination = place.name
  router.push('/ride')
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-y-auto no-scrollbar">
    <!-- Abas Rides / Delivery -->
    <div class="pt-8 px-10 flex justify-between" role="tablist">
      <button
        role="tab"
        :aria-selected="tab === 'rides'"
        class="flex items-center gap-3 pb-1.5 border-b-[3px] transition-colors"
        :class="tab === 'rides' ? 'border-ink text-ink' : 'border-transparent text-ink-3'"
        @click="tab = 'rides'"
      >
        <img src="/img/tab-rides.png" alt="" class="w-[49px] h-10 object-contain" />
        <span class="text-[28px] font-medium">Viagens</span>
      </button>
      <button
        role="tab"
        :aria-selected="tab === 'delivery'"
        class="flex items-center gap-3 pb-1.5 border-b-[3px] transition-colors"
        :class="tab === 'delivery' ? 'border-ink text-ink' : 'border-transparent text-ink-3'"
        @click="tab = 'delivery'"
      >
        <img src="/img/sug-package.png" alt="" class="w-[35px] h-[33px] object-contain" />
        <span class="text-[28px] font-medium">Entregas</span>
      </button>
    </div>

    <!-- Busca -->
    <div class="mx-5 mt-5 h-[62px] rounded-full bg-fill flex items-center">
      <router-link to="/search" class="flex-1 h-full flex items-center gap-3 pl-4 text-ink-2 hover:text-ink transition-colors">
        <Icon name="search" :size="32" class="text-ink" />
        <span class="text-[24px] font-semibold">{{ tab === 'rides' ? 'Para onde?' : 'Enviar para?' }}</span>
      </router-link>
      <span class="w-px h-[47px] bg-line" />
      <button
        class="mx-3 h-10 w-[126px] rounded-full bg-white flex items-center justify-between px-3 text-[16px] font-medium hover:bg-fill-3 transition-colors"
        @click="scheduleOpen = true"
      >
        <Icon name="clock" :size="20" />
        {{ whenLabel }}
        <Icon name="chevron-down" :size="20" />
      </button>
    </div>

    <!-- Lugares recentes -->
    <ul class="mt-3 px-5">
      <li v-for="(place, i) in recentPlaces" :key="i">
        <button class="w-full flex items-center gap-[18px] text-left group py-4" @click="pickRecent(place)">
          <span class="size-[45px] shrink-0 rounded-full bg-fill grid place-items-center">
            <Icon name="pin" :size="20" />
          </span>
          <span class="flex-1 min-w-0">
            <span class="block text-[20px] font-medium leading-6">{{ place.name }}</span>
            <span class="block text-[16px] text-ink-2 truncate mt-1">{{ place.address }}</span>
          </span>
          <Icon name="chevron-right" :size="22" class="text-ink-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <hr v-if="i === 0" class="ml-[63px] border-line" />
      </li>
    </ul>

    <hr class="mt-3 border-t-[8px] border-fill" />

    <!-- Sugestões -->
    <section class="px-[18px] pt-[22px]">
      <div class="flex items-center justify-between">
        <h2 class="text-[22px] font-medium">Sugestões</h2>
        <button class="text-[16px] font-medium hover:underline" @click="$router.push('/search')">Ver tudo</button>
      </div>
      <div class="mt-[38px] grid grid-cols-3 gap-[18px] px-0.5">
        <button
          v-for="s in suggestions"
          :key="s.label"
          class="relative h-[121px] rounded-xl bg-fill hover:bg-[#e4e4e4] active:scale-[.97] transition flex flex-col items-center justify-end pb-3"
          @click="openSuggestion(s)"
        >
          <img :src="s.img" alt="" class="absolute top-3 left-1/2 -translate-x-1/2 object-contain" :class="s.size === 48 ? 'top-[26px]' : ''" :style="{ width: s.size + 'px', height: s.size === 95 ? '84px' : s.size + 'px' }" />
          <span class="relative text-[14px] font-medium">{{ s.label }}</span>
        </button>
      </div>
    </section>

    <hr class="mt-9 border-t-[8px] border-fill" />

    <!-- Ways to save (1º carrossel) -->
    <section class="pt-6">
      <h2 class="px-[18px] text-[22px] font-medium">Formas de economizar</h2>
      <div class="mt-5 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-5 px-5 pb-1 after:content-[''] after:shrink-0 after:w-1">
        <router-link
          v-for="(card, i) in saves[0]"
          :key="card.title"
          :to="card.to"
          class="snap-start shrink-0 group"
          :class="i === 0 ? 'w-[255px]' : 'w-[200px]'"
        >
          <img :src="card.img" alt="" class="h-[133px] w-full object-cover object-left rounded-xl" />
          <p class="mt-3 text-[20px] font-medium flex items-center gap-2 whitespace-nowrap">
            {{ card.title }} <Icon name="arrow-right" :size="20" class="group-hover:translate-x-1 transition-transform" />
          </p>
          <p class="mt-1 text-[16px] text-ink-2 whitespace-nowrap">{{ card.text }}</p>
        </router-link>
      </div>
    </section>

    <!-- Card promocional (carrossel) -->
    <section class="mt-8 mx-5">
      <div class="relative h-[165px] rounded-[15px] bg-navy text-white overflow-hidden">
        <div ref="promoTrack" class="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar" @scroll.passive="onPromoScroll">
          <div v-for="(p, i) in promos" :key="i" class="relative snap-center shrink-0 w-full h-full">
            <img src="/img/promo-plane.png" alt="" class="absolute right-0 top-0 h-full w-[138px] object-cover object-top" />
            <div class="relative px-5 pt-5 pr-32">
              <h3 class="text-[22px] font-semibold leading-[30px] max-w-[235px]">{{ p.title }}</h3>
              <button class="mt-3 flex items-center gap-3 text-[18px] font-medium hover:gap-4 transition-all" @click="promoAction(i)">
                {{ p.cta }} <Icon name="arrow-right" :size="20" />
              </button>
            </div>
          </div>
        </div>
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2.5">
          <button
            v-for="(p, i) in promos"
            :key="i"
            :aria-label="`Destaque ${i + 1}`"
            class="size-3 rounded-full transition-colors"
            :class="i === promoIndex ? 'bg-white' : 'bg-white/40'"
            @click="goToPromo(i)"
          />
        </div>
      </div>
    </section>

    <hr class="mt-8 border-t-[8px] border-fill" />

    <!-- Ways to save (2º carrossel) -->
    <section class="pt-6 pb-8">
      <h2 class="px-[18px] text-[22px] font-medium">Formas de economizar</h2>
      <div class="mt-5 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-5 px-5 pb-1 after:content-[''] after:shrink-0 after:w-1">
        <component
          :is="card.to ? 'router-link' : 'button'"
          v-for="(card, i) in saves[1]"
          :key="card.title"
          :to="card.to"
          class="snap-start shrink-0 text-left group"
          :class="i === 0 ? 'w-[255px]' : 'w-[200px]'"
          @click="!card.to && showToast('Uber Eats em breve')"
        >
          <img :src="card.img" alt="" class="h-[133px] w-full object-cover object-left rounded-xl" />
          <p class="mt-3 text-[20px] font-medium flex items-center gap-2 whitespace-nowrap">
            {{ card.title }} <Icon name="arrow-right" :size="20" class="group-hover:translate-x-1 transition-transform" />
          </p>
          <p class="mt-1 text-[16px] text-ink-2 whitespace-nowrap">{{ card.text }}</p>
        </component>
      </div>
    </section>

    <BottomNav />
    <ScheduleSheet v-model:open="scheduleOpen" />
  </div>
</template>
