import ReactDOM from 'react-dom'
import { Wrap } from './wrap'
import './base.scss'
import { pages } from '../../pages/index'

export function render(App: () => JSX.Element) {
  ReactDOM.render(
    <Wrap
      sidebars={pages.map((item) => ({
        name: item.title,
        link: `/${item.link}`,
      }))}
    >
      <App />
    </Wrap>,
    document.querySelector('#root')
  )
}
