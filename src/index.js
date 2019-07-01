import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from './routes';
import './fontawesome-lib';
import './svgs.scss';

const Index = () => <Routes />;

ReactDOM.render(<Index />, document.getElementById('index'));
