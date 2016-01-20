Angular Fast Bind Seed
======================

Initialize
----------

	npm install
	bower install


Demo !
------

Start the demo server with `grunt demo` and go to [http://localhost:8000/demo/](http://localhost:8000/demo/).

How to Use !
------------

#### owsNgBind
    <span ows-ng-bind="test" ows-channel="'test'"></span>
#### owsNgBindHtml    
    <span ows-ng-bind-html="test_html" ows-channel="'test'"></span>
#### owsNgClass
    <span ows-ng-class="test_class" ows-channel="'test'"></span>
#### owsNgShow    
    <span ows-ng-show="test_show" ows-channel="'test'">Show content</span>
#### owsNgHide    
    <span ows-ng-hide="test_hide" ows-channel="'test'">Hide content</span>
#### owsNgIf
    <span ows-ng-if="test_show" ows-channel="'test'">If content</span></br>
#### owsNgRepeatOnlyPush below   
    <div ows-ng-repeat-only-push="i in list track by i" ows-channel="'test'">
      <span ows-ng-bind="i + 10" ows-channel="'test'+$index"></span></br>
    </div>

#### How to tell owsFastBind update
	Using broadcast to tell whenever update the directive
		$rootScope.$broadcast("test");
	After that, the direct will be automatic checking new value of variable and update the dom	

Make it yours
-------------

#### Update bower and package infos

You want to look at name, description, homepage, author, keywords, main and repository

	├ bower.json
	├ package.json


#### Remove sample dist files from

	├ dist/


#### Do something awesome in the source files

	├ src/


#### And reflect your source files for build and test tasks!

	├ tasks/
	│ ├ files.js (source and sourceStyle)


#### Set your module name to ngtemplates task

	├ tasks/options/ngtemplates.js


#### Write tests

	├ test/


#### Adjust the demo and end to end environment to your module and directive names

	├ demo/
	│ ├ index.html
	│ ├ app.js
	├ test/
	│ ├ e2e/
	│ │ ├ env/
	│ │	│ ├ index.html
	│ │ │ ├ app.js


Grunt Tasks
-----------

 * `grunt`: Execute tests
 * `grunt coverage`: Serve coverage report on port 7000
 * `grunt test`: Just test
 * `grunt test:e2e`: Just test end to end
 * `grunt test:unit`: Just test unit
 * `grunt tdd`: Watch source and test files and run tests
 * `grunt tdd:e2e`: Watch and test just end to end
 * `grunt tdd:unit`: Watch and test just unit
 * `grunt build`: Just build
 * `grunt release`: Test, build, bump patch version, commit, add version tag and push

 `test` tasks have a `--browsers` option to specify the browsers you want to use
 `test` tasks have also a `--reporters` option to specify the reporters you want to use

 Browsers can also be set by the following environment-variables
 ```
   PROTRACTOR_BROWSERS=Firefox,Chrome
   KARMA_BROWSERS=Firefox,PhantomJS
 ```

 Reporters can also be set by the following environment-variables
 ```
   KARMA_REPORTERS=dots,osx
   PROTRACTOR_REPORTERS=spec
 ```

_See Gruntfile.js and tasks/options for all task details._


LICENSE
-------

> The MIT License
> 
> Copyright (c) 2014 Jimdo GmbH http://jimdo.com
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
