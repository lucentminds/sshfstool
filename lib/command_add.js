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
      u: 'user',
      h: 'host',
      l: 'local',
      p: 'port',
      r: 'remote'
   },
   string: [
      'name',
      'user',
      'host',
      'local',
      'port',
      'remote'
   ],
   'default': {
      name: '',
      user: 'root',
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
    
   if( !ARGS.user ) {
      process.stdout.write( help().concat( '\n\n' ) );
      process.stderr.write( 'user is missing or invalid.\n' );
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
         process.stderr.write( `Profile exists: ${ARGS.name}\n` );
         process.exit( 1 );

      }

      oConfig.profile[ ARGS.name ] = {
         name: ARGS.name,
         host: ARGS.host,
         local: ARGS.local,
         port: ARGS.port,
         remote: ARGS.remote,
         user: ARGS.user
      };

      return storage.set( oConfig );
   })
   .then(function( /* oConfig */ ){
      process.stderr.write( `Added: ${ARGS.name}\n` );
   });
};// /add()