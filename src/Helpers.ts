module UIExtensionsHelpers {

    "use strict";

    export function nullOrUndefined(obj: any): boolean {
        return (obj === null || obj === undefined);
    }

    export function padLeft(nr: number, count: number): string {
        return Array(count - String(nr).length + 1).join('0') + nr;
    }

}
 