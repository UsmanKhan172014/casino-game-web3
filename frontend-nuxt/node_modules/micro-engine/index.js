var root = this; 
var template = null;
// core modules
var vm = require('vm');
var fs = require('fs');
var path = require('path');
var util = require('util');
// identifiers
var s = '{{';
var e = '}}';
var ext = '.mic';

function templateDelimiterHandler ( content, pointer ) {
  var out = [];
  var start = s;
  var end = e;
  var pointer = ( pointer || 0 );

  out.push( content.indexOf( start, pointer ) );
  out.push( content.indexOf( end, pointer + 1 ) );
  out.push( content.slice( out[0] + start.length, out[1] ) );

  return out;
}
root.delimiter = templateDelimiterHandler;

function templateReplaceHandler ( content, ctx ) {
  var out = content;
  var keys = Object.keys( ctx );

  function keyMapHandler ( item, idx, c ) {
    var self = this;

    while ( out.match( item ) ) {
      out = out.replace( item, self[ item ] );
    }
  }
  keys.map( keyMapHandler.bind( ctx ) );
  
  return out;
}
root.replace = templateReplaceHandler;

function templateCompileHandler ( ctx ) {
  var self = this;
  var out = self.content;
  var piece = null;
  var delimitation = null;
  var content = null;
  var start = s;
  var end = e;

  while ( root.delimiter( out )[0] !== -1 ) {
    delimitation = root.delimiter( out );
    content = delimitation[2];
    delimitation[2] = root.replace( content, ctx );

    out = out.replace( start + content + end, delimitation[2] );
  }

  return out;
}

function templateRunHandler ( ctx ) {
  var self = this;  
  var input = templateCompileHandler.call( self, ctx );
  var ctx = vm.createContext( ctx );
  var cache = 'micro.vm';
  var VM = vm.runInContext( input, ctx, cache );

  ctx._compiled = input;

  return ctx;
}

function templateRenderHandler ( ctx, expression ) {
  var self = this;
  var input = templateRunHandler.call( self, ctx );
  var ctx = { content: expression };
  var out = templateCompileHandler.call( ctx, input );

  return out;
}

function templateMainHandler ( content ) {
  var self = {};
  var ctx = {};

  ctx.content = content;

  self.compile = templateCompileHandler.bind( ctx );
  self.run = templateRunHandler.bind( ctx );
  self.render = templateRenderHandler.bind( ctx );

  return self;
}
template = templateMainHandler;

function templateFileHandler ( filename ) {
  var hasExt = ~( filename.indexOf( ext ) );
  var filename = ( hasExt ) ? filename : [ filename, ext ].join(''); 
  var filepath = path.resolve( process.cwd(), filename );
  var content = fs.readFileSync( filepath, 'utf-8' );

  return template( content );
}
root.file = templateFileHandler;

// static methods
template.delimiter = root.delimiter;
template.replace = root.replace;
template.file = root.file;

module.exports = exports = template;
