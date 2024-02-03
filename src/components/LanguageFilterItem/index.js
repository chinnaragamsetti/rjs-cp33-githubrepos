// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachLangdetails, onChangelang, css} = props
  const {id, language} = eachLangdetails

  const onChangeLanguage = () => {
    onChangelang(id)
  }

  const cssStatus = css ? 'selectedcss' : ''
  // console.log(cssDetails)
  return (
    <li>
      <button
        type="button"
        onClick={onChangeLanguage}
        className={`selected ${cssStatus}`}
      >
        <p className="">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
