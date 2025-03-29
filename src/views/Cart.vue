<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { ref, computed } from 'vue'

const cart = useCartStore()

// Données fictives pour les cartes
const allCards = [
  {
    id: 1,
    name: 'Pikachu',
    price: 29.99,
    image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SM10/SM10_EN_55.png',
    rarity: 'Rare',
    animated: '/gifs/pokemon/pikachu.gif'
  },
  {
    id: 2,
    name: 'Charizard',
    price: 199.99,
    image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH4/SWSH4_EN_20.png',
    rarity: 'Ultra Rare',
    animated: '/gifs/pokemon/charmander.gif'
  },
  {
    id: 3,
    name: 'Mewtwo',
    price: 149.99,
    image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SM12/SM12_EN_75.png',
    rarity: 'Secret Rare',
    animated: '/gifs/pokemon/animepika.gif'
  },
  {
    id: 4,
    name: 'Blastoise',
    price: 89.99,
    image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SM12/SM12_EN_25.png',
    rarity: 'Holo Rare',
    animated: '/gifs/pokemon/squirtle.gif'
  },
  {
    id: 5,
    name: 'Venusaur',
    price: 79.99,
    image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SM12/SM12_EN_1.png',
    rarity: 'Holo Rare',
    animated: '/gifs/pokemon/bulbasaur.gif'
  },
  {
    id: 6,
    name: 'Magikarp',
    price: 0.99,
    image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SM9/SM9_EN_32.png',
    rarity: 'Common',
    animated: '/gifs/pokemon/star.gif'
  }
]

// Obtenir les cartes dans le panier
const cartItems = computed(() => {
  const itemCounts = new Map<number, number>()

  // Compter le nombre de chaque carte
  cart.items.forEach(id => {
    const count = itemCounts.get(id) || 0
    itemCounts.set(id, count + 1)
  })

  // Créer le tableau des éléments avec quantité
  return Array.from(itemCounts.entries()).map(([id, quantity]) => {
    const card = allCards.find(c => c.id === id)
    return {
      id,
      card,
      quantity,
      total: card ? card.price * quantity : 0
    }
  })
})

// Calculer le total du panier
const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.total, 0)
})

// Fonctions pour modifier le panier
function removeFromCart(id: number) {
  cart.removeItem(id)
}

function checkout() {
  alert('Thank you for your purchase! Your order has been processed.')
  // Vider le panier
  cartItems.value.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      cart.removeItem(item.id)
    }
  })
}
</script>

<template>
  <div>
    <div class="flex gap-4 items-center mb-6">
      <img src="/gifs/pokemon/pokeball.gif" alt="Pokeball" class="h-8" />
      <h2 class="text-2xl font-bold">Your Shopping Cart</h2>
      <img src="/gifs/pokemon/pokeball.gif" alt="Pokeball" class="h-8" />
    </div>

    <div v-if="cartItems.length === 0" class="retro-card p-6 text-center">
      <img src="/gifs/pokemon/psyduck.gif" alt="Empty Cart" class="mx-auto h-16 mb-4" />
      <p class="text-lg mb-2">Your cart is empty!</p>
      <p class="text-sm text-gray-600 mb-4">Visit our shop to find some awesome Pokémon cards</p>
      <router-link to="/shop" class="retro-button">
        <img src="/gifs/pokemon/pokeball.gif" alt="Shop" class="inline h-4 mr-1" />
        Go to Shop
      </router-link>
    </div>

    <div v-else class="space-y-6">
      <table class="retro-table w-full">
        <thead>
          <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id" class="border-b">
            <td class="p-2 text-center">
              <img :src="item.card?.animated" alt="Card" class="h-10 inline-block" />
            </td>
            <td class="p-2">{{ item.card?.name }}</td>
            <td class="p-2 text-right">${{ item.card?.price.toFixed(2) }}</td>
            <td class="p-2 text-center">{{ item.quantity }}</td>
            <td class="p-2 text-right font-bold">${{ item.total.toFixed(2) }}</td>
            <td class="p-2 text-center">
              <button @click="removeFromCart(item.id)" class="text-red-600 hover:underline">
                <img src="/gifs/pokemon/hot.gif" alt="Remove" class="h-5 inline-block" />
                Remove
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="p-2 text-right font-bold">Total:</td>
            <td class="p-2 text-right font-bold">${{ cartTotal.toFixed(2) }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div class="bg-yellow-100 p-3 border border-yellow-400 text-center">
        <p class="text-sm mb-2">
          <img src="/gifs/pokemon/new.gif" alt="New" class="inline h-4 mr-1" />
          Free shipping on orders over $50!
        </p>
        <p class="text-xs">Use coupon code: POKEMANIA2000 for 10% off!</p>
      </div>

      <div class="flex justify-between mt-6">
        <router-link to="/shop" class="retro-button">
          <img src="/gifs/pokemon/newpoketwo.gif" alt="Continue Shopping" class="inline h-4 mr-1" />
          Continue Shopping
        </router-link>

        <button @click="checkout" class="retro-button-3d bg-green-200 px-6 py-2">
          <img src="/gifs/pokemon/pikachu.gif" alt="Checkout" class="inline h-6 mr-2" />
          Checkout
        </button>
      </div>
    </div>

    <div class="mt-8 text-center">
      <img src="/gifs/pokemon/hr.gif" alt="Divider" class="w-full h-4 object-fill mb-4" />
      <div class="text-xs bg-blue-100 p-2 border border-blue-300 inline-block">
        Secure Payment - We accept Pokédollars, Berries and TMs!
      </div>
    </div>
  </div>
</template>
