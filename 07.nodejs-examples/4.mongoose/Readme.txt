First install python (version 2.7) on your computer from:
https://www.python.org/downloads/

Then make sure your python variable is set.
You can set it on command prompt like:

SET python=C:\Python27\python.exe
(Of course you should change the path according to your location of python) Then install node-gyp:

npm install -g node-gyp

Be sure to run > npm install

If you get an error:
Go to the file (in your project):

node_modules/mongoose/node_modules/mongodb/node_modules/bson/ext/index.js

and change:

bson = require('../build/Release/bson');

to:

bson = require('bson');

Reference: https://github.com/mongodb/js-bson/issues/118