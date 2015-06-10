var AngularUIExtensions;
(function (AngularUIExtensions) {
    "use strict";
    function nullOrUndefined(obj) {
        return (obj === null || obj === undefined);
    }
    AngularUIExtensions.nullOrUndefined = nullOrUndefined;
    function padLeft(nr, count) {
        return Array(count - String(nr).length + 1).join('0') + nr;
    }
    AngularUIExtensions.padLeft = padLeft;
})(AngularUIExtensions || (AngularUIExtensions = {}));
var AngularUIExtensions;
(function (AngularUIExtensions) {
    "use strict";
    var ModalSize;
    (function (ModalSize) {
        ModalSize[ModalSize["Small"] = 'sm'] = "Small";
        ModalSize[ModalSize["Medium"] = ''] = "Medium";
        ModalSize[ModalSize["Large"] = 'lg'] = "Large";
    })(ModalSize || (ModalSize = {}));
    var NotificationService = (function () {
        function NotificationService($modal) {
            this.$modal = $modal;
        }
        NotificationService.prototype.showNotification = function (title, message, force) {
            var resolve = {
                messages: function () {
                    return message;
                },
                title: function () {
                    return title;
                }
            };
            var modalSize = (message.length < 300) ? ModalSize.Small : (message.length > 1000) ? ModalSize.Large : ModalSize.Medium;
            var modalSettings = {
                template: '<div class="modal-header"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><p ng-repeat="message in messages">{{message}}</p></div><div class="modal-footer"><button class="btn btn-action" ng-click="ok()">OK</button></div>',
                controller: 'notificationController',
                size: modalSize.toString(),
                resolve: resolve,
                backdrop: AngularUIExtensions.nullOrUndefined(force) ? true : (!force) ? true : 'static'
            };
            return this.$modal.open(modalSettings);
        };
        NotificationService.$inject = [
            '$modal',
            NotificationService
        ];
        return NotificationService;
    })();
    AngularUIExtensions.NotificationService = NotificationService;
})(AngularUIExtensions || (AngularUIExtensions = {}));
var AngularUIExtensions;
(function (AngularUIExtensions) {
    'use strict';
    var NotificationController = (function () {
        function NotificationController($scope, $location, $modalInstance, messages, title) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$modalInstance = $modalInstance;
            this.messages = messages;
            this.title = title;
            this.$scope.title = title;
            this.$scope.ok = function () { return _this.ok(); };
            this.$scope.cancel = function () { return _this.cancel(); };
            if (messages.indexOf('|') !== -1) {
                this.$scope.messages = messages.split('|');
            }
            else {
                this.$scope.messages = [messages];
            }
            this.$scope.$on('$routeChangeStart', function () {
                _this.$modalInstance.dismiss('dismiss on route change');
            });
        }
        NotificationController.prototype.ok = function () {
            this.$modalInstance.close();
        };
        NotificationController.prototype.cancel = function () {
            this.$modalInstance.dismiss('cancel');
        };
        NotificationController.$inject = [
            '$scope',
            '$location',
            '$modalInstance',
            'messages',
            'title',
            NotificationController
        ];
        return NotificationController;
    })();
    AngularUIExtensions.NotificationController = NotificationController;
})(AngularUIExtensions || (AngularUIExtensions = {}));
var AngularUIExtensions;
(function (AngularUIExtensions) {
    "use strict";
    var LoadingIndicatorService = (function () {
        function LoadingIndicatorService($rootScope) {
            this.$rootScope = $rootScope;
        }
        LoadingIndicatorService.prototype.startLoading = function (section) {
            this.$rootScope.$broadcast('START-LOADING', section);
        };
        LoadingIndicatorService.prototype.stopLoading = function (section) {
            this.$rootScope.$broadcast('STOP-LOADING', section);
        };
        LoadingIndicatorService.$inject = ['$rootScope', LoadingIndicatorService];
        return LoadingIndicatorService;
    })();
    AngularUIExtensions.LoadingIndicatorService = LoadingIndicatorService;
})(AngularUIExtensions || (AngularUIExtensions = {}));
var AngularUIExtensions;
(function (AngularUIExtensions) {
    "use strict";
    var LoadingIndicatorDirective = (function () {
        function LoadingIndicatorDirective() {
            var _this = this;
            this.replace = false;
            this.link = function (scope, element, attributes) { return _this.linkFn(scope, element, attributes); };
            this.scope.filter = '@loadingIndicator';
        }
        LoadingIndicatorDirective.prototype.Injection = function () {
            return [function () {
                return new LoadingIndicatorDirective();
            }];
        };
        LoadingIndicatorDirective.prototype.linkFn = function (scope, element, attributes) {
            var _this = this;
            var localScope = scope;
            scope.$on('START-LOADING', function (e, filterValue) {
                var filter = localScope.filter;
                if (filter === filterValue) {
                    LoadingIndicatorDirective.startLoading(localScope, element);
                }
            });
            scope.$on('STOP-LOADING', function (e, filterValue) {
                var filter = localScope.filter;
                if (filter === filterValue) {
                    _this.stopLoading(localScope, element);
                }
            });
        };
        LoadingIndicatorDirective.startLoading = function (scope, element) {
            DFZ.StartLoadingPanel(element[0]);
        };
        LoadingIndicatorDirective.prototype.stopLoading = function (scope, element) {
            DFZ.StopLoadingPanel(element[0]);
        };
        return LoadingIndicatorDirective;
    })();
    AngularUIExtensions.LoadingIndicatorDirective = LoadingIndicatorDirective;
})(AngularUIExtensions || (AngularUIExtensions = {}));
var AngularUIExtensions;
(function (AngularUIExtensions) {
    'use strict';
    var HttpInterceptorFactory = (function () {
        function HttpInterceptorFactory($q, httpStatusCode, $injector) {
            return {
                responseError: function (response) {
                    var status = response.status;
                    var message = response.data.Message;
                    var notificationService = $injector.get('NotificationService');
                    var windowService = $injector.get('$window');
                    switch (status) {
                        case httpStatusCode.INTERNAL_SERVER_ERROR:
                            notificationService.showNotification('Er ging iets fout', message);
                            break;
                        case httpStatusCode.BAD_REQUEST:
                            notificationService.showNotification('Ongeldige invoer', message);
                            break;
                        case httpStatusCode.FORBIDDEN:
                            var data = angular.fromJson(response.data);
                            if (data !== undefined && data !== null && data.LogOnUrl !== undefined) {
                                windowService.location.href = data.LogOnUrl;
                            }
                            break;
                        default:
                            break;
                    }
                    return $q.reject(response);
                }
            };
        }
        HttpInterceptorFactory.$inject = ["$q", "HTTP_STATUS_CODES", "$injector", "$window", HttpInterceptorFactory];
        return HttpInterceptorFactory;
    })();
    AngularUIExtensions.HttpInterceptorFactory = HttpInterceptorFactory;
})(AngularUIExtensions || (AngularUIExtensions = {}));
(function () {
    var uiExtensionsModule = angular.module("UIExtensionsModule", ['ui.bootstrap']);
    uiExtensionsModule.service("NotificationService", AngularUIExtensions.NotificationService.$inject);
    uiExtensionsModule.controller("NotificationController", AngularUIExtensions.NotificationController.$inject);
    uiExtensionsModule.service("LoadingIndicatorService", AngularUIExtensions.LoadingIndicatorService.$inject);
    uiExtensionsModule.directive("LoadingIndicatorDirective", AngularUIExtensions.LoadingIndicatorDirective.prototype.Injection());
    uiExtensionsModule.factory("HttpInterceptorFactory", AngularUIExtensions.HttpInterceptorFactory.$inject);
})();
