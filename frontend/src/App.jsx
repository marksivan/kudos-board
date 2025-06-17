import './App.css'
import Header from './HomePage/Header.jsx'
import Footer from './HomePage/Footer.jsx'
import BoardList from './HomePage/BoardList.jsx'
import Search from './HomePage/Search.jsx'
import CreateBoard from './HomePage/CreateBoard.jsx'
import Categories from './HomePage/Categories.jsx'


function App(){
   return(
       <div className="App">
           <Header/>
           <Search/>
           <Categories/>
           <CreateBoard/>
           <BoardList/>
           <Footer/>

       </div>
   )
}


export default App;
