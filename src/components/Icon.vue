<script setup>
// Ícones em SVG inline (desenhados a partir dos vetores do Figma), herdam a cor via currentColor
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

const icons = {
  'arrow-left': '<path d="M20 11H6.8l5.6-5.6L11 4l-8 8 8 8 1.4-1.4L6.8 13H20z"/>',
  'arrow-right': '<path d="M4 11h13.2l-5.6-5.6L13 4l8 8-8 8-1.4-1.4 5.6-5.6H4z"/>',
  search: '<path d="M10 3a7 7 0 0 1 5.6 11.2l5.6 5.6-1.4 1.4-5.6-5.6A7 7 0 1 1 10 3zm0 2.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6z"/>',
  clock: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-1.2 4.5v6.7h5.7v-2.2H13V6.5z"/>',
  'chevron-down': '<path d="M5 8.5 12 14l7-5.5v3L12 17l-7-5.5z"/>',
  'chevron-right': '<path d="M9 5l7 7-7 7-1.8-1.8L12.4 12 7.2 6.8z"/>',
  pin: '<path d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>',
  plus: '<path d="M10.8 4h2.4v6.8H20v2.4h-6.8V20h-2.4v-6.8H4v-2.4h6.8z"/>',
  close: '<path d="m6.3 4.6 5.7 5.7 5.7-5.7 1.7 1.7-5.7 5.7 5.7 5.7-1.7 1.7-5.7-5.7-5.7 5.7-1.7-1.7 5.7-5.7-5.7-5.7z"/>',
  star: '<path d="m12 3 2.6 5.8 6.4.6-4.8 4.2 1.4 6.3L12 16.6l-5.6 3.3 1.4-6.3L3 9.4l6.4-.6z"/>',
  person: '<path d="M12 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 10.5c4.4 0 8 2.2 8 5V21H4v-2.5c0-2.8 3.6-5 8-5z"/>',
  home: '<path d="M12 2.5 22 11v11h-7.5v-6.5h-5V22H2V11z"/>',
  grid: '<path d="M3 3h5v5H3zm6.5 0h5v5h-5zM16 3h5v5h-5zM3 9.5h5v5H3zm6.5 0h5v5h-5zm6.5 0h5v5h-5zM3 16h5v5H3zm6.5 0h5v5h-5zm6.5 0h5v5h-5z"/>',
  receipt: '<path d="M4 2h16v20l-8-4.5L4 22zm4 5v2.2h8V7zm0 4.6v2.2h8v-2.2z" fill-rule="evenodd"/>',
  car: '<path d="M6.6 5h10.8l2.3 5.2H21v1.6l-.8.5V19h-3v-2H6.8v2h-3v-6.7l-.8-.5v-1.6h1.3zm1.3 2-1.4 3.2h11L16.1 7zM7 12.6a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zm10 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z"/>',
  'drag': '<path d="M3 10h18v2H3zm0 4h18v2H3z"/>',
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" v-html="icons[name]" />
</template>
