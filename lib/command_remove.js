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
  return require( './help' ).load( 'remove' );
};// /help()

const ARGS = require( 'minimist' )( process.argv, {
   alias: {
      n: 'name',
   },
   string: [
      'name',
   ],
   'default': {
      name: ''
   }
} );
const storage = require( './storage' );

const remove = module.exports = function(){ // jshint ignore:line
   if( !ARGS.name ) {
      process.stdout.write( help().concat( '\n\n' ) );
      process.stderr.write( 'name is missing or invalid.\n' );
      process.exit( 1 );
   }

   storage.get()
   .then(function( oConfig ){

      if( !oConfig.profile[ ARGS.name ] ){
         process.stderr.write( `Profile does not exist: ${ARGS.name}\n` );
         process.exit( 1 );

      }

      oConfig.profile[ ARGS.name ] = null;
      delete oConfig.profile[ ARGS.name ];

      return storage.set( oConfig );
   })
   .then(function(){

      return storage.get();
   })
   .then(function( /* oConfig */ ){
      process.stderr.write( `Removed: ${ARGS.name}\n` );
   });
};// /remove()