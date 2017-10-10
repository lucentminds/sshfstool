#!/usr/bin/env node

/**
 * 10-09-2017
 * Handy tool kit for use with [sshfs](https://github.com/libfuse/sshfs).
 * ~~ Scott Johnson
 */

/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* jshint esversion:6 */
/* eslint-env es6 */

//var Q = require( 'q' );
//var deferred = Q.defer();
//var Module = module.exports = {};
const parseArgs = require( 'minimist' );
const ARGS = parseArgs( process.argv );
const path = require( 'path' );
const APP_ROOT = path.resolve( __dirname, '..' );
const help = require( APP_ROOT+'/lib/help' );
console.log( ARGS );

if( ARGS.h || ARGS.help ) {
   (function(){
      var helpSubject, cHelpText;
   
      helpSubject = ARGS.h || ARGS.help;
      if( !helpSubject ){
         return;
      }

      cHelpText = help.load( helpSubject );
      console.log( cHelpText );
      process.exit( 0 );
   
   }());

}

console.log( 'Hello, World!' );
