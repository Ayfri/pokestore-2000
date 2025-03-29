<script setup lang="ts">
import { ref } from 'vue'
import PokemonCard from '../components/PokemonCard.vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

const cards = ref([
  {
    id: 1,
    name: 'Pikachu',
    price: 29.99,
    image: 'https://images.pokemontcg.io/base1/58_hires.png',
    rarity: 'Rare',
    animated: '/gifs/pokemon/pikachu.gif'
  },
  {
    id: 2,
    name: 'Charizard',
    price: 199.99,
    image: 'https://images.pokemontcg.io/base1/4_hires.png',
    rarity: 'Ultra Rare',
    animated: '/gifs/pokemon/charmander.gif'
  },
  {
    id: 3,
    name: 'Mewtwo',
    price: 149.99,
    image: 'https://images.pokemontcg.io/neo4/109_hires.png',
    rarity: 'Secret Rare',
    animated: '/gifs/pokemon/animepika.gif'
  },
  {
    id: 4,
    name: 'Blastoise',
    price: 89.99,
    image: 'https://images.pokemontcg.io/base4/2_hires.png',
    rarity: 'Holo Rare',
    animated: '/gifs/pokemon/squirtle.gif'
  },
  {
    id: 5,
    name: 'Venusaur',
    price: 79.99,
    image: 'https://images.pokemontcg.io/basep/13_hires.png',
    rarity: 'Holo Rare',
    animated: '/gifs/pokemon/bulbasaur.gif'
  },
  {
    id: 6,
    name: 'Magikarp',
    price: 0.99,
    image: 'https://images.pokemontcg.io/base5/47_hires.png',
    rarity: 'Common',
    animated: '/gifs/pokemon/star.gif'
  }
])
</script>

<template>
  <div>
    <div class="flex items-center mb-6">
      <img src="/gifs/pokemon/pokeball.gif" alt="Pokeball" class="h-8 mr-3" />
      <h2 class="text-2xl font-bold">Card Shop</h2>
      <img src="/gifs/pokemon/pokeball.gif" alt="Pokeball" class="h-8 ml-3" />
    </div>

    <div class="mb-4 p-2 bg-yellow-100 border border-yellow-500 text-center">
      <img src="/gifs/pokemon/hot.gif" alt="Hot" class="inline h-6 mr-2" />
      <span class="font-bold">Flash Sale - Limited Time Only!</span>
      <img src="/gifs/pokemon/hot.gif" alt="Hot" class="inline h-6 ml-2" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PokemonCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @add-to-cart="cart.addItem(card.id)"
      />
    </div>

    <div class="mt-8 text-center">
      <hr class="mb-4" />
      <div>
        <img src="/gifs/pokemon/new2.gif" alt="New" class="inline h-6 mr-2" />
        <span class="font-bold">New Shipment Arriving Soon!</span>
      </div>
      <div class="mt-2">
        <span class="text-red-600">Pre-order now for a special discount!</span>
      </div>
    </div>
  </div>
</template>
