import React, { PureComponent } from 'react';
import './Header.css';

class Header extends PureComponent {
  render() {
    return (
      <header className="component-header">
      	<span className="title">My Contacts</span>
      </header>
    );
  }
}
export default Header;