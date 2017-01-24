webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    app.js:
	    Entry point for application
	*/

	angular.module('dashboard', []);

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(9);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(2);

	angular.module('dashboard')
	    .directive('yepNope', __webpack_require__(4));

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	/*
	    yep-nope.directive.js:
	    directive to update the status on the screen
	*/


	function YepNopeDirective() {
	  return {
	    restrict: 'E',
	    link: function (scope, element, attrs) {
	      scope.$watch(attrs.check, function (val) {
	        var words = val ? 'Yep' : 'Nope';
	        element.text(words);
	      });
	    }
	  }
	}

	// angular.module('dashboard').directive('yepNope', YepNopeDirective);

	module.exports = YepNopeDirective;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(2);
	var $sce = __webpack_require__(6);

	angular.module('dashboard')
	    .service('GithubStatusService', __webpack_require__(8));

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	/*
	    github-status-service.js:
	    Service layer for application
	*/


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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(2);

	angular.module('dashboard')
	    .controller('dashboardController', __webpack_require__(10));

/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
	    dashboard.controller.js:
	    application controller
	*/

	'use strict';

	DashboardController.$inject = ['GithubStatusService'];
	function DashboardController(gh) {
	    var _this = this;
	    _this.github = '';
	    gh.getStatus().then(function(status) {
	        _this.github = status;
	    });
	}

	// angular.module('dashboard').controller('dashboardController', DashboardController);

	module.exports = DashboardController;

/***/ }
]);