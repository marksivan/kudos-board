import './CardList.css';
import Card from './Card';


function CardList() {
  return (
    <div className="card">
            <div className='card-image'>
                <img src="	https://picsum.photos/200/300?random=129" alt="" />
            </div>

            <div className='card-message'>
                <p>This is a sample text</p>
            </div>

            <div className='board-category'>
                <p>Inspiration</p>
            </div>

            <div className='board-operations'>
                <button className='view-board'>View Board</button>
                <button className='delete-board'>Delete board</button>

            </div>
    </div>

  )
}

export default CardList;
