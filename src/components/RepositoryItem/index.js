// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = repoItem
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1>{name}</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount}</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount}</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
