/* *****************************
    github-status-service.js:
    Service layer for application
* ******************************/

'use strict';

GithubStatusService.$inject = ['$http', '$sce'];
function GithubStatusService($http, $sce) {
    var _this = this;
    _this.getStatus = function getStatus() {
        return $http({
            method: 'jsonp',
            url:  $sce.trustAsResourceUrl('https://status.github.com/api/status.json'),
            transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
                return (value.status === 'good');
            })
        });
    }
}

// angular.module('dashboard').service('GithubStatusService', GithubStatusService);

function appendTransform(defaults, transform) {
  defaults = angular.isArray(defaults) ? defaults : [defaults];
  return defaults.concat(transform);
}

module.exports = GithubStatusService;