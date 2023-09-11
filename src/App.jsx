import './App.css'
import Folder from './Folder'

const App = () => {

  return (
    <>
       <div className="centered-container">
        <div className="left-element">
          <div>Andy</div>
          <div>Lewis</div>
        </div>
        <div className="middle-element">
          <Folder className='folder'/>
        </div>
        <div className="right-element">
          Heyo!
        </div>
      </div>
    </>
  )
}

export default App
