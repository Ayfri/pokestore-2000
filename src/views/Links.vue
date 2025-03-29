<script setup lang="ts">
// Liste des liens vers d'autres sites Pokémon
const links = [
  {
    title: 'PokéWebRing',
    url: '#',
    description: 'Join our webring of Pokémon websites!',
    icon: 'charmander.gif'
  },
  {
    title: 'Gary\'s Gym',
    url: '#',
    description: 'Check out Gary\'s awesome Pokémon gym!',
    icon: 'squirtle.gif'
  },
  {
    title: 'Pokémon Card Database',
    url: '#',
    description: 'The biggest database of Pokémon cards online!',
    icon: 'pikachu.gif'
  },
  {
    title: 'Red\'s Pokémon Journey',
    url: '#',
    description: 'Follow Red\'s journey through Kanto region!',
    icon: 'bulbasaur.gif'
  }
]

// Liste des fan clubs de Pokémon
const fanClubs = [
  {
    name: 'Psyduck Fanclub',
    description: 'For fans of the confused duck Pokémon!',
    icon: 'psyduck.gif',
    members: 342
  },
  {
    name: 'Jigglypuff Singers',
    description: 'Share your favorite Jigglypuff songs',
    icon: 'jigglypuff.gif',
    members: 189
  },
  {
    name: 'Pikachu World',
    description: 'The #1 site for Pikachu lovers!',
    icon: 'pikachu.gif',
    members: 1024
  },
  {
    name: 'Starter Pokémon Alliance',
    description: 'Fan club for all starter Pokémon',
    icon: 'newpoketwo.gif',
    members: 567
  },
  {
    name: 'Fire Types United',
    description: 'Hot site for fire Pokémon trainers',
    icon: 'charmander.gif',
    members: 455
  },
  {
    name: 'Grass Kingdom',
    description: 'Growing community of grass Pokémon lovers',
    icon: 'bulbasaur.gif',
    members: 386
  },
  {
    name: 'Water Trainers Club',
    description: 'Dive into water Pokémon discussions!',
    icon: 'squirtle.gif',
    members: 478
  },
  {
    name: 'Legendary Hunters',
    description: 'Tracking rare and legendary Pokémon',
    icon: 'animepika.gif',
    members: 122
  }
]
</script>

<template>
  <div>
    <div class="flex gap-4 items-center mb-6">
      <img src="/gifs/pokemon/new.gif" alt="New" class="h-8" />
      <h2 class="text-2xl font-bold rainbow-text">Cool Pokémon Links</h2>
      <img src="/gifs/pokemon/new.gif" alt="New" class="h-8" />
    </div>

    <div class="bg-yellow-100 p-2 border border-yellow-400 mb-6 text-center">
      <img src="/gifs/pokemon/email.gif" alt="Email" class="inline h-6 mr-2" />
      <span>Want to exchange links? Email the webmaster!</span>
    </div>

    <div class="grid gap-6">
      <div v-for="link in links" :key="link.title" class="retro-card">
        <div class="flex items-center gap-4">
          <img :src="`/gifs/pokemon/${link.icon}`" :alt="link.title" class="h-12 w-12 object-contain bg-blue-100 p-1 rounded" />
          <div>
            <h3 class="text-xl font-bold text-blue-600 underline">
              <a :href="link.url">{{ link.title }}</a>
            </h3>
            <p class="mt-2">{{ link.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 p-4 retro-card">
      <div class="flex gap-2 items-center mb-4">
        <img src="/gifs/pokemon/star.gif" alt="Star" class="h-6" />
        <h3 class="text-xl font-bold">Pokémon Fan Clubs</h3>
        <img src="/gifs/pokemon/star.gif" alt="Star" class="h-6" />
      </div>

      <hr class="mb-4 border-dashed border-blue-300" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="club in fanClubs" :key="club.name" class="retro-card p-3 bg-gradient-to-b from-blue-50 to-purple-50">
          <div class="flex flex-col items-center">
            <img :src="`/gifs/pokemon/${club.icon}`" :alt="club.name" class="h-12 mb-2" />
            <h4 class="font-bold text-sm">{{ club.name }}</h4>
            <p class="text-xs mt-1 text-center">{{ club.description }}</p>
            <div class="mt-2 text-xs text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
              Members: {{ club.members }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <img src="/gifs/pokemon/hr.gif" alt="Divider" class="w-full h-4 object-fill mb-4" />

      <div class="flex flex-wrap justify-center gap-3 mb-4">
        <div class="border border-blue-400 p-2 bg-white">
          <img src="/gifs/pokemon/hot.gif" alt="Free Site" width="88" height="31" class="inline-block" />
          <p class="text-xs mt-1">100% FREE!</p>
        </div>

        <div class="border border-blue-400 p-2 bg-white">
          <img src="/gifs/pokemon/bestview.gif" alt="Best Viewed" width="88" height="31" class="inline-block" />
          <p class="text-xs mt-1">800x600 Resolution</p>
        </div>

        <div class="border border-blue-400 p-2 bg-white">
          <img src="/gifs/pokemon/pokeball.gif" alt="Link Back" width="88" height="31" class="inline-block" />
          <p class="text-xs mt-1">Link Back!</p>
        </div>
      </div>

      <div class="text-sm mt-4 bg-yellow-100 p-2 border border-yellow-300 rounded">
        <img src="/gifs/pokemon/construction.gif" alt="Construction" class="inline h-4 mr-1" />
        <span>This page is always under construction! Check back later for more links!</span>
        <img src="/gifs/pokemon/construction.gif" alt="Construction" class="inline h-4 ml-1" />
      </div>
    </div>
  </div>
</template>
