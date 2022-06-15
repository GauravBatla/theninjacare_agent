import { ErrorHandler } from "@angular/core";

export class Error{
    message: string = '';
    statusCode: number;
    constructor(error: object, errorCode: number){
        this.statusCode = errorCode;
        this.parseErrorMessage(error);
    };
    private parseErrorMessage(error){
        console.log("Error : ", error, typeof(error.error));
        if(error.message){
            this.message = error.message;
        }else if(typeof(error.error) === 'object'){
            for (const key in error.error) {
                if (Object.prototype.hasOwnProperty.call(error.error, key)) {
                    this.message+=error.error[key]+'<br>';
                    console.log(key);
                }
            }
        }else if(typeof(error.error) === 'string'){
            this.message = error.error;
        }else if(error.errors && error.errors.length){
            error.errors.forEach(err => {
                this.message+=err;
            });
        }
    }
}