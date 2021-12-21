export enum ColorType {
  HEX3 = '十六进制(3)',
  HEX6 = '十六进制(6)',
  RGB = 'RGB',
  // HSL = 'HSL',
  // HSB = 'HSB/HSV',
}

export const regexp = {
  HEX: /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  HEX3: /^#?[0-9a-fA-F]{3}$/,
  HEX6: /^#?[0-9a-fA-F]{6}$/,
  number255: /^([0-9]{1,2}|[01][0-9]{2}|2[0-5]{2})$/,
}