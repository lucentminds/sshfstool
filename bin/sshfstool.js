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
console.log( ARGS );

(function(){
   const DIR_HELP = APP_ROOT+'/docs/help';
   var helpSubject, cHelpText;

   helpSubject = ARGS.h || ARGS.help;
   if( !helpSubject ){
      return;
   }

   switch( helpSubject ) {
   case 'mount':
      cHelpText = fs.readFileSync( DIR_HELP+'/mount.txt', {encoding:'utf8'} );
      break;

   default:
      cHelpText = fs.readFileSync( DIR_HELP+'/index.txt', {encoding:'utf8'} );
   }

   console.log( cHelpText );
   process.exit( 0 );

}());

function loadHelp( cHelpName ) {
   var cHelpText;
   try {
      cHelpText
   }
   catch( e ){
      cHelpText = `Cannot load help text for "${cHelpName}"`;
   }
}// /loadHelp()

console.log( 'Hello, World!' );
