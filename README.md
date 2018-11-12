# Kicklog
Task Tracker build on Mean.js.

## Live Example
The app can be tested on [kicklog.com](http://www.kicklog.com/) with login credentials tester:test123.

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

## Installation
* Clone the Repository
```
$ git clone https://github.com/hoeselm/kicklog.git
```
* Change into the directory
```
$ cd meanProject
```
* Install server side dependencies
```
$ npm install
```
* Install client side dependencies
```
$ bower install 
```

## Configuration
* Create the file config/env/credentials.js and add the following content,
* change the values to meet your requirements

```
module.exports = {
  sessionSecret: 'MEAN',
  developmentDB: 'mongodb://127.0.0.1/kicklog-development',
  productionDB: 'mongodb://127.0.0.1/kicklog-production',
  secureDB: 'mongodb://127.0.0.1/kicklog-secure',
  testDB: 'mongodb://127.0.0.1/kicklog-test',
  developmentMailer: {
    from: '',
    service: '',
    user: '',
    pass: ''
  },
  productionMailer: {
    from: '',
    service: '',
    user: '',
    pass: ''
  }
};
```
* This file is included in the .gitignore file to prevent publishing sensitive data.

## Test
* Run grunt
```
$ grunt
```

## Credits
* Contributors of mean.js [Mean.js](https://github.com/meanjs/mean)
* Great starter tutorial for people new to the Mean Stack [Bossable](http://www.bossable.com/)
* To all the people who are helping in making open source software awesome.

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
