/// <reference path="../typings/tsd.d.ts" />

((): void=> {
    var uiExtensionsModule = angular.module("UIExtensionsModule", ['ui.bootstrap']);
    
    uiExtensionsModule.service("NotificationService", AngularUIExtensions.NotificationService.$inject);
    uiExtensionsModule.controller("NotificationController", AngularUIExtensions.NotificationController.$inject);
    uiExtensionsModule.service("LoadingIndicatorService", AngularUIExtensions.LoadingIndicatorService.$inject);
    uiExtensionsModule.directive("loadingIndicator", AngularUIExtensions.LoadingIndicatorDirective.prototype.Injection())
    uiExtensionsModule.factory("HttpInterceptorFactory", AngularUIExtensions.HttpInterceptorFactory.$inject);
    
})() 

