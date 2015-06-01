/// <reference path="c:/Projects/Git/DFZ.Web.Packages.AngularUIExtensions/typings/tsd.d.ts" />
declare module UIExtensions {
    function nullOrUndefined(obj: any): boolean;
    function padLeft(nr: number, count: number): string;
}
declare module UIExtensions {
    interface INotificationService {
        showNotification(title: string, message: string, force?: boolean): ng.ui.bootstrap.IModalServiceInstance;
    }
    class NotificationService implements INotificationService {
        private $modal;
        static $inject: (string | typeof NotificationService)[];
        constructor($modal: ng.ui.bootstrap.IModalService);
        showNotification(title: string, message: string, force?: boolean): ng.ui.bootstrap.IModalServiceInstance;
    }
}
declare module UIExtensions {
    interface INotificationScope extends ng.IScope {
        title: string;
        messages: string[];
        ok: Function;
        cancel: Function;
    }
    class NotificationController {
        private $scope;
        private $location;
        private $modalInstance;
        private messages;
        private title;
        static $inject: (string | typeof NotificationController)[];
        constructor($scope: INotificationScope, $location: ng.ILocationService, $modalInstance: ng.ui.bootstrap.IModalServiceInstance, messages: string, title: string);
        private ok();
        private cancel();
    }
}
declare module UIExtensions {
    interface ILoadingIndicatorService {
        startLoading(section: string): void;
        stopLoading(section: string): void;
    }
    class LoadingIndicatorService implements ILoadingIndicatorService {
        private $rootScope;
        static $inject: (string | typeof LoadingIndicatorService)[];
        constructor($rootScope: ng.IScope);
        startLoading(section: string): void;
        stopLoading(section: string): void;
    }
}
declare module UIExtensions {
    interface IHttpStatusCode {
        OK: number;
        CREATED: number;
        ACCEPTED: number;
        BAD_REQUEST: number;
        UNAUTHORIZED: number;
        FORBIDDEN: number;
        NOT_FOUND: number;
        INTERNAL_SERVER_ERROR: number;
    }
    class HttpInterceptorFactory {
        static $inject: (string | typeof HttpInterceptorFactory)[];
        constructor($q: ng.IQService, httpStatusCode: IHttpStatusCode, $injector: any);
    }
}
declare module UIExtensions {
}
