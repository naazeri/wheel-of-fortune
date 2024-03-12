<template>
  <div class="fw-container">
    <!-- wheel -->
    <div
      class="fw-wheel"
      :style="rotateStyle"
      @transitionend="onRotateEnd"
      @webkitTransitionend="onRotateEnd"
    >
      <canvas ref="wheelEl" :width="canvasConfig.radius * 2" :height="canvasConfig.radius * 2" />
    </div>

    <!-- button -->
    <div class="fw-btn">
      <div
        class="fw-btn__btn"
        :style="{ width: canvasConfig.btnWidth + 'px', height: canvasConfig.btnWidth + 'px' }"
        @click="handleClick"
      >
        {{ canvasConfig.btnText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCanvas } from '@/hooks/useCanvas'
import { useRotate } from '@/hooks/useRotate'
import type { CanvasConfig, PrizeConfig } from '@/types'

interface PropsType {
  disabled?: boolean
  canvas?: CanvasConfig
  duration?: number
  timingFun?: string
  angleBase?: number
  winnerId?: number
  prizes: PrizeConfig[]
}

const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
  canvas: () => ({}),
  duration: 6000,
  timingFun: 'cubic-bezier(0.36, 0.95, 0.64, 1)',
  angleBase: 10,
  winnerId: 0,
  prizes: () => []
})

const emit = defineEmits(['rotateStart', 'rotateEnd'])

const { wheelEl, canvasConfig } = useCanvas(props)
const { handleClick, rotateStyle, onRotateEnd } = useRotate(props, emit)

defineExpose({
  startRotate: (): void => {
    handleClick()
  }
})
</script>

<style lang="scss" scoped>
.fw-container {
  position: relative;
  display: inline-block;
  font-size: 0;
  overflow: hidden;
  canvas,
  img {
    display: block;
    width: 100%;
  }
}

.fw-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.fw-btn__btn {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border: 6px solid #fff;
  border-radius: 50%;
  background: #15bd96;
  color: #fff;
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 22px #fff solid;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 18px #15bd96 solid;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%) translateY(6px);
    z-index: 10;
  }
}

.fw-btn__image {
  display: inline-block;
}
</style>
