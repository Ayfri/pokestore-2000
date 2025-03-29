import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<number[]>([])
  const count = computed(() => items.value.length)
  
  function addItem(id: number) {
    items.value.push(id)
  }
  
  function removeItem(id: number) {
    const index = items.value.indexOf(id)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }
  
  return { items, count, addItem, removeItem }
})