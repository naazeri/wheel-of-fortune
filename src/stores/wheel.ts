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
  },
  getters: {
    getNormalizedWheelItems: (state) => {
      const bgColors = [
        '#45ace9',
        '#f6b93b',
        '#6d28d9',
        '#1e3a8a',
        '#2ecc71',
        '#c23616',
        '#365314',
        '#d6d3d1'
      ]

      const maxItemsShowsInWheel = 8
      let items = state.items

      if (items.length > maxItemsShowsInWheel) {
        items = items.slice(0, maxItemsShowsInWheel)
        items[maxItemsShowsInWheel - 1].prizeName = items[maxItemsShowsInWheel - 1].prizeNameOnWheel
        items[maxItemsShowsInWheel - 1].prizeNameOnWheel = 'موارد دیگر'
      }

      return items.map((item, index) => {
        item.bgColor = bgColors[index % bgColors.length]
        item.color = '#ffffff'
        return item
      })
    }
  }
})
