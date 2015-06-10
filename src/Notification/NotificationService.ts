/// <reference path="../../typings/tsd.d.ts" />

module UIExtensionsNotificationService {

    "use strict";

    interface IModalResolve {
        messages: () => string;
        title: () => string;
    }

    enum ModalSize {
        Small = <any>'sm',
        Medium = <any>'',
        Large = <any>'lg'
    }


    export interface INotificationService {
        showNotification(title: string, message: string, force?: boolean): ng.ui.bootstrap.IModalServiceInstance;    
    }
    
    class NotificationService implements INotificationService {

        public static $inject = [
            '$modal',
            NotificationService
        ];

        constructor(private $modal: ng.ui.bootstrap.IModalService) {
        }

        public showNotification(title: string, message: string, force?: boolean): ng.ui.bootstrap.IModalServiceInstance {
            var resolve: IModalResolve = {
                messages: () => {
                    return message;
                },
                title: () => {
                    return title;
                }
            };

            var modalSize: ModalSize = (message.length < 300) ? ModalSize.Small : (message.length > 1000) ? ModalSize.Large : ModalSize.Medium;

            var modalSettings: ng.ui.bootstrap.IModalSettings = {
                template: '<div class="modal-header"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><p ng-repeat="message in messages">{{message}}</p></div><div class="modal-footer"><button class="btn btn-action" ng-click="ok()">OK</button></div>',
                controller: 'notificationController',
                size: modalSize.toString(),
                resolve: resolve,
                backdrop: UIExtensionsHelpers.nullOrUndefined(force) ? true : (!force) ? true : 'static'
            };

            return this.$modal.open(modalSettings);
        }    
    }
    
    angular.module("UIExtensionsModule").service("NotificationService", NotificationService.$inject);
}