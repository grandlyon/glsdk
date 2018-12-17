/* tslint:disable */
import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module JSONSearchParams
* @license MIT
* @description
* JSON Parser and Wrapper for the Angular2 URLSearchParams
* This module correctly encodes a json object into a query string and then creates
* an instance of the URLSearchParams component for later use in HTTP Calls
**/
@Injectable()
export class JSONSearchParams {

    private _usp: HttpParams;

    public setJSON(obj: any) {
        this._usp = this._JSON2URL(obj, false);
    }

    public getURLSearchParams(): HttpParams {
        return this._usp;
    }

    private _JSON2URL(obj: any, parent: any) {
        let params: HttpParams=new HttpParams();
        for (let key in obj)
        params.set(key, obj[key]);
        return params;
    }

    private _parseParam(key: string, value: any, parent: string) {
        let processedKey = parent ? parent + '[' + key + ']' : key;
        if (value && (<string>(typeof value) === 'object' || Array.isArray(value))) {
            return this._JSON2URL(value, processedKey);
        }
        return processedKey + '=' + value;
    }
}
