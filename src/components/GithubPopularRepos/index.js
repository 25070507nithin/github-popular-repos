import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const stateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  pending: 'PENDING',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryData: [],
    languageId: 'ALL',
    stage: stateConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryData()
  }

  onSuccess = data => {
    const formattedData = data.popular_repos.map(eachData => ({
      id: eachData.id,
      avatarUrl: eachData.avatar_url,
      forksCount: eachData.forks_count,
      issuesCount: eachData.issues_count,
      starsCount: eachData.stars_count,
      name: eachData.name,
    }))
    this.setState({
      repositoryData: formattedData,
      stage: stateConstants.success,
    })
  }

  renderOnSuccess = () => {
    const {repositoryData} = this.state
    return (
      <ul className="repository-container">
        {repositoryData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoItem={eachRepo} />
        ))}
      </ul>
    )
  }

  onFailure = () => {
    this.setState({
      stage: stateConstants.failure,
    })
  }

  renderOnFailure = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  renderOnLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getRepositoryData = async () => {
    const {languageId} = this.state
    this.setState({stage: stateConstants.pending})
    const url = `https://apis.ccbp.in/popular-repos?language=${languageId}`

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data)
    } else {
      this.onFailure()
    }
  }

  onClickSelectedLanguage = id => {
    this.setState({languageId: id}, this.getRepositoryData)
  }

  renderUi = () => {
    const {stage} = this.state
    switch (stage) {
      case stateConstants.success:
        return this.renderOnSuccess()
      case stateConstants.failure:
        return this.renderOnFailure()
      case stateConstants.pending:
        return this.renderOnLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1>Popular</h1>
        <ul className="language-container">
          {languageFiltersData.map(language => (
            <LanguageFilterItem
              key={language.id}
              languageItem={language}
              onClickSelectedLanguage={this.onClickSelectedLanguage}
            />
          ))}
        </ul>
        {this.renderUi()}
      </div>
    )
  }
}

export default GithubPopularRepos
