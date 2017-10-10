/**
 * 10-10-2017
 * Adds an existing profile.
 * ~~ Scott Johnson
 */

/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* jshint esversion:6 */
/* eslint-env es6 */
const help = function(){
  return require( './help' ).load( 'add' );
};// /help()

const ARGS = require( 'minimist' )( process.argv, {
   alias: {
      n: 'name',
      h: 'host',
      l: 'local'
   },
   string: [
      'name',
      'host',
      'local'
   ],
   'default': {
      name: '',
      host: '',
      local: '',
      port: '',
      remote: ''
   }
} );
const storage = require( './storage' );
const add = module.exports = function(){ // jshint ignore:line
   if( !ARGS.name ) {
      process.stdout.write( help().concat( '\n\n' ) );
      process.stderr.write( 'name is missing or invalid.\n' );
      process.exit( 1 );
   }

   if( !ARGS.host ) {
      process.stdout.write( help().concat( '\n\n' ) );
      process.stderr.write( 'host is missing or invalid.\n' );
      process.exit( 1 );
   }

   if( !ARGS.local ) {
      process.stdout.write( help().concat( '\n\n' ) );
      process.stderr.write( 'local mount path is missing or invalid.\n' );
      process.exit( 1 );
   }

   storage.get()
   .then(function( oConfig ){

      if( oConfig.profile[ ARGS.name ] ){
         process.stderr.write( `Profiles exists: ${ARGS.name}\n` );
         process.exit( 1 );

      }

      oConfig.profile[ ARGS.name ] = {
         name: ARGS.name,
         host: ARGS.host,
         local: ARGS.local,
         port: ARGS.port,
         remote: ARGS.remote         
      };

      return storage.set( oConfig );
   })
   .then(function(){

      return storage.get();
   })
   .then(function( /* oConfig */ ){
      process.stderr.write( `Added: ${ARGS.name}\n` );
   });
};// /add()