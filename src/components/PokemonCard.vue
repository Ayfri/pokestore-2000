<script setup lang="ts">
interface Card {
  id: number
  name: string
  price: number
  image: string
  rarity: string
  animated: string
}

defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  (e: 'addToCart', id: number): void
}>()
</script>

<template>
  <div class="retro-card relative overflow-hidden">
    <div class="absolute top-0 left-0 w-10 h-10 z-10">
      <img :src="card.animated" alt="Animated" class="w-full h-full object-contain" />
    </div>

    <div class="relative">
      <img :src="card.image" :alt="card.name" class="w-full h-auto" />
      <div class="absolute top-2 right-2 bg-yellow-300 px-2 py-1 text-sm font-bold rotate-[-5deg] border border-yellow-600">
        {{ card.rarity }}
      </div>
    </div>

    <div class="mt-4">
      <h2 class="text-xl font-bold rainbow-text">{{ card.name }}</h2>
      <div class="flex justify-between items-center mt-2">
        <span class="text-lg font-bold text-green-700">${{ card.price }}</span>
        <button
          @click="emit('addToCart', card.id)"
          class="retro-button"
        >
          <img src="/gifs/pokemon/pokeball.gif" alt="Cart" class="inline h-4 mr-1" />
          Add to Cart
        </button>
      </div>
    </div>

    <div class="mt-3 text-xs text-center">
      <img src="/gifs/pokemon/hr.gif" alt="Divider" class="w-full h-2 object-fill" />
      <p class="text-red-600 mt-1">Limited Edition!</p>
    </div>
  </div>
</template>
