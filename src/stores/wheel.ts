import { defineStore } from 'pinia'
import type { PrizeConfig } from '@/types'

export const useWheelStore = defineStore({
  id: 'wheel',
  state: () => ({
    items: JSON.parse(localStorage.getItem('wheelItems') ?? '[]') as PrizeConfig[]
  }),
  actions: {
    addItem(item: PrizeConfig) {
      this.items.push(item)
      this.saveItems()
    },
    editItem(index: number, newItem: PrizeConfig) {
      this.items[index] = newItem
      this.saveItems()
    },
    removeItem(index: number) {
      this.items.splice(index, 1)
      this.saveItems()
    },
    saveItems() {
      localStorage.setItem('wheelItems', JSON.stringify(this.items))
    }
  }
})
