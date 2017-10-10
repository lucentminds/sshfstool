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
const profile = module.exports = { // jshint ignore:line
   isBad: function( oProfile ) {
      var aErrors = [];

      if( !oProfile.name ) {
         return 'name is missing or invalid.';
      }
      
      if( !oProfile.user ) {
         return 'user is missing or invalid.';
      }

      if( !oProfile.host ) {
         return 'host is missing or invalid.';
      }

      if( !oProfile.local ) {
         return 'local mount path is missing or invalid.';
      }

      return '';

   }// /isBad()
};
