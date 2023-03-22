import { useState } from 'react';
import './Carousel1.scss'

function Carousel1() {
    const [state, setState] = useState({});
    const elems = [
      { id: 1, pos: -2, text: '1' },
      { id: 2, pos: -1, text: '2' },
      { id: 3, pos: 0, text: '3' },
      { id: 4, pos: 1, text: '4' },
      { id: 5, pos: 2, text: '5' },
    ];
  
    const handleClick = (event) => {
      const newActive = event.target;
      const isItem = newActive.closest('.carousel__item');
  
      if (!isItem || newActive.classList.contains('carousel__item_active')) {
        return;
      }
  
      update(newActive);
    };
  
    const update = (newActive) => {
      const newActivePos = Number(newActive.dataset.pos);
  
      const current = elems.find((elem) => elem.pos === 0);
      const prev = elems.find((elem) => elem.pos === -1);
      const next = elems.find((elem) => elem.pos === 1);
      const first = elems.find((elem) => elem.pos === -2);
      const last = elems.find((elem) => elem.pos === 2);
  
      current.active = false;
  
      [current, prev, next, first, last].forEach((item) => {
        const itemPos = item.pos;
        item.pos = getPos(itemPos, newActivePos);
      });
  
      setState({}); // force re-render
    };
  
    const getPos = (current, active) => {
      const diff = current - active;
  
      if (Math.abs(current - active) > 2) {
        return -current;
      }
  
      return diff;
    };
  
    return (
      <div className="carousel">
        <ul className="carousel__list" onClick={handleClick}>
          {/* Render the carousel items */}
          {elems.map((item) => (
            <li
              key={item.id}
              className={`carousel__item${item.pos === 0 ? ' carousel__item_active' : ''}`}
              data-id={item.id}
              data-pos={item.pos}
            >
              {/* Render the item content */}
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Carousel1
