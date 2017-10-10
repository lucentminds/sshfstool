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
const fs = require( 'fs' );
const path = require( 'path' );
const APP_ROOT = path.resolve( __dirname, '..' );
const DIR_HELP = APP_ROOT+'/docs/help';
console.log( ARGS );

(function(){
   var helpSubject, cHelpText;

   helpSubject = ARGS.h || ARGS.help;
   if( !helpSubject ){
      return;
   }
   if( helpSubject === true ){
      helpSubject = 'index';
   }

   cHelpText = loadHelp( helpSubject );
   console.log( cHelpText );
   process.exit( 0 );

}());

function loadHelp( cHelpName ) {
   var cHelpText;
   try {
      cHelpText = fs.readFileSync( `${DIR_HELP}/${cHelpName}.txt`, {encoding:'utf8'} );
   }
   catch( e ){
      cHelpText = `Cannot load help text for "${cHelpName}"`;
   }

   return cHelpText;
}// /loadHelp()

console.log( 'Hello, World!' );
