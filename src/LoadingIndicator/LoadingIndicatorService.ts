/// <reference path="../../typings/tsd.d.ts" />

module AngularUIExtensions {

    "use strict";

    export interface ILoadingIndicatorService {
    
        startLoading(section: string) : void;    
        stopLoading(section: string): void;
    }

    export class LoadingIndicatorService implements ILoadingIndicatorService {
        
        public static $inject = ['$rootScope', LoadingIndicatorService];

        constructor(private $rootScope: ng.IScope) {
        }
        
        public startLoading(section: string): void {
            this.$rootScope.$broadcast('START-LOADING', section);
        }

        public stopLoading(section: string): void {
            this.$rootScope.$broadcast('STOP-LOADING', section);
        }
    }
}