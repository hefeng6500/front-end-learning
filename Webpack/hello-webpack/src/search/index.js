import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import add from 'large-number-calculate';
import logo from './images/logo.png';
import co from '../../common';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="search-text">
        <h1>{add('999', '1')}</h1>
        Search Text1
        {
          co()
        }
        <img src={logo} alt="图片" />
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
);
