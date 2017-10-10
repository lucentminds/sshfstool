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
const parseArgs = require( 'minimist' );
const args = module.exports = parseArgs( process.argv, { // jshint ignore:line
   alias: {
      'h': 'help'
   },
   string: [
      'help'
   ]
   // 'default': {
   //    help: 'index'
   // }
} );
