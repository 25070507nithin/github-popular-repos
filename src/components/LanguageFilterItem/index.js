// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, onClickSelectedLanguage} = props
  const {id, language} = languageItem
  const onClickLanguage = () => {
    onClickSelectedLanguage(id)
  }
  return (
    <li onClick={onClickLanguage}>
      <button type="button">{language}</button>
    </li>
  )
}

export default LanguageFilterItem
