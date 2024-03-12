export interface PrizeConfig {
  id: number
  prizeNameOnWheel: string
  prizeName: string
  bgColor: string
  color: string
  probability: number
  [propName: string]: any
}

export interface CanvasConfig {
  radius?: number
  textRadius?: number
  textLength?: number
  textDirection?: string
  lineHeight?: number
  borderWidth?: number
  borderColor?: string
  btnText?: string
  btnWidth?: number
  fontSize?: number
}

export interface PropsType {
  disabled: boolean
  canvas: CanvasConfig
  duration: number
  timingFun: string
  angleBase: number
  winnerId: number
  prizes: PrizeConfig[]
}
