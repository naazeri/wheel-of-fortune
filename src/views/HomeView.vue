<template>
  <div>
    <!-- type: canvas -->
    <FortuneWheel
      style="width: 500px; max-width: 100%; font-family: tahoma"
      :canvas="canvasOptions"
      :prizes="prizesCanvas"
      :prizeId="prizeId"
      @rotateStart="onCanvasRotateStart"
      @rotateEnd="onRotateEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FortuneWheel from '@/components/FortuneWheel.vue'
import type { CanvasConfig, PrizeConfig } from '@/components/types'

const prizeId = ref(0)
const canvasOptions: CanvasConfig = {
  btnWidth: 140,
  borderColor: '#888a8f',
  borderWidth: 3,
  lineHeight: 30,
  fontSize: 20
}

const prizesCanvas: PrizeConfig[] = [
  {
    id: 1, //* The unique id of each prize, an integer greater than 0
    name: 'جایزه ۱', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: 'جایزه آبی', //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    probability: 79 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 2,
    name: 'جایزه ۲',
    value: 'جایزه قرمز',
    bgColor: '#dd3832',
    color: '#ffffff',
    probability: 3
  },
  {
    id: 3,
    name: 'جایزه ۳',
    value: "Yellow's value",
    bgColor: '#fef151',
    color: '#000000',
    probability: 3
  },
  {
    id: 4,
    name: 'جایزه ۴',
    value: 'جایزه صورتی',
    bgColor: '#5636e3',
    color: '#ffffff',
    probability: 3
  },
  {
    id: 5,
    name: 'جایزه ۵',
    value: 'جایزه سبز',
    bgColor: '#26b045',
    color: '#ffffff',
    probability: 3
  },
  {
    id: 6,
    name: 'جایزه ۶',
    value: 'جایزه قهوه ای',
    bgColor: '#f26d1f',
    color: '#ffffff',
    probability: 3
  },
  {
    id: 7,
    name: 'جایزه ۷',
    value: 'جایزه لال',
    bgColor: '#fd79a8',
    color: '#ffffff',
    probability: 3
  },
  {
    id: 8,
    name: 'موارد دیگر',
    value: 'جایزه موارد دیگر',
    bgColor: '#e3e3e3',
    color: '#ffffff',
    probability: 3
  }
]

function onCanvasRotateStart() {
  console.log('onCanvasRotateStart')
}

function onRotateEnd(prize: PrizeConfig) {
  console.log(prize.value)
}
</script>

<style scoped></style>
