'use strict';

var angular = require('angular');
var $sce = require('angular-sanitize');

angular.module('dashboard')
    .service('GithubStatusService', require('./github-status.service'));