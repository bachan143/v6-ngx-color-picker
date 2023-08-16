import { Directive, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export class TextDirective {
    constructor() {
        this.newValue = new EventEmitter();
    }
    changeInput(value) {
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            let numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    }
}
TextDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: TextDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
TextDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.1", type: TextDirective, selector: "[text]", inputs: { text: "text", rg: "rg" }, outputs: { newValue: "newValue" }, host: { listeners: { "input": "changeInput($event.target.value)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: TextDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[text]',
                    host: {
                        '(input)': 'changeInput($event.target.value)'
                    }
                }]
        }], propDecorators: { newValue: [{
                type: Output,
                args: ['newValue']
            }], text: [{
                type: Input,
                args: ['text']
            }], rg: [{
                type: Input,
                args: ['rg']
            }] } });
export class SliderDirective {
    constructor(el) {
        this.el = el;
        this.newValue = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.listenerMove = (event) => { this.move(event); };
        this.listenerStop = () => { this.stop(); };
    }
    setCursor(event) {
        let height = this.el.nativeElement.offsetHeight;
        let width = this.el.nativeElement.offsetWidth;
        let x = Math.max(0, Math.min(this.getX(event), width));
        let y = Math.max(0, Math.min(this.getY(event), height));
        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
        }
        else if (this.rgX === undefined && this.rgY !== undefined) { //ready to use vertical sliders
            this.newValue.emit({ v: y / height, rg: this.rgY });
        }
        else {
            this.newValue.emit({ v: x / width, rg: this.rgX });
        }
    }
    move(event) {
        event.preventDefault();
        this.setCursor(event);
    }
    start(event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
        this.dragStart.emit();
    }
    stop() {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
        this.dragEnd.emit();
    }
    getX(event) {
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    }
    getY(event) {
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    }
}
SliderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: SliderDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
SliderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.1", type: SliderDirective, selector: "[slider]", inputs: { slider: "slider", rgX: "rgX", rgY: "rgY" }, outputs: { newValue: "newValue", dragStart: "dragStart", dragEnd: "dragEnd" }, host: { listeners: { "mousedown": "start($event)", "touchstart": "start($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: SliderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[slider]',
                    host: {
                        '(mousedown)': 'start($event)',
                        '(touchstart)': 'start($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { newValue: [{
                type: Output,
                args: ['newValue']
            }], dragStart: [{
                type: Output,
                args: ['dragStart']
            }], dragEnd: [{
                type: Output,
                args: ['dragEnd']
            }], slider: [{
                type: Input,
                args: ['slider']
            }], rgX: [{
                type: Input,
                args: ['rgX']
            }], rgY: [{
                type: Input,
                args: ['rgY']
            }] } });
export class SliderPosition {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
export class SliderDimension {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
export function detectIE() {
    let ua = '';
    if (typeof navigator !== "undefined") {
        ua = navigator.userAgent.toLowerCase();
    }
    const msie = ua.indexOf('msie ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    // other browser
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi9zcmMvbGliL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYyxNQUFNLGVBQWUsQ0FBQzs7QUFRbkYsTUFBTSxPQUFPLGFBQWE7SUFOMUI7UUFPd0IsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7S0FjMUQ7SUFWRyxXQUFXLENBQUMsS0FBYTtRQUNyQixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDSCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7SUFDTCxDQUFDOzswR0FkUSxhQUFhOzhGQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFOekIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsSUFBSSxFQUFFO3dCQUNGLFNBQVMsRUFBRSxrQ0FBa0M7cUJBQ2hEO2lCQUNKOzhCQUV1QixRQUFRO3NCQUEzQixNQUFNO3VCQUFDLFVBQVU7Z0JBQ0gsSUFBSTtzQkFBbEIsS0FBSzt1QkFBQyxNQUFNO2dCQUNBLEVBQUU7c0JBQWQsS0FBSzt1QkFBQyxJQUFJOztBQXFCZixNQUFNLE9BQU8sZUFB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LENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3BFO0lBRUQsZ0JBQWdCO0lBQ2hCLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3RleHRdJyxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnKGlucHV0KSc6ICdjaGFuZ2VJbnB1dCgkZXZlbnQudGFyZ2V0LnZhbHVlKSdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRleHREaXJlY3RpdmUge1xyXG4gICAgQE91dHB1dCgnbmV3VmFsdWUnKSBuZXdWYWx1ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQElucHV0KCd0ZXh0JykgdGV4dDogYW55O1xyXG4gICAgQElucHV0KCdyZycpIHJnOiBudW1iZXI7XHJcblxyXG4gICAgY2hhbmdlSW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnJnID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdWYWx1ZS5lbWl0KHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtZXJpYyA9IHBhcnNlRmxvYXQodmFsdWUpXHJcbiAgICAgICAgICAgIGlmICghaXNOYU4obnVtZXJpYykgJiYgbnVtZXJpYyA+PSAwICYmIG51bWVyaWMgPD0gdGhpcy5yZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdWYWx1ZS5lbWl0KHsgdjogbnVtZXJpYywgcmc6IHRoaXMucmcgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbc2xpZGVyXScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJyhtb3VzZWRvd24pJzogJ3N0YXJ0KCRldmVudCknLFxyXG4gICAgICAgICcodG91Y2hzdGFydCknOiAnc3RhcnQoJGV2ZW50KSdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICBAT3V0cHV0KCduZXdWYWx1ZScpIG5ld1ZhbHVlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCdkcmFnU3RhcnQnKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCdkcmFnRW5kJykgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBJbnB1dCgnc2xpZGVyJykgc2xpZGVyOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoJ3JnWCcpIHJnWDogbnVtYmVyO1xyXG4gICAgQElucHV0KCdyZ1knKSByZ1k6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbGlzdGVuZXJNb3ZlOiBhbnk7XHJcbiAgICBwcml2YXRlIGxpc3RlbmVyU3RvcDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyTW92ZSA9IChldmVudDogYW55KSA9PiB7IHRoaXMubW92ZShldmVudCkgfTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyU3RvcCA9ICgpID0+IHsgdGhpcy5zdG9wKCkgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJzb3IoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgICBsZXQgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuZ2V0WChldmVudCksIHdpZHRoKSk7XHJcbiAgICAgICAgbGV0IHkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmdldFkoZXZlbnQpLCBoZWlnaHQpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmdYICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZ1kgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5ld1ZhbHVlLmVtaXQoeyBzOiB4IC8gd2lkdGgsIHY6ICgxIC0geSAvIGhlaWdodCksIHJnWDogdGhpcy5yZ1gsIHJnWTogdGhpcy5yZ1kgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJnWCA9PT0gdW5kZWZpbmVkICYmIHRoaXMucmdZICE9PSB1bmRlZmluZWQpIHsvL3JlYWR5IHRvIHVzZSB2ZXJ0aWNhbCBzbGlkZXJzXHJcbiAgICAgICAgICAgIHRoaXMubmV3VmFsdWUuZW1pdCh7IHY6IHkgLyBoZWlnaHQsIHJnOiB0aGlzLnJnWSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5ld1ZhbHVlLmVtaXQoeyB2OiB4IC8gd2lkdGgsIHJnOiB0aGlzLnJnWCB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShldmVudDogYW55KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLnNldEN1cnNvcihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yKGV2ZW50KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmxpc3RlbmVyTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5saXN0ZW5lck1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmxpc3RlbmVyU3RvcCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmxpc3RlbmVyU3RvcCk7XHJcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQuZW1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5saXN0ZW5lck1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubGlzdGVuZXJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5saXN0ZW5lclN0b3ApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5saXN0ZW5lclN0b3ApO1xyXG4gICAgICAgIHRoaXMuZHJhZ0VuZC5lbWl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WChldmVudDogYW55KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKGV2ZW50LnBhZ2VYICE9PSB1bmRlZmluZWQgPyBldmVudC5wYWdlWCA6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgpIC0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB3aW5kb3cucGFnZVhPZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBnZXRZKGV2ZW50OiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoZXZlbnQucGFnZVkgIT09IHVuZGVmaW5lZCA/IGV2ZW50LnBhZ2VZIDogZXZlbnQudG91Y2hlc1swXS5wYWdlWSkgLSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVyUG9zaXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBoOiBudW1iZXIsIHB1YmxpYyBzOiBudW1iZXIsIHB1YmxpYyB2OiBudW1iZXIsIHB1YmxpYyBhOiBudW1iZXIpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVyRGltZW5zaW9uIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaDogbnVtYmVyLCBwdWJsaWMgczogbnVtYmVyLCBwdWJsaWMgdjogbnVtYmVyLCBwdWJsaWMgYTogbnVtYmVyKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdElFKCkge1xyXG4gIGxldCB1YSA9ICcnO1xyXG5cclxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtc2llID0gdWEuaW5kZXhPZignbXNpZSAnKTtcclxuXHJcbiAgaWYgKG1zaWUgPiAwKSB7XHJcbiAgICAvLyBJRSAxMCBvciBvbGRlciA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcclxuICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoJy4nLCBtc2llKSksIDEwKTtcclxuICB9XHJcblxyXG4gIC8vIG90aGVyIGJyb3dzZXJcclxuICByZXR1cm4gZmFsc2U7XHJcbn0iXX0=