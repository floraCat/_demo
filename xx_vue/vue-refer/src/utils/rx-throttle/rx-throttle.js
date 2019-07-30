/*
* 节流
* 创建并返回一个像节流阀一样的函数，
* 当重复调用函数的时候，最多每隔指定的wait毫秒调用一次该函数；
* 不允许方法在每wait ms间执行超过一次！
* */
import {Subject} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

export class ThrottleTimeFn {
  constructor(time) {
    this.subject = new Subject();
    this.throttleTime = time || 200;
    this.subscription = null;
  }

  next(arg) {
    this.subject.next(arg);
  }

  subscribe(callback) {
    this.subscription = this.subject.asObservable()
      .pipe(
        throttleTime(this.throttleTime),
      )
      .subscribe(callback);
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
