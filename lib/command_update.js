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
const profile = require( './profile' );
const help = function(){
  return require( './help' ).load( 'update' );
};// /help()
const parseArgs = require( 'minimist' );
const ARG_OPTIONS = {
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
      name: null,
      user: null,
      host: null,
      local: null,
      port: null,
      remote: null
   }
};
const ARGS = parseArgs( process.argv, ARG_OPTIONS );
const storage = require( './storage' );
const add = module.exports = function(){ // jshint ignore:line
  const cProfileName = ARGS.name;

   if( !ARGS.name ) {
      process.stdout.write( help().concat( '\n\n' ) );
      process.stderr.write( 'name is missing or invalid.\n' );
      process.exit( 1 );
   }

   storage.get()
   .then(function( oConfig ){
     var oOptions, oProfile = oConfig.profile[ cProfileName ];
     var cProfileError;

      if( !oProfile ){
         process.stderr.write( `Profile does not exist: ${cProfileName}\n` );
         process.exit( 1 );

      }
      
      oOptions = extract_not_null({
         user: ARGS.user,
         host: ARGS.host,
         local: ARGS.local,
         port: ARGS.port,
         remote: ARGS.remote
      } );

      Object.assign( oProfile, oOptions );

      cProfileError = profile.isBad( oProfile );

      if( cProfileError ) {
         process.stderr.write( `Bad profile: ${cProfileError}\n` );
         process.exit( 1 );
      }

      oConfig.profile[ ARGS.name ] = oProfile;

      return storage.set( oConfig );
   })
   .then(function( /* oConfig */ ){
      process.stderr.write( `Updated: ${ARGS.name}\n` );
   });
};// /add()

function extract_not_null( oObj ) {
   var n, v, oResult = {};

   for( n in oObj ) {
      v = oObj[ n ];

      if( v === null ) {
         continue;
      }

      oResult[ n ] = v;
   }// /for()

   return oResult;

}// /null()