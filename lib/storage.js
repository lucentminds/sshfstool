/**
 * 10-10-2017
 * Storage module.
 * ~~ Scott Johnson
 */

/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* jshint esversion:6 */
/* eslint-env es6 */

//const Q = require( 'q' );

const fs = require( 'fs' );
const path = require( 'path' );
const os = require( 'os' );
//const APP_ROOT = path.resolve( __dirname, '..' );
const DIR_HOME = os.homedir();
const DIR_STORAGE = path.join( DIR_HOME, '.sshfstool' );
const PATH_CONFIG = path.join( DIR_STORAGE, 'config.json' );

var storage = module.exports = {};

storage.get = function(){

   return new Promise(function( resolve, reject ){
      fs.readFile( PATH_CONFIG, 'utf8', function( err, content ){
         var oData;

         if( err ) {
            return reject( err );
         }

         oData = JSON.parse( content );

         resolve( oData );
      } );
   });

};// /get()

storage.set = function( oData ){

   return new Promise(function( resolve, reject ){
      fs.writeFile( PATH_CONFIG, JsonStringify( oData ), 
      { encoding:'utf8' }, function( err ){
         if( err ) {
            return reject( err );
         }
         
         resolve();
      } );
   });

};// /set()

var pathExistsSync = function( cPath ){
   try{
      fs.lstatSync( cPath );
      return true;
   }
   catch( e ) {
      return false;
   }
};// /pathExistsSync()

var mkdirSync = function( cPath ){
   cPath = path.resolve( cPath );

   try{
      fs.mkdirSync( cPath );
      return true;
   }
   catch( e ) {
      return false;
   }
};// /mkdirSync()

var writeFileSync = function( cPath, cData ){
   cPath = path.resolve( cPath );

   try{
      fs.writeFileSync( cPath, cData, {encoding:'utf8'} );
      return true;
   }
   catch( e ) {
      return false;
   }
};// /writeFileSync()

var JsonStringify = function( value ){
   return JSON.stringify( value, null, '   ' );
};// /JsonStringify()

if( !pathExistsSync( DIR_STORAGE ) ) {
   
   if( !mkdirSync( DIR_STORAGE ) ) {
      process.stderr.write( `Unable to create application storage path: ${DIR_STORAGE}.\n` );
      process.exit( 1 );
   }

}

if( !pathExistsSync( PATH_CONFIG ) ) {
   // The config file doesn't exist yet. Create it!
   
   if( !writeFileSync( PATH_CONFIG, JsonStringify( {
      mount: [],
      profile: {}
   } ) ) ) {
      process.stderr.write( `Unable to create application config path: ${PATH_CONFIG}.\n` );
      process.exit( 1 );
   }

}