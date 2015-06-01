/// <reference path="../../typings/tsd.d.ts" />

module UIExtensions {
    
	'use strict';
    export interface IHttpStatusCode {
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
        
        public static $inject = [ "$q",
        "HTTP_STATUS_CODES",
        "$injector",
        "$window",
        HttpInterceptorFactory ];
        
        constructor ($q: ng.IQService, httpStatusCode: IHttpStatusCode, $injector : any){

            return {
                responseError: (response : any) => {
                    var status: number = response.status;
                    var message: string = response.data.Message; 
                    
                    var notificationService: INotificationService = $injector.get('NotificationService');
                    var windowService: ng.IWindowService = $injector.get('$window');

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
    }

    angular.module("UIExtensionsModule").factory("HttpInterceptorFactory", HttpInterceptorFactory.$inject);
}