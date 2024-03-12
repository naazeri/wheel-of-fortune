import { ref, computed, watch } from 'vue'
import type { PropsType } from '@/types'

export function useRotate(props: PropsType, emit: Function) {
  const isRotating = ref(false)
  const rotateEndDeg = ref(0)
  const prizeRes = ref()

  // const decimalSpaces = computed(() => {
  //   // if (props.useWeight) return 0
  //   const sortArr = [...props.prizes].sort((a, b) => {
  //     const aRes = String(a.probability).split('.')[1]
  //     const bRes = String(b.probability).split('.')[1]
  //     const aLen = aRes ? aRes.length : 0
  //     const bLen = bRes ? bRes.length : 0
  //     return bLen - aLen
  //   })
  //   const maxRes = String(sortArr[0].probability).split('.')[1]
  //   const idx = maxRes ? maxRes.length : 0
  //   return [1, 10, 100, 1000, 10000][idx > 4 ? 4 : idx]
  // })

  // const prizesIdArr = computed(() => {
  //   const idArr: number[] = []
  //   props.prizes.forEach((row) => {
  //     const count: number = (row.probability || 0) * decimalSpaces.value
  //     const arr = new Array(count).fill(row.id)
  //     idArr.push(...arr)
  //   })
  //   return idArr
  // })

  const rotateDuration = computed(() => {
    return isRotating.value ? props.duration / 1000 : 0
  })

  const rotateStyle = computed(() => {
    return {
      '-webkit-transform': `rotateZ(${rotateEndDeg.value}deg)`,
      transform: `rotateZ(${rotateEndDeg.value}deg)`,
      '-webkit-transition-duration': `${rotateDuration.value}s`,
      'transition-duration': `${rotateDuration.value}s`,
      '-webkit-transition-timing-function:': props.timingFun,
      'transition-timing-function': props.timingFun
    }
  })

  const rotateBase = computed(() => {
    let angle = props.angleBase * 360
    if (props.angleBase < 0) angle -= 360
    return angle
  })

  const canRotate = computed(() => {
    return !props.disabled && !isRotating.value
  })

  watch(
    () => props.winnerId,
    (newVal) => {
      if (!isRotating.value) return
      let newAngle = getTargetDeg(newVal)
      if (props.angleBase < 0) newAngle -= 360
      const prevEndDeg = rotateEndDeg.value
      let nowEndDeg = props.angleBase * 360 + newAngle
      const angle = 360 * Math.floor((nowEndDeg - prevEndDeg) / 360)
      if (props.angleBase >= 0) {
        nowEndDeg += Math.abs(angle)
      } else {
        nowEndDeg += -360 - angle
      }
      rotateEndDeg.value = nowEndDeg
    }
  )

  function handleClick(): void {
    if (!canRotate.value) return

    emit('rotateStart')
    onRotateStart()
  }

  function onRotateStart(): void {
    isRotating.value = true
    const winnerId = props.winnerId
    rotateEndDeg.value = rotateBase.value + getTargetDeg(winnerId)
  }

  function onRotateEnd(): void {
    isRotating.value = false
    rotateEndDeg.value %= 360
    emit('rotateEnd', prizeRes.value)
  }

  function getTargetDeg(winnerId: number): number {
    const angle = 360 / props.prizes.length
    const num = props.prizes.findIndex((row) => row.id === winnerId)
    prizeRes.value = props.prizes[num]
    return 360 - (angle * num + angle / 2)
  }

  return {
    rotateStyle,
    handleClick,
    onRotateEnd
  }
}
