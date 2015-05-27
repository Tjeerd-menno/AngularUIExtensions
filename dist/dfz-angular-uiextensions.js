var UIExtensions;
(function (UIExtensions) {
    "use strict";
    function nullOrUndefined(obj) {
        return (obj === null || obj === undefined);
    }
    UIExtensions.nullOrUndefined = nullOrUndefined;
    function padLeft(nr, count) {
        return Array(count - String(nr).length + 1).join('0') + nr;
    }
    UIExtensions.padLeft = padLeft;
})(UIExtensions || (UIExtensions = {}));
/// <reference path="../typings/tsd.d.ts" />
var UIExtensions;
(function (UIExtensions) {
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
                backdrop: UIExtensions.nullOrUndefined(force) ? true : (!force) ? true : 'static'
            };
            return this.$modal.open(modalSettings);
        };
        NotificationService.$inject = [
            '$modal',
            NotificationService
        ];
        return NotificationService;
    })();
    UIExtensions.NotificationService = NotificationService;
})(UIExtensions || (UIExtensions = {}));
/// <reference path="../typings/tsd.d.ts" />
var UIExtensions;
(function (UIExtensions) {
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
    UIExtensions.NotificationController = NotificationController;
})(UIExtensions || (UIExtensions = {}));
/// <reference path="typings/tsd.d.ts" />
var UIExtensions;
(function (UIExtensions) {
    "use strict";
    var uiExtensionsModule = angular.module("UIExtensionsModule", ["ngAnimate", "ngRoute"]);
    uiExtensionsModule.controller("NotificationController", UIExtensions.NotificationController.$inject);
    uiExtensionsModule.service("NotificationService", UIExtensions.NotificationService.$inject);
})(UIExtensions || (UIExtensions = {}));
//# sourceMappingURL=dfz-angular-uiextensions.js.map