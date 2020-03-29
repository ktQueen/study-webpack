import a from './common/js/a';
import b from './common/js/b';
import c from './common/js/c';

a();
b();
c();

import React from 'react';
import ReactDOM from 'react-dom';

import style from './common/style/main.scss';
import './common/style/app.css';

import girl from './common/img/girl.jpeg';
import qw from './common/img/qw.jpeg';

import 'font-awesome/css/font-awesome.css';

console.log( style);

ReactDOM.render(
    <div>
        <div className="fa fa-rocket">React</div>
        <div className={style.ot}>sdsf</div>
        <img src={girl} alt=""/>
        <img src={qw} alt=""/>
        <img src={require('./common/img/cat.jpg')} alt=""/>
    </div>,
    document.getElementById('root')
);