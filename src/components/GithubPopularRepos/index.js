import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryList: [],
    langStatus: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {langStatus} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${langStatus}`,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const updateData = fetchedData.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repositoryList: updateData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangelang = id => {
    this.setState({langStatus: id}, this.getList)
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderList = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repositorycontainer">
        {repositoryList.map(each => (
          <RepositoryItem key={each.id} eachRepodetails={each} />
        ))}
      </ul>
    )
  }

  renderFailureview = () => (
    <div className="failureview">
      <img src="" alt="" className="failureimage" />
      <p className="failuretext">Something Went Wrong</p>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {langStatus} = this.state

    return (
      <div className="maincontainer">
        <h1 className="mainheading">Popular</h1>
        <ul className="languagescontainer">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              eachLangdetails={each}
              onChangelang={this.onChangelang}
              css={each.id === langStatus}
            />
          ))}
        </ul>
        {this.renderSwitch()}
      </div>
    )
  }
}

export default GithubPopularRepos
