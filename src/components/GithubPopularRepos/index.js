import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'LanguageFilterItem'  from '../LanguageFilterItem'
import 'RepositoryItem' from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
    state={isLoading:true,repositoryList=[],langStatus:languageFiltersData[0].id,css:false}

    onChangelang=id=>{
        this.setState(prevState=>({langStatus:id,css:!prevState.css}))
    }

    componentDidMount(){
        this.getList()
    }

    getList=async()=>{
        const {langStatus}=this.state
        const response=await fetch(`https://apis.ccbp.in/popular-repos?language=${langStatus}`)
        if (response.ok){
            const fetchedData=await response.json()
            const updateData=fetchedData.popular_repos.map(each=>({
                id:each.id,
                name:each.name,
                issuesCount:each.issues_count,
                forksCount:each.forks_count,
                starsCount:each.stars_count,
                avatarUrl:eahc.avatar_url
            }))
        this.setState({repositoryList:updateData,isLoading:false})
        }
    }

    renderList=()=>(
        <ul className='repositorycontainer'>
                {repositoryList.map(each=>(
                    <RepositoryItem key={each.id} eachRepodetails={each} />
                ))}
            </ul>
    )
  render() {
    const {isLoading,repositoryList,css}=this.state

    return (
      <div className="maincontainer">
        <h1 className="mainheading">Popular</h1>
        <ul className="languagescontainer">
          {languageFiltersData.map(each => (
            <LanguageFilterItem key={each.id} eachLangdetails={each} onChangelang={this.onChangelang} cssdetails={css}/>
          ))}
        </ul>
        {isLoading? <Loader type="ThreeDots" color="#0b69ff" height="50" width="50"/> :this.renderList()}
        
      </div>
    )
  }
}


export default GithubPopularRepos