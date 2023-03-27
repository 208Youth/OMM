import React from 'react';
import './nav-bar.scss';

function Navbar() {
  return (
<div>
    <div className="bottom-appbar">
      <div className="tabs">
        <div className="tab is-active tab--left">
          <div className="flex justify-between">
            <div>💬</div>
            <div>💬</div>
          </div>
        </div>
        <div className="tab tab--fab">
          <div className="top">
            <div className="fab">+</div>
          </div>
        </div>
        <div className="tab tab--right">
          <div className="flex justify-between">
            <div>❤️️</div>
            <div>❤️️</div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}

export default Navbar;
