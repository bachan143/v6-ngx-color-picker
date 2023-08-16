import { EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TextDirective {
    newValue: EventEmitter<any>;
    text: any;
    rg: number;
    changeInput(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TextDirective, "[text]", never, { "text": "text"; "rg": "rg"; }, { "newValue": "newValue"; }, never>;
}
export declare class SliderDirective {
    private el;
    newValue: EventEmitter<any>;
    dragStart: EventEmitter<any>;
    dragEnd: EventEmitter<any>;
    slider: string;
    rgX: number;
    rgY: number;
    private listenerMove;
    private listenerStop;
    constructor(el: ElementRef);
    setCursor(event: any): void;
    move(event: any): void;
    start(event: any): void;
    stop(): void;
    getX(event: any): number;
    getY(event: any): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SliderDirective, "[slider]", never, { "slider": "slider"; "rgX": "rgX"; "rgY": "rgY"; }, { "newValue": "newValue"; "dragStart": "dragStart"; "dragEnd": "dragEnd"; }, never>;
}
export declare class SliderPosition {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class SliderDimension {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare function detectIE(): number | false;
