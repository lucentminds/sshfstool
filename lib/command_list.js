/**
 * 10-10-2017
 * Removes an existing profile.
 * ~~ Scott Johnson
 */

/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* jshint esversion:6 */
/* eslint-env es6 */
const help = function(){
  return require( './help' ).load( 'list' );
};// /help()

const ARGS = require( 'minimist' )( process.argv, {} );
const storage = require( './storage' );

const list = module.exports = function(){ // jshint ignore:line

   storage.get()
   .then(function( oConfig ){
      var n, p;

      if( oConfig.profile.length < 1 ){
         process.stderr.write( `No profiles defined.\n` );
         process.exit( 1 );

      }

      process.stdout.write( '='.repeat( 80 ).concat( '\n' ) );
      process.stdout.write( ''.concat(
        pad( trim( 'NAME', 15 ), 20 ),
        pad( trim( 'HOST', 15 ), 20 ),
        pad( trim( 'LOCAL PATH', 35 ), 40 ),
        '\n' ) );
      for( n in oConfig.profile ) {
        p = oConfig.profile[ n ];
        process.stdout.write( ''.concat(
        pad( trim( p.name, 15 ), 20 ),
        pad( trim( p.host, 15 ), 20 ),
        pad( trim( p.local, 35 ), 40 ),
           '\n' ) );
      }// /for()
   });
  };// /list()
  
  const trim = function( cString, nLimit ) {
    if( cString.length <= nLimit ) {
      return cString;
    }

    return cString.substring( 0, nLimit-3 ).concat( '...' );
  };// / trim()
  
  const pad = function( cString, nLength ) {
    var cPad = ' '.repeat( nLength );
    return (cString+cPad ).substring( 0, nLength );
  };// / trim()