/// <reference path="c:/Projects/Git/DFZ.Web.Packages.AngularUIExtensions/typings/tsd.d.ts" />
declare module UIExtensions {
    function nullOrUndefined(obj: any): boolean;
    function padLeft(nr: number, count: number): string;
}
declare module UIExtensions {
    interface INotificationService {
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
}
declare module UIExtensions {
    interface ILoadingIndicatorService {
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
}
declare module UIExtensions {
}
