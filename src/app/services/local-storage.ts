import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    prefix = 'default';

    public setItem(key, value): void {
        key = this.prefix + '.' + key;
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key): any {
        key = this.prefix + '.' + key;
        return JSON.parse(localStorage.getItem(key));
    }

    public setPrefix(prefix) {
        this.prefix = prefix;
    }
}
