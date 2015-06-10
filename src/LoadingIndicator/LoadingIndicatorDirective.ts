
module AngularUIExtensions {
    "use strict";

    declare var DFZ: any;

    export interface ILoadingIndicatorScope extends ng.IScope {
        filter: string;
    }

    export class LoadingIndicatorDirective implements ng.IDirective {

        public replace: boolean;
        public scope : ILoadingIndicatorScope;
        public link: ($scope: ILoadingIndicatorScope, element: JQuery, attributes: any) => any;

        public Injection(): any[] {
            return [() => { return new LoadingIndicatorDirective(); }];
        }

        constructor() {
            this.replace = false;
            this.link = (scope, element, attributes) => this.linkFn(scope, element, attributes);

            this.scope.filter =  '@loadingIndicator';
        }

        /*
        * @param scope : ng.IScope
        * @param element : JQuery
        * @param attributes : any
        */
        public linkFn(scope: ILoadingIndicatorScope, element: JQuery, attributes: any) {
            var localScope: ILoadingIndicatorScope = scope;

            scope.$on('START-LOADING', (e: any, filterValue: string) => {
                var filter: string = localScope.filter;

                if (filter === filterValue) {
                    LoadingIndicatorDirective.startLoading(localScope, element);
                }
            });

            scope.$on('STOP-LOADING', (e: any, filterValue: string) => {
                var filter: string = localScope.filter;

                if (filter === filterValue) {
                    this.stopLoading(localScope, element);
                }
            });
        }

        /**
        * Functie voor het starten van de spinner
        * @param scope : ng.IScope
        * @param element : JQuery
        */
        static startLoading(scope: ng.IScope, element: JQuery): any {
            DFZ.StartLoadingPanel(element[0]);
        }

        /**
        * Functie voor het stoppen van de spinner
        * @param scope : ng.IScope
        * @param element : JQuery
        */
        private stopLoading(scope: ILoadingIndicatorScope, element: JQuery): void {
            DFZ.StopLoadingPanel(element[0]);
        }
    }
}

