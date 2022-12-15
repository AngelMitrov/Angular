import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";

export class CustomValidators {
    static forbiddenProjectNames: string[] = ['Test'];
    static forbiddenAsyncProjectNames: string[] = ['TestAsync'];

    static forbidProjectNames(control: FormControl): { [key: string]: boolean } {
        if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
            return { 'forbiddenProjectName': true }
        };
        return null;
    };

    static asyncForbidProjectNamesAsync(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((res, rej) => {
            setTimeout(() => {
                if (this.forbiddenAsyncProjectNames.indexOf(control.value) !== -1) {
                    res({ 'forbiddenProjectName': true })
                } else {
                    res(null)
                }
            }, 2000)
        });
        return promise;
    };
}