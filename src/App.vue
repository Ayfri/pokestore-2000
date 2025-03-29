<script setup lang="ts">
import { useCartStore } from './stores/cart'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

const cart = useCartStore()
useTitle('★☆★ Pokéstore 2000 - Download Now! FREE! ★☆★')

onMounted(() => {
  const audio = new Audio('https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/dkzpxqmz/101-opening.mp3')
  audio.loop = true
  audio.volume = 0.3
})
</script>

<template>
  <div class="min-h-screen bg-[#000080] p-4 star-bg">
    <!-- UNDER CONSTRUCTION BANNER -->
    <div class="text-center mb-4">
      <img src="/gifs/pokemon/construction.gif" alt="Under Construction" class="inline-block h-6" />
      <span class="text-white text-xs mx-2 blink">SITE UNDER CONSTRUCTION</span>
      <img src="/gifs/pokemon/construction.gif" alt="Under Construction" class="inline-block h-6" />
    </div>

    <header class="retro-container mb-8 bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-double border-blue-700">
      <div class="flex justify-between items-center mb-4">
        <img src="/gifs/pokemon/pokeball.gif" alt="Pokeball" class="h-12" />
        <div class="text-center flex-grow">
          <img src="/pokestore.webp" alt="Pokéstore 2000" class="h-20 mx-auto" />
        </div>
        <div class="text-right">
          <router-link to="/cart" class="no-underline">
            <img src="/gifs/pokemon/pikachu.gif" alt="Cart" class="inline h-6 mr-2" />
            Cart ({{ cart.count }} items)
          </router-link>
        </div>
      </div>

      <nav class="flex gap-2 justify-center bg-blue-200 p-2 rounded shadow-inner">
        <router-link to="/" class="nav-link">
          <img src="/gifs/pokemon/newpoketwo.gif" alt="Home" class="inline h-4 mr-1" />
          Home
        </router-link>
        <router-link to="/shop" class="nav-link">
          <img src="/gifs/pokemon/pokeball.gif" alt="Shop" class="inline h-4 mr-1" />
          Shop
        </router-link>
        <router-link to="/guestbook" class="nav-link">
          <img src="/gifs/pokemon/pencil.gif" alt="Guestbook" class="inline h-4 mr-1" />
          Guestbook
        </router-link>
        <router-link to="/about" class="nav-link">
          <img src="/gifs/pokemon/star.gif" alt="About" class="inline h-4 mr-1" />
          About
        </router-link>
        <router-link to="/links" class="nav-link">
          <img src="/gifs/pokemon/newpoketwo.gif" alt="Links" class="inline h-4 mr-1" />
          Cool Links
        </router-link>
        <router-link to="/gifs" class="nav-link">
          <img src="/gifs/pokemon/animepika.gif" alt="GIFs" class="inline h-4 mr-1" />
          GIF Gallery
        </router-link>
      </nav>

      <div class="mt-4 marquee bg-yellow-200 p-1 border border-yellow-400">
        <img src="/gifs/pokemon/hot.gif" alt="Hot" class="inline h-6 mr-2" />
        HOT DEAL! Buy any Charizard card and get a free Magikarp! Limited time offer!
        <img src="/gifs/pokemon/new2.gif" alt="New" class="inline h-6 ml-2" />
      </div>
    </header>

    <main class="retro-container bg-gradient-to-r from-yellow-50 to-orange-50 border border-dashed border-orange-300">
      <router-view></router-view>
    </main>

    <footer class="mt-8 text-center text-sm retro-container bg-gradient-to-r from-green-100 to-blue-100 border-t-4 border-blue-400">
      <table class="w-full border-separate border-spacing-2">
        <tr>
          <td class="text-center" colspan="3">
            <marquee scrollamount="3" behavior="alternate">
              <span class="text-red-600 font-bold">★★★ THANK YOU FOR VISITING POKÉSTORE 2000! ★★★</span>
            </marquee>
          </td>
        </tr>
        <tr>
          <td width="33%" class="align-top">
            <div class="border border-blue-500 p-2 bg-blue-50">
              <div class="font-bold underline mb-2">SITE INFO</div>
              <div class="hit-counter mb-2 bg-black text-green-400 px-2 py-1 font-mono">HITS: 000012942</div>
              <div class="text-xs mb-1">Last Updated: 04/15/2000</div>
              <div class="text-xs">Download time: 56k - 8.2 sec</div>
              <div class="mt-2 text-xs">
                <img src="/gifs/pokemon/bestview.gif" alt="Valid HTML!" width="88" height="31" class="inline-block my-1" />
                <img src="/gifs/pokemon/ultraball.gif" alt="Valid CSS!" width="88" height="31" class="inline-block my-1" />
              </div>
            </div>
          </td>
          <td width="33%" class="align-top">
            <div class="border border-blue-500 p-2 bg-blue-50 h-full flex flex-col">
              <div class="font-bold underline mb-2">CONTACT US</div>
              <div class="flex items-center justify-center mb-2">
                <img src="/gifs/pokemon/pikachu.gif" alt="Pikachu" class="h-8" />
              </div>
              <div class="text-xs mb-1">
                <a href="mailto:webmaster@pokéstore-2000.com" class="cool-link">
                  <img src="/gifs/pokemon/email.gif" alt="Email" class="inline h-4 mr-1" />EMAIL
                </a>
              </div>
              <div class="text-xs mb-1">
                <img src="/gifs/pokemon/pokeball.gif" alt="ICQ" class="inline h-4 mr-1" />ICQ: 12345678
              </div>
              <div class="text-xs">
                <img src="/gifs/pokemon/magikarp.gif" alt="AIM" class="inline h-4 mr-1" />AIM: PokeStore2000
              </div>
            </div>
          </td>
          <td width="33%" class="align-top">
            <div class="border border-blue-500 p-2 bg-blue-50 flex flex-col">
              <div class="font-bold underline mb-2">COPYRIGHT</div>
              <div class="text-xs mb-2">© 2000 Pokéstore. All Rights Reserved.</div>
              <div class="text-xs mb-2">Pokémon and all related characters are © Nintendo / Game Freak.</div>
              <div class="text-xs font-bold text-red-600">NO FRAMES • NO JAVA • NO FLASH</div>
              <div class="text-xs mt-2 opacity-50">v1.8.5 BETA</div>
            </div>
          </td>
        </tr>
      </table>
      <div class="text-xs mt-4 text-gray-600">This page optimized for 800x600 resolution</div>
      <div class="text-xs text-blue-700 blink">[ DOWNLOAD THE POKÉSTORE TOOLBAR NOW! ]</div>
    </footer>
  </div>
</template>

<style>
.blink {
  animation: blinker 1s step-start infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
