type SourceType = string | HTMLElement
type ActionType = 'copy' | 'cut'

export const copy: (source: SourceType) => string = (source) =>
  action(source, 'copy')
export const cut: (source: SourceType) => string = (source) =>
  action(source, 'cut')

function action(source: SourceType, type: ActionType): string {
  let selectedText = ''
  if (typeof source === 'string') {
    const fakeElement = createFakeElement(source)
    document.documentElement.appendChild(fakeElement)
    selectedText = selectText(fakeElement)
    command(type)
    fakeElement.remove()
  } else {
    selectedText = selectText(source)
    command(type)
  }

  return selectedText
}

// 出处：https://github.com/zenorocha/clipboard.js/blob/master/src/common/create-fake-element.js
function createFakeElement(source: string): HTMLElement {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl'
  const fakeElement = document.createElement('textarea')
  // Prevent zooming on iOS
  fakeElement.style.fontSize = '12pt'
  // Reset box model
  fakeElement.style.border = '0'
  fakeElement.style.padding = '0'
  fakeElement.style.margin = '0'
  // Move fakeElement out of screen horizontally
  fakeElement.style.position = 'absolute'
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'
  // Move fakeElement to the same position vertically
  let yPosition = window.pageYOffset || document.documentElement.scrollTop
  fakeElement.style.top = `${yPosition}px`
  fakeElement.setAttribute('readonly', '')

  fakeElement.value = source
  return fakeElement
}

// 出处：https://github.com/zenorocha/select/blob/master/src/select.js
function selectText(element: HTMLElement): string {
  let selectedText = ''
  if (element.nodeName === 'SELECT') {
    const e = element as HTMLSelectElement
    element.focus()
    selectedText = e.value
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    const e = element as HTMLInputElement
    const isReadOnly = e.hasAttribute('readonly')

    if (!isReadOnly) e.setAttribute('readonly', '')
    e.select()
    e.setSelectionRange(0, e.value.length)

    if (!isReadOnly) e.removeAttribute('readonly')

    selectedText = e.value
  } else {
    if (element.hasAttribute('contenteditable')) element.focus()

    const selection = window.getSelection()
    const range = document.createRange()

    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)

    selectedText = selection.toString()
  }

  return selectedText
}

// 出处：https://github.com/zenorocha/clipboard.js/blob/master/src/common/command.js
function command(type: ActionType): boolean {
  try {
    return document.execCommand(type)
  } catch (err) {
    return false
  }
}
