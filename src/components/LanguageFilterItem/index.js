// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachLangdetails, onChangelang, css} = props
  const {id} = eachLangdetails

  onChangelanguage = () => {
    onChangelang(id)
  }
  const cssstatus = css ? 'selectedcss' : 'selected'
  return (
    <li className="lanlist" onClick={onChangelanguage}>
      <h1 className={cssstatus}>{language}</h1>
    </li>
  )
}

export default LanguageFilterItem
