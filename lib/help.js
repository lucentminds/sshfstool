/**
 * 10-10-2017
 * Help module.
 * ~~ Scott Johnson
 */

/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* jshint esversion:6 */
/* eslint-env es6 */

//var Q = require( 'q' );
//var deferred = Q.defer();
const fs = require( 'fs' );
const path = require( 'path' );
const APP_ROOT = path.resolve( __dirname, '..' );
const DIR_HELP = APP_ROOT+'/docs/help';

var help = module.exports = {};

help.load = function( cHelpName ) {
   var cHelpText;

   if( !cHelpName || typeof cHelpName !== 'string' ){
      cHelpName = 'index';
   }

   try {
      cHelpText = fs.readFileSync( `${DIR_HELP}/${cHelpName}.txt`, 'utf8' );
   }
   catch( e ){
      cHelpText = `No help for "${cHelpName}"`;
   }

   return cHelpText;
};// /loadHelp()