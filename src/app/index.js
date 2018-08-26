import React, {Component} from 'react';
import {render} from 'react-dom';
import {SSL_OP_PKCS1_CHECK_1} from 'constants';

import App from './App'; //importo el archivo app.js

render(<App/>, document.getElementById('app')); // id app de index.html

