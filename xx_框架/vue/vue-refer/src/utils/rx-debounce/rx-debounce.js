/*
* 防抖
* 创建并返回函数的防反跳版本，将延迟函数的执行（真正的执行）在函数最后一次调用时刻的wait毫秒之后，
* 对于必须在一些输入（多是一些用户操作）停止之后再执行的行为有帮助。将一个连续的调用归为一个！
* */
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

export class DebounceTimeFn {
    constructor(time) {
        this.subject = new Subject();
        this.debounceTime = time || 200;
        this.subscription = null;
    }

    next(arg) {
        this.subject.next(arg);
    }

    subscribe(callback) {
        this.subscription = this.subject.asObservable()
            .pipe(
                debounceTime(this.debounceTime),
            )
            .subscribe(callback);
    }

    unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
