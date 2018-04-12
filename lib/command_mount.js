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
const exec = require( 'child_process' ).exec;
const profile = require( './profile' );
const help = function(){
  return require( './help' ).load( 'mount' );
};// /help()
//const ARGS = require( 'minimist' )( process.argv, {} );
const storage = require( './storage' );

const mount = module.exports = function( PROFILE_NAME ){ // jshint ignore:line

   if( !PROFILE_NAME ) {
      process.stdout.write( help().concat( '\n\n' ) );
      process.stderr.write( 'Profile name is missing or invalid.\n' );
      process.exit( 1 );
   }

   storage.get()
   .then(function( oConfig ){
      var p, cCommand, cProfileError, oMount;

      p = oConfig.profile[ PROFILE_NAME ];

      if( !p ){
        process.stderr.write( `Profile does not exist: ${PROFILE_NAME}\n` );
        process.exit( 1 );
      }

      oMount = oConfig.mount[ PROFILE_NAME ];

      if( oMount ){
        process.stderr.write( `${PROFILE_NAME} is already mounted in ${oMount.local}\n` );
        process.exit( 1 );
      }

      cProfileError = profile.isBad( p );

      if( cProfileError ) {
         process.stderr.write( `Bad profile: ${cProfileError}\n` );
         process.exit( 1 );
      }

      cCommand = `mkdir -p ${p.local} || exit 0`;
      console.log( cCommand );

      execp( cCommand )
      .then(function( oResult ){
         if( oResult.err ) {
            process.stderr.write( `${oResult.err}` );
            process.exit( 1 );
            return;
         }

         if( oResult.stderr ) {
            process.stderr.write( oResult.stderr );
         }

         if( oResult.stdout ) {
            process.stdout.write( oResult.stdout );
         }
         

         cCommand = `sshfs ${p.user}@${p.host}:${p.remote} ${p.local}`;
         console.log( cCommand );
         return execp( cCommand );

      })
      .then(function( oResult ){
         if( oResult.err ) {
            process.stderr.write( `${oResult.err}` );
            process.exit( 1 );
            return;
         }

         if( oResult.stderr ) {
            process.stderr.write( oResult.stderr );
         }

         if( oResult.stdout ) {
            process.stdout.write( oResult.stdout );
         }
         
         oMount = {
            name: PROFILE_NAME,
            host: p.host,
            local: p.local
          };
          
         oConfig.mount[ PROFILE_NAME ] = oMount;
         
         storage.set( oConfig )
         .then(function( /* oConfig */ ){
            process.stderr.write( `${PROFILE_NAME} mounted in ${oMount.local}\n` );
         });
         

      });

   });
  };// /mount()

   var execp = function( cCommand ){

      return new Promise(function( resolve, reject ){
         exec( cCommand, function( err, stdout, stderr ){         
            resolve({
               err: err,
               stdout: stdout,
               stderr: stderr
            });
         } );
      });

   };// /execp()