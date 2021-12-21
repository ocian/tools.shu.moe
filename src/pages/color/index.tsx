import React, { useEffect, useState } from 'react'
import { render } from '../../components'
import { ListTag } from './list_tag'
import { SpanCode } from './span_code'
import { ColorType, regexp } from './constant'
import styles from './color.module.scss'
import clsx from 'clsx'

const ColorPage = () => {
  const [input, setInput] = useState<string>('')
  const changeinput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const [sourceRGB, setSourceRGB] = useState<number[]>()
  const [type, setType] = useState<ColorType>()
  const [target, setTarget] = useState<{ hex: string[] }>()

  useEffect(() => {
    switch (true) {
      case regexp.HEX3.test(input):
        setType(ColorType.HEX3)
        setSourceRGB(HexToRgb(input))
        break
      case regexp.HEX6.test(input):
        setType(ColorType.HEX6)
        setSourceRGB(HexToRgb(input))
        break
      case checkRgb(input):
        setType(ColorType.RGB)
        setSourceRGB(formatRgb(input))
        break
      default:
        setType(undefined)
        setSourceRGB(undefined)
    }
  }, [input])
  useEffect(() => {
    if (!sourceRGB) setTarget(undefined)
    else {
      setTarget({
        hex: RgbToHex(sourceRGB),
      })
    }
  }, [sourceRGB])

  function checkRgb(source: string): boolean {
    return (
      source
        .replace(/(rgba?|\(|\))/gi, '')
        .split(',')
        .map((n) => regexp.number255.test(n.trim()))
        .filter(Boolean).length === 3
    )
  }

  function formatRgb(source: string): number[] {
    return source
      .replace(/(rgba?|\(|\))/gi, '')
      .split(',')
      .map((item) => +item.trim())
  }

  // hex{3,6} => rgb
  function HexToRgb(source: string): number[] {
    const _source = source.replace('#', '').toLocaleUpperCase()

    if (_source.length === 3)
      return _source.split('').map((item) => (parseInt(item, 16) * 255) / 15)

    if (_source.length === 6) {
      const list = []
      _source.replace(/[0-9A-F]{2}/g, (match) => {
        list.push(match)
        return ''
      })
      return list.map((item) => parseInt(item, 16))
    }
  }

  // rgb => hex
  function RgbToHex(source: number[]): string[] {
    return source.map((item) => Number(item).toString(16).padStart(2, '0'))
  }

  return (
    <div>
      <div className="row align-items-center">
        <div className="col-auto">
          <label htmlFor="colorInput" className="col-form-label">
            颜色值
          </label>
        </div>
        <div className="col-auto">
          <input
            id="colorInput"
            type="search"
            className="form-control"
            placeholder="输入一个颜色的值"
            value={input}
            onChange={changeinput}
          />
        </div>
      </div>

      <ul className={clsx('list-group mt-3', styles.ul)}>
        <li className="list-group-item">
          颜色
          <span className={styles['span-divider']} />
          <span
            className="mx-3 d-inline-block align-middle"
            style={{
              width: '1rem',
              height: '1rem',
              background: sourceRGB
                ? `rgb(${sourceRGB.join(',')})`
                : 'transparent',
            }}
          ></span>
        </li>
        <li className="list-group-item">
          类型
          <span className={styles['span-divider']} />
          <ListTag
            list={Object.entries(ColorType).map(([_, value]) => value)}
            selected={type + ''}
          />
        </li>
        <li className="list-group-item">
          {ColorType.RGB}
          <span className={styles['span-divider']} />
          <SpanCode code={sourceRGB && `rgb(${sourceRGB.join(', ')})`} />
        </li>
        <li className="list-group-item">
          {ColorType.HEX6}
          <span className={styles['span-divider']} />
          <SpanCode code={target?.hex && `#${target?.hex?.join('')}`} />
        </li>
      </ul>

      <p className="mt-3">
        参考：
        <a href="https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/">
          张鑫旭 - JS HEX十六进制与RGB, HSL颜色的相互转换
        </a>
      </p>
    </div>
  )
}

render(ColorPage)
