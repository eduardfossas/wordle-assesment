const LAYOUT_WIDTH = 1440
const LAYOUT_WIDTH_MOBILE = 375

export const layoutToCss = (value: number) => value * 100 / LAYOUT_WIDTH
export const layoutToCssMobile = (value: number) => value * 100 / LAYOUT_WIDTH_MOBILE
