require('style-loader!css-loader!jasmine-core/lib/jasmine-core/jasmine.css');
global.jasmineRequire = require('jasmine-core/lib/jasmine-core/jasmine');
require('jasmine-core/lib/jasmine-core/jasmine-html');
require('jasmine-core/lib/jasmine-core/boot');
require('./root_component_spec');
