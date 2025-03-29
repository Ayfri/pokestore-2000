<script setup lang="ts">
import { ref } from 'vue'

const newsItems = ref([
  {
    date: '03/15/2000',
    text: 'New Charizard cards in stock! 🔥',
    gif: '/gifs/pokemon/hot.gif'
  },
  {
    date: '03/10/2000',
    text: 'Website now optimized for Internet Explorer 5.0!',
    gif: '/gifs/pokemon/new2.gif'
  },
  {
    date: '03/05/2000',
    text: 'Added new Guestbook feature - Sign it!',
    gif: '/gifs/pokemon/new2.gif'
  }
])
</script>

<template>
  <div>
    <div class="flex flex-col items-center mb-8">
      <img src="/pokestore.webp" alt="Pokéstore" class="h-24 mb-2" />
      <div class="flex items-center">
        <img src="/gifs/pokemon/star.gif" alt="Star" class="h-8" />
        <h2 class="text-2xl font-bold rainbow-text">Your #1 Pokémon Cards Source!</h2>
        <img src="/gifs/pokemon/star.gif" alt="Star" class="h-8" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="retro-card news-container">
        <div class="flex items-center gap-2 mb-4">
          <img src="/gifs/pokemon/letter.gif" alt="News" class="h-6" />
          <h3 class="text-xl font-bold">Latest News</h3>
        </div>
        <div class="space-y-4">
          <div v-for="item in newsItems" :key="item.date" class="border-b-2 border-purple-200 pb-2">
            <div class="flex items-center gap-2">
              <img :src="item.gif" alt="Icon" class="h-6" />
              <div class="font-bold text-blue-700">{{ item.date }}</div>
            </div>
            <div class="mt-1">{{ item.text }}</div>
          </div>
        </div>
      </div>

      <div class="retro-card bg-gradient-to-r from-red-100 to-yellow-100">
        <div class="flex items-center gap-2 mb-4">
          <img src="/gifs/pokemon/hot.gif" alt="Hot" class="h-6" />
          <h3 class="text-xl font-bold">Featured Card</h3>
        </div>
        <div class="text-center">
          <div class="card-hover inline-block">
            <img
              src="https://images.pokemontcg.io/neo4/109_hires.png"
              alt="Charizard VMAX"
              class="mx-auto mb-4 border-4 border-yellow-400 rounded"
            />
          </div>
          <div class="blink text-red-600 font-bold text-xl">
            <img src="/gifs/pokemon/hot.gif" alt="Fire" class="inline h-6" />
            HOT ITEM!
            <img src="/gifs/pokemon/hot.gif" alt="Fire" class="inline h-6" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 p-4 under-construction">
      <div class="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 text-center border-2 border-yellow-400">
        <img src="/gifs/pokemon/animepika.gif" alt="Under Construction" class="inline-block" />
        <p class="font-bold mt-2 rainbow-text text-xl">More features coming soon!</p>
        <img src="/gifs/pokemon/animepika.gif" alt="Under Construction" class="inline-block" />
      </div>
    </div>
  </div>
</template>
