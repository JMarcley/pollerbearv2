import express from 'express';
const app = express();

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { createMemoryHistory } from 'history';
import { fetchComponentDataBeforeRender } from '../common/api/fetchComponentDataBeforeRender';

import configureStore from '../common/store/configureStore';
// import configureStore from '../common/store/newConfigureStore';
import { getUser } from '../common/api/user';
import routes from '../common/routes';
import packagejson from '../../package.json';

// For HTTPS connection
import https from 'https';
import serverConfig from './serverConfig';

//Config and settings
import appSettings from './config/appSettings';

//html Template [function]
import renderTemplate from './template';

//Database setup
require('./config/connect')[appSettings.DB_TYPE]();

//passport setup
require('./config/passport')(app);


if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}else{
  app.use('/static', express.static(__dirname + '/../../dist'));
}

//axios config
require('./config/axios')(app);

//express setup
require('./config/express')(app);

//server routes
require('./config/routes')(app);

app.get('/*', function (req, res) {

  const location = createLocation(req.url);

  getUser(user => {

      if(!req.session.passport.user) {
        res.redirect('/landing');
      }

      match({ routes, location }, (err, redirectLocation, renderProps) => {

        if(err) {
          console.error(err);
          return res.status(500).end('Internal server error');
        }

        if(!renderProps)
          return res.status(404).end('Not found');

        const store = configureStore({user : req.user, version : packagejson.version} );
        // const store = configureStore({version : packagejson.version});

        const InitialView = (
          <Provider store={store}>
            {() =>
              <RoutingContext {...renderProps} />
            }
          </Provider>
        );

        //This method waits for all render component promises to resolve before returning to browser
        fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
          .then(html => {
            const componentHTML = React.renderToString(InitialView);
            const initialState = store.getState();
            res.status(200).end(renderTemplate(componentHTML,initialState))
          })
          .catch(err => {
            console.log(err)
            res.end(renderTemplate("",{}))
          });
      });

    }
  )

});

const server = https.createServer(serverConfig.options, app).listen(app.get('port'), function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
// https.createServer(serverConfig.options, app).listen(app.get('port'));

// const server = app.listen(3002, function () {
//   const host = server.address().address;
//   const port = server.address().port;
//   console.log("nodemon: off");
//   console.log('Example app listening at http://%s:%s', host, port);
// });
