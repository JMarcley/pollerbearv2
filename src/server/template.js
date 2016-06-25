module.exports = function (html, initialState) {

    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>PollerBear</title>
          <link rel="stylesheet" type="text/css" href="/static/app.css">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
    `;

};
