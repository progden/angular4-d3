import { Injectable } from '@angular/core';
import {Graph} from './d3-force-dragging-i/model/Graph';
import * as d3 from 'd3';

@Injectable()
export class DataService {
  constructor() {
    d3.promise = this.factory(d3);
  }

  getMiserable(): Promise<Graph> {
    return d3.promise.json('assets/data/miserable.json');
  }

  getEnergy(): Promise<Graph> {
    return d3.promise.json('assets/data/energy.json');
  }

  private factory(d3) {
    'use strict';
    function promisify(caller, fn) {
      return function () {
        const _len = arguments.length, args = Array(_len);
        let _key = 0
        for (; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
          const callback = function callback(error, data) {
            if (error) {
              reject(Error(error));
              return;
            }
            resolve(data);
          };
          fn.apply(caller, args.concat(callback));
        });
      };
    }

    const module$1 = {};
    ['csv', 'tsv', 'json', 'xml', 'text', 'html'].forEach(function (fnName) {
      module$1[fnName] = promisify(d3, d3[fnName]);
    });
    return module$1;
  }
}
