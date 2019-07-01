import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.scss';
import './fontawesome-lib';
import './svgs.scss';

const Index = () => <Routes />;

ReactDOM.render(<Index />, document.getElementById('index'));
