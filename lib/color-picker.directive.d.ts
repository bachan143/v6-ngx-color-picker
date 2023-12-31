import { OnInit, OnChanges, EventEmitter, Injector, ApplicationRef, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ColorPickerService } from './color-picker.service';
import * as i0 from "@angular/core";
export declare class ColorPickerDirective implements OnInit, OnChanges, OnDestroy {
    private injector;
    private cfr;
    private appRef;
    private vcRef;
    private elRef;
    private service;
    colorPicker: string;
    cpToggle: boolean;
    cpPosition: string;
    cpPositionOffset: string;
    cpPositionRelativeToArrow: boolean;
    cpOutputFormat: string;
    cpPresetLabel: string;
    cpPresetEmptyMessage: string;
    cpPresetEmptyMessageClass: string;
    cpPresetColors: Array<string>;
    cpMaxPresetColorsLength: number;
    cpCancelButton: boolean;
    cpCancelButtonClass: string;
    cpCancelButtonText: string;
    cpOKButton: boolean;
    cpOKButtonClass: string;
    cpOKButtonText: string;
    cpAddColorButton: boolean;
    cpAddColorButtonClass: string;
    cpAddColorButtonText: string;
    cpRemoveColorButtonClass: string;
    cpFallbackColor: string;
    cpHeight: string;
    cpWidth: string;
    cpIgnoredElements: any;
    cpDialogDisplay: string;
    cpSaveClickOutside: boolean;
    cpAlphaChannel: string;
    cpUseRootViewContainer: boolean;
    headerName: string;
    saveBtnTxt: string;
    cancelBtnTxt: string;
    cpInputChange: EventEmitter<any>;
    cpToggleChange: EventEmitter<boolean>;
    cpSliderChange: EventEmitter<any>;
    cpSliderDragEnd: EventEmitter<string>;
    cpSliderDragStart: EventEmitter<string>;
    colorPickerCancel: EventEmitter<string>;
    colorPickerSelect: EventEmitter<string>;
    colorPickerChange: EventEmitter<string>;
    presetColorsChange: EventEmitter<any>;
    private dialog;
    private created;
    private ignoreChanges;
    private cmpRef;
    constructor(injector: Injector, cfr: ComponentFactoryResolver, appRef: ApplicationRef, vcRef: ViewContainerRef, elRef: ElementRef, service: ColorPickerService);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    openDialog(): void;
    toggle(value: boolean): void;
    colorChanged(value: string, ignore?: boolean): void;
    colorCanceled(): void;
    colorSelected(value: string): void;
    presetColorsChanged(value: Array<any>): void;
    inputFocus(): void;
    inputChange(value: string): void;
    inputChanged(event: any): void;
    sliderChanged(event: any): void;
    sliderDragEnd(event: any): void;
    sliderDragStart(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColorPickerDirective, "[colorPicker]", never, { "colorPicker": "colorPicker"; "cpToggle": "cpToggle"; "cpPosition": "cpPosition"; "cpPositionOffset": "cpPositionOffset"; "cpPositionRelativeToArrow": "cpPositionRelativeToArrow"; "cpOutputFormat": "cpOutputFormat"; "cpPresetLabel": "cpPresetLabel"; "cpPresetEmptyMessage": "cpPresetEmptyMessage"; "cpPresetEmptyMessageClass": "cpPresetEmptyMessageClass"; "cpPresetColors": "cpPresetColors"; "cpMaxPresetColorsLength": "cpMaxPresetColorsLength"; "cpCancelButton": "cpCancelButton"; "cpCancelButtonClass": "cpCancelButtonClass"; "cpCancelButtonText": "cpCancelButtonText"; "cpOKButton": "cpOKButton"; "cpOKButtonClass": "cpOKButtonClass"; "cpOKButtonText": "cpOKButtonText"; "cpAddColorButton": "cpAddColorButton"; "cpAddColorButtonClass": "cpAddColorButtonClass"; "cpAddColorButtonText": "cpAddColorButtonText"; "cpRemoveColorButtonClass": "cpRemoveColorButtonClass"; "cpFallbackColor": "cpFallbackColor"; "cpHeight": "cpHeight"; "cpWidth": "cpWidth"; "cpIgnoredElements": "cpIgnoredElements"; "cpDialogDisplay": "cpDialogDisplay"; "cpSaveClickOutside": "cpSaveClickOutside"; "cpAlphaChannel": "cpAlphaChannel"; "cpUseRootViewContainer": "cpUseRootViewContainer"; "headerName": "headerName"; "saveBtnTxt": "saveBtnTxt"; "cancelBtnTxt": "cancelBtnTxt"; }, { "cpInputChange": "cpInputChange"; "cpToggleChange": "cpToggleChange"; "cpSliderChange": "cpSliderChange"; "cpSliderDragEnd": "cpSliderDragEnd"; "cpSliderDragStart": "cpSliderDragStart"; "colorPickerCancel": "colorPickerCancel"; "colorPickerSelect": "colorPickerSelect"; "colorPickerChange": "colorPickerChange"; "presetColorsChange": "cpPresetColorsChange"; }, never>;
}
