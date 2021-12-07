import ReactDOM from 'react-dom'
import { Wrap } from './wrap'
import './base.scss'

export function render(App: () => JSX.Element) {
  ReactDOM.render(
    <Wrap>
      <App />
    </Wrap>,
    document.querySelector('#root')
  )
}
