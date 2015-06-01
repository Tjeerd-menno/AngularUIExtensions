/// <reference path="typings/tsd.d.ts" />

module UIExtensions {

    "use strict";

    var uiExtensionsModule : ng.IModule = angular.module("UIExtensionsModule", ["ui.bootstrap"]);

    uiExtensionsModule.controller("NotificationController", NotificationController.$inject);
    uiExtensionsModule.service("NotificationService", NotificationService.$inject);
    uiExtensionsModule.service("LoadingIndicatorService", LoadingIndicatorService.$inject);
    uiExtensionsModule.factory("HttpInterceptorFactory", HttpInterceptorFactory.$inject);
}

