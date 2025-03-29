<script setup lang="ts">
import { ref } from 'vue'

interface GuestbookEntry {
  name: string
  message: string
  date: string
  webring?: string
}

const entries = ref<GuestbookEntry[]>([
  {
    name: 'Gary',
    message: 'Cool site! Check out my Pokémon gym at /~garysgyarados',
    date: '03/15/2000',
    webring: 'Kanto Trainers Ring'
  },
  {
    name: 'AshK',
    message: 'Gotta catch em all!!!',
    date: '03/14/2000'
  },
  {
    name: 'MistyMermaid',
    message: 'I love water Pokémon! Your site is awesome!',
    date: '03/12/2000',
    webring: 'Cerulean City WebRing'
  },
  {
    name: 'BrockRock99',
    message: 'Great card selection! Do you have any rare Onix cards?',
    date: '03/10/2000'
  }
])

const newEntry = ref({
  name: '',
  message: '',
  webring: ''
})

const addEntry = () => {
  if (newEntry.value.name && newEntry.value.message) {
    entries.value.unshift({
      ...newEntry.value,
      date: new Date().toLocaleDateString()
    })
    newEntry.value = { name: '', message: '', webring: '' }
  }
}
</script>

<template>
  <div>
    <div class="flex gap-4 items-center mb-6">
      <img src="/gifs/pokemon/newpoketwo.gif" alt="Guestbook" class="h-8" />
      <h2 class="text-2xl font-bold">Guestbook</h2>
      <img src="/gifs/pokemon/newpoketwo.gif" alt="Guestbook" class="h-8" />
    </div>

    <hr class="mb-8" />

    <div class="retro-card mb-8 bg-gradient-to-r from-blue-100 to-purple-100">
      <div class="flex items-center gap-2 mb-4">
        <img src="/gifs/pokemon/pencil.gif" alt="Sign" class="h-6" />
        <h3 class="text-xl font-bold">Sign the Guestbook!</h3>
      </div>

      <div class="text-center mb-4">
        <img src="/gifs/pokemon/hr.gif" alt="Divider" />
      </div>

      <form @submit.prevent="addEntry" class="space-y-4">
        <div>
          <label class="block mb-2 font-bold">Name:</label>
          <input v-model="newEntry.name" required class="retro-input w-full" />
        </div>
        <div>
          <label class="block mb-2 font-bold">Message:</label>
          <textarea v-model="newEntry.message" required class="retro-input w-full h-24"></textarea>
        </div>
        <div>
          <label class="block mb-2 font-bold">Webring (optional):</label>
          <input v-model="newEntry.webring" class="retro-input w-full" />
        </div>
        <div class="text-center mt-6">
          <button type="submit" class="retro-button">
            <img src="/gifs/pokemon/pikachu.gif" alt="Sign" class="inline-block h-6 mr-2" />
            Sign Guestbook
          </button>
        </div>
      </form>
    </div>

    <div class="text-center mb-4">
      <img src="/gifs/pokemon/pikachu.gif" alt="Pikachu" />
    </div>

    <h3 class="text-xl font-bold mb-4 text-center bg-yellow-200 p-2 blink">Recent Signatures</h3>

    <div class="space-y-4">
      <div v-for="entry in entries" :key="entry.date" class="guestbook-entry p-4">
        <div class="flex items-center">
          <img src="/gifs/pokemon/star.gif" alt="Star" class="h-4 mr-2" />
          <div class="font-bold text-purple-700">{{ entry.name }}</div>
        </div>
        <div class="text-sm text-gray-600">{{ entry.date }}</div>
        <div class="mt-2 pl-4 border-l-4 border-blue-300">{{ entry.message }}</div>
        <div v-if="entry.webring" class="mt-2 text-sm text-blue-600">
          [{{ entry.webring }}]
        </div>
      </div>
    </div>

    <div class="text-center mt-6">
      <img src="/gifs/pokemon/bestview.gif" alt="Guestbook" />
    </div>
  </div>
</template>
