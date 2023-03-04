"use strict"

const fs = require('fs');
const express = require('express');
const React = require('react');
const {serverLoad} = require('dmeditor');
const ReactDOMServer = require('react-dom/server')
const app = express();
const axios = require('axios')


function sanitize_path(path) {
  return path.split('.').join('');
}


async function renderPage(reactClass, resp,  data) {
  var status_code = 200;
  var html = '';
  try {
    
    data = await serverLoad(data.data);
    var react_element = React.createElement(reactClass, {data:data});
    html = ReactDOMServer.renderToString(react_element); 
    ////html = ReactDOMServer.renderToStaticMarkup(react_element); // use if you don't need react-ids'
  } catch(e) {
    status_code = 500;
    html = 'ERROR: ' + e;
    console.error(e.stack)
  }
  resp.status(status_code).send(html);
}


app.use('/static', express.static(__dirname + '/static'));
app.use(express.json())

app.all('*', async function (req, res) {
  var path = sanitize_path(req.url);
  var mod = null;
  var mod_path = './ts_compiled/pages'+path; // Restricted to pages. Anything within will be rendered.

  if(fs.existsSync(mod_path) || fs.existsSync(mod_path+".js")) {
    try {
      mod = require(mod_path)
    }catch(e) {
      mod = null;
      res.status(500).send('ERROR: ' + e);
      console.error(e)
      console.error(e.stack)
    }

    const bodyJson = req.body;

    if(mod && mod.default) {
      var cls = mod.default;
      
      var initialPropsPromise = null;
      if(cls.getInitialProps) {
        initialPropsPromise = cls.getInitialProps();
      }
      if(initialPropsPromise) {
        initialPropsPromise.then(function(data) { 
          renderPage(cls, res, {...data, data:bodyJson});
        })
      } else {
        renderPage(cls, res, {data:bodyJson})
      }
    }

  } else {
    res.status(404).send('Not found');
  }


});


module.exports = app;