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

//var Q = require( 'q' );
//var deferred = Q.defer();
const fs = require( 'fs' );
const path = require( 'path' );
const os = require( 'os' );
const APP_ROOT = path.resolve( __dirname, '..' );
const DIR_HOME = os.homedir();