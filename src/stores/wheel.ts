import { defineStore } from 'pinia'
import type { PrizeConfig } from '@/types'

export const useWheelStore = defineStore({
  id: 'wheel',
  state: () => ({
    items: JSON.parse(localStorage.getItem('wheelItems') ?? getSeedData()) as PrizeConfig[]
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

const getSeedData = () => {
  const data = [
    {
      id: 1,
      prizeName: 'پلی استیشن',
      prizeNameOnWheel: 'پلی استیشن',
      bgColor: '#45ace9',
      color: '#ffffff',
      probability: 2
    },
    {
      id: 2,
      prizeName: 'ماشین',
      prizeNameOnWheel: 'ماشین',
      bgColor: '#f6b93b',
      color: '#ffffff',
      probability: 1
    },
    {
      id: 3,
      prizeName: 'دوچرخه',
      prizeNameOnWheel: 'دوچرخه',
      bgColor: '#6d28d9',
      color: '#ffffff',
      probability: 2
    },
    {
      id: 4,
      prizeName: 'آیفون',
      prizeNameOnWheel: 'آیفون',
      bgColor: '#1e3a8a',
      color: '#ffffff',
      probability: 1
    },
    {
      id: 5,
      prizeName: 'کتاب خوان',
      prizeNameOnWheel: 'کتاب خوان',
      bgColor: '#2ecc71',
      color: '#ffffff',
      probability: 5
    },
    {
      id: 6,
      prizeName: 'گیفت کارت',
      prizeNameOnWheel: 'گیفت کارت',
      bgColor: '#c23616',
      color: '#ffffff',
      probability: 12
    },
    {
      id: 7,
      prizeName: 'کد تخفیف',
      prizeNameOnWheel: 'کد تخفیف',
      bgColor: '#365314',
      color: '#ffffff',
      probability: 50
    },
    {
      id: 8,
      prizeName: 'اسپیکر بلوتوث',
      prizeNameOnWheel: 'موارد دیگر',
      bgColor: '#d6d3d1',
      color: '#ffffff',
      probability: 2
    },
    {
      id: 9,
      prizeName: 'اشتراک نامحدود',
      prizeNameOnWheel: 'اشتراک نامحدود',
      bgColor: '',
      color: '',
      probability: 5
    },
    {
      id: 10,
      prizeName: 'دستگاه اسپرسو',
      prizeNameOnWheel: 'دستگاه اسپرسو',
      bgColor: '',
      color: '',
      probability: 2
    }
  ]

  return JSON.stringify(data)
}
