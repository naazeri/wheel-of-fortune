<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <FortuneWheel
          v-if="wheelItemsNormalized.length >= 2"
          style="width: 500px; max-width: 100%; margin-top: 20px"
          :canvas="canvasOptions"
          :prizes="wheelItemsNormalized"
          :winnerId="winnerId"
          :duration="spinDuration"
          @rotateStart="onWheelRotateStart"
          @rotateEnd="onWheelRotateEnd"
        />
        <h4 v-else-if="wheelItemsNormalized.length === 1">
          حداقل ۲ آیتم برای گردونه باید ثبت شده باشد
        </h4>
        <h4 v-else>
          آیتمی برای گردونه ثبت نشده است. <router-link to="/admin">پنل ادمین</router-link>
        </h4>
      </v-col>
    </v-row>

    <v-dialog v-model="showResultDialog" width="auto" @click:outside="onCloseResultDialog">
      <v-container>
        <v-locale-provider rtl>
          <v-card
            max-width="500"
            prepend-icon="mdi-update"
            title="تبریک 🎉"
            :text="resultDialogText"
          >
            <template v-slot:actions>
              <v-btn class="ms-auto" text="بستن" @click="onCloseResultDialog"></v-btn>
            </template>
          </v-card>
        </v-locale-provider>
      </v-container>
    </v-dialog>

    <canvas id="confetti"></canvas>
  </v-container>
</template>

<script setup lang="ts">
import 'vuetify/styles'
import ConfettiGenerator from 'confetti-js'
import { computed, onMounted, ref } from 'vue'
import FortuneWheel from '@/components/FortuneWheel.vue'
import type { CanvasConfig, PrizeConfig } from '@/types'
import { useWheelStore } from '@/stores/wheel'
import { pickRandomItemWithProbability } from '@/utils'

const wheelStore = useWheelStore()
const wheelItemsNormalized = wheelStore.getNormalizedWheelItems
const spinDuration = 6000
// console.log('🚀 ~ wheelItems:', wheelStore.items)
// console.log('🚀 ~ wheelItemsNormalized:', wheelItemsNormalized)

const showResultDialog = ref(false)
const winnerId = ref(0)
const winnerItem = ref<PrizeConfig | null>()

let confetti: ConfettiGenerator | null
const confettiSettings = { target: 'confetti' }

const canvasOptions: CanvasConfig = {
  btnWidth: 140,
  borderColor: '#888a8f',
  borderWidth: 3,
  lineHeight: 30,
  fontSize: 20
}

onMounted(() => {
  calculateWinnerItem()
})

const resultDialogText = computed(() => {
  if (winnerItem.value === null) return 'خطا در دریافت جایزه. لطفا مجدد تلاش کنید'

  return `تبریک شما برنده جایزه '${winnerItem.value!.prizeName}' شدید 🥳`
})

function calculateWinnerItem() {
  winnerItem.value = pickRandomItemWithProbability(wheelStore.items)

  if (winnerItem.value === null) {
    throw new Error('winnerItem is null')
  }

  console.log('winner id: ' + winnerItem.value.id)
  winnerId.value = winnerItem.value.id
}

function onWheelRotateStart() {}

function onWheelRotateEnd() {
  showResultDialog.value = true
  celebrateWin()
}

function onCloseResultDialog() {
  if (showResultDialog.value === true) {
    showResultDialog.value = false
  }

  confetti.clear()
  calculateWinnerItem()
}

function celebrateWin() {
  confetti = new ConfettiGenerator(confettiSettings)
  confetti.render()
}
</script>

<style scoped>
#confetti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
</style>
