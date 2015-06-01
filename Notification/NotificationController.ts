/// <reference path="../typings/tsd.d.ts" />

module UIExtensions {
    'use strict';

    export interface INotificationScope extends ng.IScope {
        title: string;
        messages: string[];
        ok: Function;
        cancel: Function;
    }

    class NotificationController {

        public static $inject = [
            '$scope',
            '$location',
            '$modalInstance',
            'messages',
            'title',
            NotificationController
        ];

        constructor(
            private $scope: INotificationScope,
            private $location: ng.ILocationService,
            private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private messages: string,
            private title: string
            ) {
            this.$scope.title = title;
            this.$scope.ok = () => this.ok();
            this.$scope.cancel = () => this.cancel();
            if (messages.indexOf('|') !== -1) {
                this.$scope.messages = messages.split('|');
            } else {
                this.$scope.messages = [messages];
            }


            this.$scope.$on('$routeChangeStart', () => {
                this.$modalInstance.dismiss('dismiss on route change');
            });
        }

        private ok() {
            this.$modalInstance.close();
        }

        private cancel() {
            this.$modalInstance.dismiss('cancel');
        }
    }
    
        angular.module("UIExtensionsModule").controller("NotificationController", NotificationController.$inject);

}