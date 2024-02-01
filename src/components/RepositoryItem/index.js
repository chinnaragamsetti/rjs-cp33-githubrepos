// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachRepodetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepodetails
  return (
    <li className="repolist">
      <img src={avatarUrl} alt="avatar" className="eachlistimage" />
      <h1 className="name">{name}</h1>
      <div className="countscontainer">
        <div className="starscont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="start"
            className="countimage"
          />
          <p className="counttext">{`${starsCount} stars`}</p>
        </div>
        <div className="starscont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="start"
            className="countimage"
          />
          <p className="counttext">{`${forksCount} stars`}</p>
        </div>
        <div className="starscont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="start"
            className="countimage"
          />
          <p className="counttext">{`${issuesCount} stars`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
