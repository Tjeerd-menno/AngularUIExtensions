/// <reference path="typings/tsd.d.ts" />

module UIExtensions {

    "use strict";

    var uiExtensionsModule : ng.IModule = angular.module("UIExtensionsModule", ["ngAnimate", "ngRoute"]);

    uiExtensionsModule.controller("NotificationController", NotificationController.$inject);
    uiExtensionsModule.service("NotificationService", NotificationService.$inject);
}

