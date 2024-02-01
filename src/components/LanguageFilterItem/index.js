// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachLangdetails, onChangelang, css} = props
  const {id, language} = eachLangdetails

  const onChangeLanguage = () => {
    onChangelang(id)
  }

  const cssStatus = css ? 'selectedcss' : 'selected'
  // console.log(cssDetails)
  return (
    <li>
      <button type="button" onClick={onChangeLanguage} className="list">
        <p className={cssStatus}>{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
