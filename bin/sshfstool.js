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
const path = require( 'path' );
const APP_ROOT = path.resolve( __dirname, '..' );
const ARGS = require( APP_ROOT+'/lib/args' );
const help = require( APP_ROOT+'/lib/help' );
const storage = require( APP_ROOT+'/lib/storage' );
const COMMAND = ARGS._[ 2 ];
const PROFILE = ARGS._[ 3 ];
var CONFIG = null;
var COMMANDS = 'mount unmount add update remove';

if( ARGS.debug ) {
   console.log( ARGS );
}
//console.log( '\nCOMMAND', COMMAND, '\n' );

if( ( ARGS.h || ARGS.help ) && COMMANDS.indexOf( COMMAND ) == -1 ) {
   (function(){
      var helpSubject, cHelpText;
   
      helpSubject = ARGS.h || ARGS.help;
      if( !helpSubject ){
         return;
      }

      cHelpText = help.load( helpSubject );
      process.stdout.write( cHelpText+'\n' );
      process.exit( 0 );
   
   }());

}// /if()

storage.get()
.then(function( oConfig ){
   CONFIG = oConfig;

   if( !COMMAND ) {
      process.stderr.write( help.load( 'index' )+'\n' );
      process.exit( 1 );    
   }

   switch( COMMAND ) {
   case 'mount':
      require( APP_ROOT+'/lib/command_mount' )( PROFILE );
      break;

   case 'umount':
      require( APP_ROOT+'/lib/command_umount' )( PROFILE );
      break;
  
   case 'list':
      require( APP_ROOT+'/lib/command_list' )();
      break;
  
   case 'status':
      require( APP_ROOT+'/lib/command_status' )();
      break;

   case 'info':
      require( APP_ROOT+'/lib/command_info' )();
      break;

   case 'add':
      require( APP_ROOT+'/lib/command_add' )();
      break;

   case 'update':
      require( APP_ROOT+'/lib/command_update' )();
      break;

   case 'remove':
      require( APP_ROOT+'/lib/command_remove' )();
      break;

   default:
      process.stderr.write( `Invalid command: ${COMMAND}\n` );
      process.exit( 1 );
   }// /switch()
});
