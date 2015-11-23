How to manage TypeScript Definitions (for a new project NOT this one!):
1) First install TypeScript Definition manager for DefinitelyTyped
npm install tsd -g

2) Navigate to the directory you want to hold the typings,
and install definition files (such as jQuery) like this:

tsd init
tsd install jquery --save
tsd install es6-shim --save
tsd install bluebird --save

3) Need to add a reference to the .d.ts in the particular .ts file
having the problem, something like:

/// <reference path="../typings/jquery.d.ts"/>

4) Add tsconfig.json
Configure Webstorm to use ts compiler with tsconfig.json. File -> Setting -> TypeScript