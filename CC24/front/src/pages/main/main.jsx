import './Main.css';
import React from 'react';
import Carousel from './Carousel';
// import Cards from './Cards';
import Navbar from '../../components/Navbar';
import Carousel1 from './Carousel1';

function Main() {
  // const cards = [
  //   {
  //     key: 1,
  //     content: (
  //       <Cards imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/convertplus_thumbnail.jpg" />
  //     ),
  //   },
  //   {
  //     key: 2,
  //     content: (
  //       <Cards imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/convertplus_thumbnail.jpg" />
  //     ),
  //   },
  //   {
  //     key: 3,
  //     content: (
  //       <Cards imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png" />
  //     ),
  //   },
  // ];
  return (
    <div className="flex px-10">
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl text-left mb-4 leading-relaxed">Main</p>
        {/* <div className="">
          <Carousel
            cards={cards}
            height="500px"
            width="30%"
            margin="0 auto"
            offset={2}
            showArrows={true}
          />
        </div> */}
      </div>
      <Carousel1 />
      <Navbar className="fixed" />
    </div>
  );
}

export default Main;
