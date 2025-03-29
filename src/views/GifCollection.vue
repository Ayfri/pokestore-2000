<script setup lang="ts">
import { ref } from 'vue'

// Chemin relatif vers les GIFs téléchargés
const basePath = '/gifs/pokemon/'

// Liste des GIFs Pokémon groupés par catégorie
const categories = ref([
  {
    name: "Pokémon Starters",
    gifs: [
      {
        filename: "pikachu.gif",
        description: "Pikachu - #25",
        url: basePath + "pikachu.gif"
      },
      {
        filename: "charmander.gif",
        description: "Charmander - #4",
        url: basePath + "charmander.gif"
      },
      {
        filename: "bulbasaur.gif",
        description: "Bulbasaur - #1",
        url: basePath + "bulbasaur.gif"
      },
      {
        filename: "squirtle.gif",
        description: "Squirtle - #7",
        url: basePath + "squirtle.gif"
      }
    ]
  },
  {
    name: "Autres Pokémon",
    gifs: [
      {
        filename: "magikarp.gif",
        description: "Magikarp - #129",
        url: basePath + "magikarp.gif"
      },
      {
        filename: "psyduck.gif",
        description: "Psyduck - #54",
        url: basePath + "psyduck.gif"
      },
      {
        filename: "jigglypuff.gif",
        description: "Jigglypuff - #39",
        url: basePath + "jigglypuff.gif"
      },
      {
        filename: "star.gif",
        description: "Star Pokémon",
        url: basePath + "star.gif"
      },
      {
        filename: "animepika.gif",
        description: "Animated Pikachu",
        url: basePath + "animepika.gif"
      },
      {
        filename: "pika2.gif",
        description: "Pika Icon",
        url: basePath + "pika2.gif"
      }
    ]
  },
  {
    name: "Pokéballs",
    gifs: [
      {
        filename: "pokeball.gif",
        description: "Poké Ball",
        url: basePath + "pokeball.gif"
      },
      {
        filename: "greatball.gif",
        description: "Great Ball",
        url: basePath + "greatball.gif"
      },
      {
        filename: "ultraball.gif",
        description: "Ultra Ball",
        url: basePath + "ultraball.gif"
      },
      {
        filename: "masterball.gif",
        description: "Master Ball",
        url: basePath + "masterball.gif"
      }
    ]
  },
  {
    name: "Éléments de design",
    gifs: [
      {
        filename: "hot.gif",
        description: "Hot icon",
        url: basePath + "hot.gif"
      },
      {
        filename: "new2.gif",
        description: "New icon",
        url: basePath + "new2.gif"
      },
      {
        filename: "new.gif",
        description: "Pichu New icon",
        url: basePath + "new.gif"
      },
      {
        filename: "hr.gif",
        description: "Horizontal rule",
        url: basePath + "hr.gif"
      },
      {
        filename: "newpoketwo.gif",
        description: "Poké icon",
        url: basePath + "newpoketwo.gif"
      },
      {
        filename: "pencil.gif",
        description: "Pencil icon",
        url: basePath + "pencil.gif"
      },
      {
        filename: "bestview.gif",
        description: "Best viewed badge",
        url: basePath + "bestview.gif"
      },
      {
        filename: "stars.gif",
        description: "Stars background",
        url: basePath + "stars.gif"
      },
      {
        filename: "letter.gif",
        description: "Letter icon",
        url: basePath + "letter.gif"
      },
      {
        filename: "construction.gif",
        description: "Under Construction",
        url: basePath + "construction.gif"
      },
      {
        filename: "email.gif",
        description: "Email icon",
        url: basePath + "email.gif"
      }
    ]
  }
])
</script>

<template>
  <div>
    <div class="flex gap-4 items-center mb-6">
      <img src="/gifs/pokemon/pokeball.gif" alt="Pokeball" class="h-8" />
      <h2 class="text-2xl font-bold rainbow-text">Pokémon GIF Collection</h2>
      <img src="/gifs/pokemon/pokeball.gif" alt="Pokeball" class="h-8" />
    </div>

    <div class="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-center">
      <img src="/gifs/pokemon/pikachu.gif" alt="Pikachu" class="inline h-6 mr-2" />
      <span>Use these GIFs to decorate your own Pokémon site!</span>
      <img src="/gifs/pokemon/pikachu.gif" alt="Pikachu" class="inline h-6 ml-2" />
    </div>

    <div class="space-y-8">
      <div v-for="category in categories" :key="category.name" class="retro-card">
        <div class="mb-4 flex items-center gap-2">
          <img src="/gifs/pokemon/pokeball.gif" alt="Category" class="h-6" />
          <h3 class="text-xl font-bold">{{ category.name }}</h3>
        </div>

        <hr class="mb-4" />

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="gif in category.gifs" :key="gif.filename" class="text-center retro-card p-2 card-hover">
            <img :src="gif.url" :alt="gif.filename" class="mx-auto" />
            <p class="text-xs mt-1 font-bold">{{ gif.filename }}</p>
            <p class="text-xs text-gray-600">{{ gif.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <img src="/gifs/pokemon/hr.gif" alt="Divider" class="w-full h-6 object-fill" />
      <div class="mt-4 p-2 bg-yellow-100 border border-yellow-400">
        <p class="text-sm">
          <img src="/gifs/pokemon/new2.gif" alt="New" class="inline h-4 mr-1" />
          All these GIFs are free to use for your personal website!
        </p>
      </div>
    </div>
  </div>
</template>
