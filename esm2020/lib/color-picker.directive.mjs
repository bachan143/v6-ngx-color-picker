import { Directive, Input, Output, EventEmitter, ReflectiveInjector } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';
import * as i0 from "@angular/core";
import * as i1 from "./color-picker.service";
export class ColorPickerDirective {
    constructor(injector, cfr, appRef, vcRef, elRef, service) {
        this.injector = injector;
        this.cfr = cfr;
        this.appRef = appRef;
        this.vcRef = vcRef;
        this.elRef = elRef;
        this.service = service;
        this.cpPosition = 'right';
        this.cpPositionOffset = '0%';
        this.cpPositionRelativeToArrow = false;
        this.cpOutputFormat = 'hex';
        this.cpPresetLabel = 'Preset colors';
        this.cpPresetEmptyMessage = 'No colors added';
        this.cpPresetEmptyMessageClass = 'preset-empty-message';
        this.cpMaxPresetColorsLength = 6;
        this.cpCancelButton = false;
        this.cpCancelButtonClass = 'cp-cancel-button-class';
        this.cpCancelButtonText = 'Cancel';
        this.cpOKButton = false;
        this.cpOKButtonClass = 'cp-ok-button-class';
        this.cpOKButtonText = 'OK';
        this.cpAddColorButton = false;
        this.cpAddColorButtonClass = 'cp-add-color-button-class';
        this.cpAddColorButtonText = 'Add color';
        this.cpRemoveColorButtonClass = 'cp-remove-color-button-class';
        this.cpFallbackColor = '#fff';
        this.cpHeight = 'auto';
        this.cpWidth = '272px';
        this.cpIgnoredElements = [];
        this.cpDialogDisplay = 'popup';
        this.cpSaveClickOutside = true;
        this.cpAlphaChannel = 'enabled';
        this.cpUseRootViewContainer = false;
        this.headerName = 'Edit Color';
        this.saveBtnTxt = 'Save';
        this.cancelBtnTxt = 'Cancel';
        this.cpInputChange = new EventEmitter(true);
        this.cpToggleChange = new EventEmitter(true);
        this.cpSliderChange = new EventEmitter(true);
        this.cpSliderDragEnd = new EventEmitter(true);
        this.cpSliderDragStart = new EventEmitter(true);
        this.colorPickerCancel = new EventEmitter(true);
        this.colorPickerSelect = new EventEmitter(true);
        this.colorPickerChange = new EventEmitter(false);
        this.presetColorsChange = new EventEmitter(true);
        this.ignoreChanges = false;
        this.created = false;
    }
    ngOnChanges(changes) {
        if (changes.cpToggle) {
            if (changes.cpToggle.currentValue)
                this.openDialog();
            if (!changes.cpToggle.currentValue && this.dialog)
                this.dialog.closeColorPicker();
        }
        if (changes.colorPicker) {
            if (this.dialog && !this.ignoreChanges) {
                if (this.cpDialogDisplay === 'inline') {
                    this.dialog.setInitialColor(changes.colorPicker.currentValue);
                }
                this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
            }
            this.ignoreChanges = false;
        }
        if (changes.cpPresetLabel || changes.cpPresetColors) {
            if (this.dialog) {
                this.dialog.setPresetConfig(this.cpPresetLabel, this.cpPresetColors);
            }
        }
    }
    ngOnInit() {
        this.colorPicker = this.colorPicker || this.cpFallbackColor || 'rgba(0, 0, 0, 1)';
        /*let hsva = this.service.stringToHsva(this.colorPicker);
        if (hsva === null) hsva = this.service.stringToHsva(this.colorPicker, true);
        if (hsva == null) {
            hsva = this.service.stringToHsva(this.cpFallbackColor);
        }
        let color = this.service.outputFormat(hsva, this.cpOutputFormat, this.cpAlphaChannel);
        if (color !== this.colorPicker) {
            //setTimeout(() => {
              this.colorPickerChange.emit(color);
              this.cdr.detectChanges();
            //}, 0);
        }*/
    }
    ngOnDestroy() {
        if (this.cmpRef !== undefined) {
            this.cmpRef.destroy();
        }
    }
    openDialog() {
        this.colorPicker = this.colorPicker || this.cpFallbackColor || 'rgba(0, 0, 0, 1)';
        if (!this.created) {
            this.created = true;
            let vcRef = this.vcRef;
            if (this.cpUseRootViewContainer && this.cpDialogDisplay !== 'inline') {
                const classOfRootComponent = this.appRef.componentTypes[0];
                const appInstance = this.injector.get(classOfRootComponent);
                vcRef = appInstance.vcRef || appInstance.viewContainerRef || this.vcRef;
                if (vcRef === this.vcRef) {
                    console.warn('You are using cpUseRootViewContainer, but the root component is not exposing viewContainerRef!' +
                        'Please expose it by adding \'public vcRef: ViewContainerRef\' to the constructor.');
                }
            }
            const compFactory = this.cfr.resolveComponentFactory(ColorPickerComponent);
            const injector = ReflectiveInjector.fromResolvedProviders([], vcRef.parentInjector);
            this.cmpRef = vcRef.createComponent(compFactory, 0, injector, []);
            this.cmpRef.instance.setDialog(this, this.elRef, this.colorPicker, this.cpPosition, this.cpPositionOffset, this.cpPositionRelativeToArrow, this.cpOutputFormat, this.cpPresetLabel, this.cpPresetEmptyMessage, this.cpPresetEmptyMessageClass, this.cpPresetColors, this.cpMaxPresetColorsLength, this.cpCancelButton, this.cpCancelButtonClass, this.cpCancelButtonText, this.cpOKButton, this.cpOKButtonClass, this.cpOKButtonText, this.cpAddColorButton, this.cpAddColorButtonClass, this.cpAddColorButtonText, this.cpRemoveColorButtonClass, this.cpHeight, this.cpWidth, this.cpIgnoredElements, this.cpDialogDisplay, this.cpSaveClickOutside, this.cpAlphaChannel, this.cpUseRootViewContainer, this.headerName, this.saveBtnTxt, this.cancelBtnTxt);
            this.dialog = this.cmpRef.instance;
            if (this.vcRef !== vcRef) {
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
        else if (this.dialog) {
            this.dialog.openDialog(this.colorPicker);
        }
    }
    toggle(value) {
        this.cpToggleChange.emit(value);
    }
    colorChanged(value, ignore = true) {
        this.ignoreChanges = ignore;
        this.colorPickerChange.emit(value);
    }
    colorCanceled() {
        this.colorPickerCancel.emit();
    }
    colorSelected(value) {
        this.colorPickerSelect.emit(value);
    }
    presetColorsChanged(value) {
        this.presetColorsChange.emit(value);
    }
    inputFocus() {
        if (this.cpIgnoredElements.filter((item) => item === this.elRef.nativeElement).length === 0) {
            this.openDialog();
        }
    }
    inputChange(value) {
        if (this.dialog) {
            this.dialog.setColorFromString(value, true);
        }
        else {
            this.colorPicker = value || this.cpFallbackColor || 'rgba(0, 0, 0, 1)';
            this.colorPickerChange.emit(this.colorPicker);
        }
    }
    inputChanged(event) {
        this.cpInputChange.emit(event);
    }
    sliderChanged(event) {
        this.cpSliderChange.emit(event);
    }
    sliderDragEnd(event) {
        this.cpSliderDragEnd.emit(event);
    }
    sliderDragStart(event) {
        this.cpSliderDragStart.emit(event);
    }
}
ColorPickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: ColorPickerDirective, deps: [{ token: i0.Injector }, { token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i1.ColorPickerService }], target: i0.ɵɵFactoryTarget.Directive });
ColorPickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.1", type: ColorPickerDirective, selector: "[colorPicker]", inputs: { colorPicker: "colorPicker", cpToggle: "cpToggle", cpPosition: "cpPosition", cpPositionOffset: "cpPositionOffset", cpPositionRelativeToArrow: "cpPositionRelativeToArrow", cpOutputFormat: "cpOutputFormat", cpPresetLabel: "cpPresetLabel", cpPresetEmptyMessage: "cpPresetEmptyMessage", cpPresetEmptyMessageClass: "cpPresetEmptyMessageClass", cpPresetColors: "cpPresetColors", cpMaxPresetColorsLength: "cpMaxPresetColorsLength", cpCancelButton: "cpCancelButton", cpCancelButtonClass: "cpCancelButtonClass", cpCancelButtonText: "cpCancelButtonText", cpOKButton: "cpOKButton", cpOKButtonClass: "cpOKButtonClass", cpOKButtonText: "cpOKButtonText", cpAddColorButton: "cpAddColorButton", cpAddColorButtonClass: "cpAddColorButtonClass", cpAddColorButtonText: "cpAddColorButtonText", cpRemoveColorButtonClass: "cpRemoveColorButtonClass", cpFallbackColor: "cpFallbackColor", cpHeight: "cpHeight", cpWidth: "cpWidth", cpIgnoredElements: "cpIgnoredElements", cpDialogDisplay: "cpDialogDisplay", cpSaveClickOutside: "cpSaveClickOutside", cpAlphaChannel: "cpAlphaChannel", cpUseRootViewContainer: "cpUseRootViewContainer", headerName: "headerName", saveBtnTxt: "saveBtnTxt", cancelBtnTxt: "cancelBtnTxt" }, outputs: { cpInputChange: "cpInputChange", cpToggleChange: "cpToggleChange", cpSliderChange: "cpSliderChange", cpSliderDragEnd: "cpSliderDragEnd", cpSliderDragStart: "cpSliderDragStart", colorPickerCancel: "colorPickerCancel", colorPickerSelect: "colorPickerSelect", colorPickerChange: "colorPickerChange", presetColorsChange: "cpPresetColorsChange" }, host: { listeners: { "click": "inputFocus()", "focus": "inputFocus()", "input": "inputChange($event.target.value)" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: ColorPickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[colorPicker]',
                    host: {
                        '(click)': 'inputFocus()',
                        '(focus)': 'inputFocus()',
                        '(input)': 'inputChange($event.target.value)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i1.ColorPickerService }]; }, propDecorators: { colorPicker: [{
                type: Input,
                args: ['colorPicker']
            }], cpToggle: [{
                type: Input,
                args: ['cpToggle']
            }], cpPosition: [{
                type: Input,
                args: ['cpPosition']
            }], cpPositionOffset: [{
                type: Input,
                args: ['cpPositionOffset']
            }], cpPositionRelativeToArrow: [{
                type: Input,
                args: ['cpPositionRelativeToArrow']
            }], cpOutputFormat: [{
                type: Input,
                args: ['cpOutputFormat']
            }], cpPresetLabel: [{
                type: Input,
                args: ['cpPresetLabel']
            }], cpPresetEmptyMessage: [{
                type: Input,
                args: ['cpPresetEmptyMessage']
            }], cpPresetEmptyMessageClass: [{
                type: Input,
                args: ['cpPresetEmptyMessageClass']
            }], cpPresetColors: [{
                type: Input,
                args: ['cpPresetColors']
            }], cpMaxPresetColorsLength: [{
                type: Input,
                args: ['cpMaxPresetColorsLength']
            }], cpCancelButton: [{
                type: Input,
                args: ['cpCancelButton']
            }], cpCancelButtonClass: [{
                type: Input,
                args: ['cpCancelButtonClass']
            }], cpCancelButtonText: [{
                type: Input,
                args: ['cpCancelButtonText']
            }], cpOKButton: [{
                type: Input,
                args: ['cpOKButton']
            }], cpOKButtonClass: [{
                type: Input,
                args: ['cpOKButtonClass']
            }], cpOKButtonText: [{
                type: Input,
                args: ['cpOKButtonText']
            }], cpAddColorButton: [{
                type: Input,
                args: ['cpAddColorButton']
            }], cpAddColorButtonClass: [{
                type: Input,
                args: ['cpAddColorButtonClass']
            }], cpAddColorButtonText: [{
                type: Input,
                args: ['cpAddColorButtonText']
            }], cpRemoveColorButtonClass: [{
                type: Input,
                args: ['cpRemoveColorButtonClass']
            }], cpFallbackColor: [{
                type: Input,
                args: ['cpFallbackColor']
            }], cpHeight: [{
                type: Input,
                args: ['cpHeight']
            }], cpWidth: [{
                type: Input,
                args: ['cpWidth']
            }], cpIgnoredElements: [{
                type: Input,
                args: ['cpIgnoredElements']
            }], cpDialogDisplay: [{
                type: Input,
                args: ['cpDialogDisplay']
            }], cpSaveClickOutside: [{
                type: Input,
                args: ['cpSaveClickOutside']
            }], cpAlphaChannel: [{
                type: Input,
                args: ['cpAlphaChannel']
            }], cpUseRootViewContainer: [{
                type: Input,
                args: ['cpUseRootViewContainer']
            }], headerName: [{
                type: Input,
                args: ['headerName']
            }], saveBtnTxt: [{
                type: Input,
                args: ['saveBtnTxt']
            }], cancelBtnTxt: [{
                type: Input,
                args: ['cancelBtnTxt']
            }], cpInputChange: [{
                type: Output,
                args: ['cpInputChange']
            }], cpToggleChange: [{
                type: Output,
                args: ['cpToggleChange']
            }], cpSliderChange: [{
                type: Output,
                args: ['cpSliderChange']
            }], cpSliderDragEnd: [{
                type: Output,
                args: ['cpSliderDragEnd']
            }], cpSliderDragStart: [{
                type: Output,
                args: ['cpSliderDragStart']
            }], colorPickerCancel: [{
                type: Output,
                args: ['colorPickerCancel']
            }], colorPickerSelect: [{
                type: Output,
                args: ['colorPickerSelect']
            }], colorPickerChange: [{
                type: Output,
                args: ['colorPickerChange']
            }], presetColorsChange: [{
                type: Output,
                args: ['cpPresetColorsChange']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi9zcmMvbGliL2NvbG9yLXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTBELGtCQUFrQixFQUFxRCxNQUFNLGVBQWUsQ0FBQztBQUd6TixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBWWhFLE1BQU0sT0FBTyxvQkFBb0I7SUFvRDdCLFlBQW9CLFFBQWtCLEVBQVUsR0FBNkIsRUFDbkUsTUFBc0IsRUFBVSxLQUF1QixFQUFVLEtBQWlCLEVBQ2xGLE9BQTJCO1FBRmpCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUNuRSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNsRixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQW5EaEIsZUFBVSxHQUFXLE9BQU8sQ0FBQztRQUN2QixxQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFDdkIsOEJBQXlCLEdBQVksS0FBSyxDQUFDO1FBQ3RELG1CQUFjLEdBQVcsS0FBSyxDQUFDO1FBQ2hDLGtCQUFhLEdBQVcsZUFBZSxDQUFDO1FBQ2pDLHlCQUFvQixHQUFXLGlCQUFpQixDQUFDO1FBQzVDLDhCQUF5QixHQUFXLHNCQUFzQixDQUFDO1FBRTdELDRCQUF1QixHQUFXLENBQUMsQ0FBQztRQUM3QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUMzQix3QkFBbUIsR0FBVyx3QkFBd0IsQ0FBQztRQUN4RCx1QkFBa0IsR0FBVyxRQUFRLENBQUM7UUFDOUMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUN2QixvQkFBZSxHQUFXLG9CQUFvQixDQUFDO1FBQ2hELG1CQUFjLEdBQVcsSUFBSSxDQUFDO1FBQzVCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUM3QiwwQkFBcUIsR0FBVywyQkFBMkIsQ0FBQztRQUM3RCx5QkFBb0IsR0FBVyxXQUFXLENBQUM7UUFDdkMsNkJBQXdCLEdBQVcsOEJBQThCLENBQUM7UUFDM0Usb0JBQWUsR0FBVyxNQUFNLENBQUM7UUFDeEMsYUFBUSxHQUFXLE1BQU0sQ0FBQztRQUMzQixZQUFPLEdBQVcsT0FBTyxDQUFDO1FBQ2hCLHNCQUFpQixHQUFRLEVBQUUsQ0FBQztRQUM5QixvQkFBZSxHQUFXLE9BQU8sQ0FBQztRQUMvQix1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFDdkMsbUJBQWMsR0FBVyxTQUFTLENBQUM7UUFDM0IsMkJBQXNCLEdBQVksS0FBSyxDQUFDO1FBQ3BELGVBQVUsR0FBVSxZQUFZLENBQUM7UUFDakMsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUMxQixpQkFBWSxHQUFXLFFBQVEsQ0FBQztRQUU5QixrQkFBYSxHQUFHLElBQUksWUFBWSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBRTNDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLENBQVUsSUFBSSxDQUFDLENBQUM7UUFFakQsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUM1QyxvQkFBZSxHQUFHLElBQUksWUFBWSxDQUFTLElBQUksQ0FBQyxDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFTLElBQUksQ0FBQyxDQUFDO1FBRW5ELHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFTLElBQUksQ0FBQyxDQUFDO1FBQ25ELHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFTLElBQUksQ0FBQyxDQUFDO1FBQ25ELHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO1FBQ2pELHVCQUFrQixHQUFHLElBQUksWUFBWSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBSXpFLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBT25DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUNwQixJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVk7Z0JBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTTtnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDckY7UUFDRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDakU7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUUzRTtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3hFO1NBQ0o7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLGtCQUFrQixDQUFDO1FBQ2xGOzs7Ozs7Ozs7OztXQVdHO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLGtCQUFrQixDQUFDO1FBRWxGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsRUFBRTtnQkFDcEUsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDNUQsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hFLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0dBQWdHO3dCQUMzRyxtRkFBbUYsQ0FBQyxDQUFDO2lCQUN4RjthQUNGO1lBQ0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUNyRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFDbEcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUNqRixJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQ3RFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUMxRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFDNUUsSUFBSSxDQUFDLHdCQUF3QixFQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUNuRCxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFDL0YsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBRW5DLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDakQ7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFhLEVBQUUsU0FBa0IsSUFBSTtRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFpQjtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxrQkFBa0IsQ0FBQztZQUV2RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVU7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBVTtRQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2lIQWhNUSxvQkFBb0I7cUdBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQVJoQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0osU0FBUyxFQUFFLGNBQWM7d0JBQ3pCLFNBQVMsRUFBRSxjQUFjO3dCQUN6QixTQUFTLEVBQUUsa0NBQWtDO3FCQUM5QztpQkFDSjs0UEFFeUIsV0FBVztzQkFBaEMsS0FBSzt1QkFBQyxhQUFhO2dCQUNELFFBQVE7c0JBQTFCLEtBQUs7dUJBQUMsVUFBVTtnQkFDSSxVQUFVO3NCQUE5QixLQUFLO3VCQUFDLFlBQVk7Z0JBQ1EsZ0JBQWdCO3NCQUExQyxLQUFLO3VCQUFDLGtCQUFrQjtnQkFDVyx5QkFBeUI7c0JBQTVELEtBQUs7dUJBQUMsMkJBQTJCO2dCQUNULGNBQWM7c0JBQXRDLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQUNDLGFBQWE7c0JBQXBDLEtBQUs7dUJBQUMsZUFBZTtnQkFDUyxvQkFBb0I7c0JBQWxELEtBQUs7dUJBQUMsc0JBQXNCO2dCQUNPLHlCQUF5QjtzQkFBNUQsS0FBSzt1QkFBQywyQkFBMkI7Z0JBQ1QsY0FBYztzQkFBdEMsS0FBSzt1QkFBQyxnQkFBZ0I7Z0JBQ1csdUJBQXVCO3NCQUF4RCxLQUFLO3VCQUFDLHlCQUF5QjtnQkFDUCxjQUFjO3NCQUF0QyxLQUFLO3VCQUFDLGdCQUFnQjtnQkFDTyxtQkFBbUI7c0JBQWhELEtBQUs7dUJBQUMscUJBQXFCO2dCQUNDLGtCQUFrQjtzQkFBOUMsS0FBSzt1QkFBQyxvQkFBb0I7Z0JBQ04sVUFBVTtzQkFBOUIsS0FBSzt1QkFBQyxZQUFZO2dCQUNPLGVBQWU7c0JBQXhDLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUNDLGNBQWM7c0JBQXRDLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQUNJLGdCQUFnQjtzQkFBMUMsS0FBSzt1QkFBQyxrQkFBa0I7Z0JBQ08scUJBQXFCO3NCQUFwRCxLQUFLO3VCQUFDLHVCQUF1QjtnQkFDQyxvQkFBb0I7c0JBQWxELEtBQUs7dUJBQUMsc0JBQXNCO2dCQUNNLHdCQUF3QjtzQkFBMUQsS0FBSzt1QkFBQywwQkFBMEI7Z0JBQ1AsZUFBZTtzQkFBeEMsS0FBSzt1QkFBQyxpQkFBaUI7Z0JBQ0wsUUFBUTtzQkFBMUIsS0FBSzt1QkFBQyxVQUFVO2dCQUNDLE9BQU87c0JBQXhCLEtBQUs7dUJBQUMsU0FBUztnQkFDWSxpQkFBaUI7c0JBQTVDLEtBQUs7dUJBQUMsbUJBQW1CO2dCQUNBLGVBQWU7c0JBQXhDLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUNLLGtCQUFrQjtzQkFBOUMsS0FBSzt1QkFBQyxvQkFBb0I7Z0JBQ0YsY0FBYztzQkFBdEMsS0FBSzt1QkFBQyxnQkFBZ0I7Z0JBQ1Usc0JBQXNCO3NCQUF0RCxLQUFLO3VCQUFDLHdCQUF3QjtnQkFDVixVQUFVO3NCQUE5QixLQUFLO3VCQUFDLFlBQVk7Z0JBQ0UsVUFBVTtzQkFBOUIsS0FBSzt1QkFBQyxZQUFZO2dCQUNJLFlBQVk7c0JBQWxDLEtBQUs7dUJBQUMsY0FBYztnQkFFSSxhQUFhO3NCQUFyQyxNQUFNO3VCQUFDLGVBQWU7Z0JBRUcsY0FBYztzQkFBdkMsTUFBTTt1QkFBQyxnQkFBZ0I7Z0JBRUUsY0FBYztzQkFBdkMsTUFBTTt1QkFBQyxnQkFBZ0I7Z0JBQ0csZUFBZTtzQkFBekMsTUFBTTt1QkFBQyxpQkFBaUI7Z0JBQ0ksaUJBQWlCO3NCQUE3QyxNQUFNO3VCQUFDLG1CQUFtQjtnQkFFRSxpQkFBaUI7c0JBQTdDLE1BQU07dUJBQUMsbUJBQW1CO2dCQUNFLGlCQUFpQjtzQkFBN0MsTUFBTTt1QkFBQyxtQkFBbUI7Z0JBQ0UsaUJBQWlCO3NCQUE3QyxNQUFNO3VCQUFDLG1CQUFtQjtnQkFDSyxrQkFBa0I7c0JBQWpELE1BQU07dUJBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25Jbml0LCBPbkNoYW5nZXMsIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3RvciwgQXBwbGljYXRpb25SZWYsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIFJlZmxlY3RpdmVJbmplY3RvciwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29sb3JQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb2xvci1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IFNsaWRlclBvc2l0aW9uLCBTbGlkZXJEaW1lbnNpb259IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2NvbG9yUGlja2VyXScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICcoY2xpY2spJzogJ2lucHV0Rm9jdXMoKScsXHJcbiAgICAgICcoZm9jdXMpJzogJ2lucHV0Rm9jdXMoKScsXHJcbiAgICAgICcoaW5wdXQpJzogJ2lucHV0Q2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAgIEBJbnB1dCgnY29sb3JQaWNrZXInKSBjb2xvclBpY2tlcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCdjcFRvZ2dsZScpIGNwVG9nZ2xlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCdjcFBvc2l0aW9uJykgY3BQb3NpdGlvbjogc3RyaW5nID0gJ3JpZ2h0JztcclxuICAgIEBJbnB1dCgnY3BQb3NpdGlvbk9mZnNldCcpIGNwUG9zaXRpb25PZmZzZXQ6IHN0cmluZyA9ICcwJSc7XHJcbiAgICBASW5wdXQoJ2NwUG9zaXRpb25SZWxhdGl2ZVRvQXJyb3cnKSBjcFBvc2l0aW9uUmVsYXRpdmVUb0Fycm93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2NwT3V0cHV0Rm9ybWF0JykgY3BPdXRwdXRGb3JtYXQ6IHN0cmluZyA9ICdoZXgnO1xyXG4gICAgQElucHV0KCdjcFByZXNldExhYmVsJykgY3BQcmVzZXRMYWJlbDogc3RyaW5nID0gJ1ByZXNldCBjb2xvcnMnO1xyXG4gICAgQElucHV0KCdjcFByZXNldEVtcHR5TWVzc2FnZScpIGNwUHJlc2V0RW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnTm8gY29sb3JzIGFkZGVkJztcclxuICAgIEBJbnB1dCgnY3BQcmVzZXRFbXB0eU1lc3NhZ2VDbGFzcycpIGNwUHJlc2V0RW1wdHlNZXNzYWdlQ2xhc3M6IHN0cmluZyA9ICdwcmVzZXQtZW1wdHktbWVzc2FnZSc7XHJcbiAgICBASW5wdXQoJ2NwUHJlc2V0Q29sb3JzJykgY3BQcmVzZXRDb2xvcnM6IEFycmF5PHN0cmluZz47XHJcbiAgICBASW5wdXQoJ2NwTWF4UHJlc2V0Q29sb3JzTGVuZ3RoJykgY3BNYXhQcmVzZXRDb2xvcnNMZW5ndGg6IG51bWJlciA9IDY7XHJcbiAgICBASW5wdXQoJ2NwQ2FuY2VsQnV0dG9uJykgY3BDYW5jZWxCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnY3BDYW5jZWxCdXR0b25DbGFzcycpIGNwQ2FuY2VsQnV0dG9uQ2xhc3M6IHN0cmluZyA9ICdjcC1jYW5jZWwtYnV0dG9uLWNsYXNzJztcclxuICAgIEBJbnB1dCgnY3BDYW5jZWxCdXR0b25UZXh0JykgY3BDYW5jZWxCdXR0b25UZXh0OiBzdHJpbmcgPSAnQ2FuY2VsJztcclxuICAgIEBJbnB1dCgnY3BPS0J1dHRvbicpIGNwT0tCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnY3BPS0J1dHRvbkNsYXNzJykgY3BPS0J1dHRvbkNsYXNzOiBzdHJpbmcgPSAnY3Atb2stYnV0dG9uLWNsYXNzJztcclxuICAgIEBJbnB1dCgnY3BPS0J1dHRvblRleHQnKSBjcE9LQnV0dG9uVGV4dDogc3RyaW5nID0gJ09LJztcclxuICAgIEBJbnB1dCgnY3BBZGRDb2xvckJ1dHRvbicpIGNwQWRkQ29sb3JCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnY3BBZGRDb2xvckJ1dHRvbkNsYXNzJykgY3BBZGRDb2xvckJ1dHRvbkNsYXNzOiBzdHJpbmcgPSAnY3AtYWRkLWNvbG9yLWJ1dHRvbi1jbGFzcyc7XHJcbiAgICBASW5wdXQoJ2NwQWRkQ29sb3JCdXR0b25UZXh0JykgY3BBZGRDb2xvckJ1dHRvblRleHQ6IHN0cmluZyA9ICdBZGQgY29sb3InO1xyXG4gICAgQElucHV0KCdjcFJlbW92ZUNvbG9yQnV0dG9uQ2xhc3MnKSBjcFJlbW92ZUNvbG9yQnV0dG9uQ2xhc3M6IHN0cmluZyA9ICdjcC1yZW1vdmUtY29sb3ItYnV0dG9uLWNsYXNzJztcclxuICAgIEBJbnB1dCgnY3BGYWxsYmFja0NvbG9yJykgY3BGYWxsYmFja0NvbG9yOiBzdHJpbmcgPSAnI2ZmZic7XHJcbiAgICBASW5wdXQoJ2NwSGVpZ2h0JykgY3BIZWlnaHQ6IHN0cmluZyA9ICdhdXRvJztcclxuICAgIEBJbnB1dCgnY3BXaWR0aCcpIGNwV2lkdGg6IHN0cmluZyA9ICcyNzJweCc7XHJcbiAgICBASW5wdXQoJ2NwSWdub3JlZEVsZW1lbnRzJykgY3BJZ25vcmVkRWxlbWVudHM6IGFueSA9IFtdO1xyXG4gICAgQElucHV0KCdjcERpYWxvZ0Rpc3BsYXknKSBjcERpYWxvZ0Rpc3BsYXk6IHN0cmluZyA9ICdwb3B1cCc7XHJcbiAgICBASW5wdXQoJ2NwU2F2ZUNsaWNrT3V0c2lkZScpIGNwU2F2ZUNsaWNrT3V0c2lkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoJ2NwQWxwaGFDaGFubmVsJykgY3BBbHBoYUNoYW5uZWw6IHN0cmluZyA9ICdlbmFibGVkJztcclxuICAgIEBJbnB1dCgnY3BVc2VSb290Vmlld0NvbnRhaW5lcicpIGNwVXNlUm9vdFZpZXdDb250YWluZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnaGVhZGVyTmFtZScpIGhlYWRlck5hbWU6c3RyaW5nID0gJ0VkaXQgQ29sb3InO1xyXG4gICAgQElucHV0KCdzYXZlQnRuVHh0Jykgc2F2ZUJ0blR4dDogc3RyaW5nID0gJ1NhdmUnO1xyXG4gICAgQElucHV0KCdjYW5jZWxCdG5UeHQnKSBjYW5jZWxCdG5UeHQ6IHN0cmluZyA9ICdDYW5jZWwnO1xyXG5cclxuICAgIEBPdXRwdXQoJ2NwSW5wdXRDaGFuZ2UnKSBjcElucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KHRydWUpO1xyXG5cclxuICAgIEBPdXRwdXQoJ2NwVG9nZ2xlQ2hhbmdlJykgY3BUb2dnbGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KHRydWUpO1xyXG5cclxuICAgIEBPdXRwdXQoJ2NwU2xpZGVyQ2hhbmdlJykgY3BTbGlkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4odHJ1ZSk7XHJcbiAgICBAT3V0cHV0KCdjcFNsaWRlckRyYWdFbmQnKSBjcFNsaWRlckRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4odHJ1ZSk7XHJcbiAgICBAT3V0cHV0KCdjcFNsaWRlckRyYWdTdGFydCcpIGNwU2xpZGVyRHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KHRydWUpO1xyXG5cclxuICAgIEBPdXRwdXQoJ2NvbG9yUGlja2VyQ2FuY2VsJykgY29sb3JQaWNrZXJDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4odHJ1ZSk7XHJcbiAgICBAT3V0cHV0KCdjb2xvclBpY2tlclNlbGVjdCcpIGNvbG9yUGlja2VyU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KHRydWUpO1xyXG4gICAgQE91dHB1dCgnY29sb3JQaWNrZXJDaGFuZ2UnKSBjb2xvclBpY2tlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPihmYWxzZSk7XHJcbiAgICBAT3V0cHV0KCdjcFByZXNldENvbG9yc0NoYW5nZScpIHByZXNldENvbG9yc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55Pih0cnVlKTtcclxuXHJcbiAgICBwcml2YXRlIGRpYWxvZzogYW55O1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBpZ25vcmVDaGFuZ2VzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGNtcFJlZjogQ29tcG9uZW50UmVmPENvbG9yUGlja2VyQ29tcG9uZW50PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICBwcml2YXRlIHNlcnZpY2U6IENvbG9yUGlja2VyU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5jcFRvZ2dsZSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5jcFRvZ2dsZS5jdXJyZW50VmFsdWUpIHRoaXMub3BlbkRpYWxvZygpO1xyXG4gICAgICAgICAgICBpZiAoIWNoYW5nZXMuY3BUb2dnbGUuY3VycmVudFZhbHVlICYmIHRoaXMuZGlhbG9nKSB0aGlzLmRpYWxvZy5jbG9zZUNvbG9yUGlja2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmNvbG9yUGlja2VyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpYWxvZyAmJiAhdGhpcy5pZ25vcmVDaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jcERpYWxvZ0Rpc3BsYXkgPT09ICdpbmxpbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cuc2V0SW5pdGlhbENvbG9yKGNoYW5nZXMuY29sb3JQaWNrZXIuY3VycmVudFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nLnNldENvbG9yRnJvbVN0cmluZyhjaGFuZ2VzLmNvbG9yUGlja2VyLmN1cnJlbnRWYWx1ZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlnbm9yZUNoYW5nZXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuY3BQcmVzZXRMYWJlbCB8fCBjaGFuZ2VzLmNwUHJlc2V0Q29sb3JzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpYWxvZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cuc2V0UHJlc2V0Q29uZmlnKHRoaXMuY3BQcmVzZXRMYWJlbCwgdGhpcy5jcFByZXNldENvbG9ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlciA9IHRoaXMuY29sb3JQaWNrZXIgfHwgdGhpcy5jcEZhbGxiYWNrQ29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMSknO1xyXG4gICAgICAgIC8qbGV0IGhzdmEgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKHRoaXMuY29sb3JQaWNrZXIpO1xyXG4gICAgICAgIGlmIChoc3ZhID09PSBudWxsKSBoc3ZhID0gdGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YSh0aGlzLmNvbG9yUGlja2VyLCB0cnVlKTtcclxuICAgICAgICBpZiAoaHN2YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGhzdmEgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKHRoaXMuY3BGYWxsYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5zZXJ2aWNlLm91dHB1dEZvcm1hdChoc3ZhLCB0aGlzLmNwT3V0cHV0Rm9ybWF0LCB0aGlzLmNwQWxwaGFDaGFubmVsKTtcclxuICAgICAgICBpZiAoY29sb3IgIT09IHRoaXMuY29sb3JQaWNrZXIpIHtcclxuICAgICAgICAgICAgLy9zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmNvbG9yUGlja2VyQ2hhbmdlLmVtaXQoY29sb3IpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgLy99LCAwKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jbXBSZWYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNtcFJlZi5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EaWFsb2coKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlciA9IHRoaXMuY29sb3JQaWNrZXIgfHwgdGhpcy5jcEZhbGxiYWNrQ29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMSknO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY3JlYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdmNSZWYgPSB0aGlzLnZjUmVmO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jcFVzZVJvb3RWaWV3Q29udGFpbmVyICYmIHRoaXMuY3BEaWFsb2dEaXNwbGF5ICE9PSAnaW5saW5lJykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzT2ZSb290Q29tcG9uZW50ID0gdGhpcy5hcHBSZWYuY29tcG9uZW50VHlwZXNbMF07XHJcbiAgICAgICAgICAgICAgY29uc3QgYXBwSW5zdGFuY2UgPSB0aGlzLmluamVjdG9yLmdldChjbGFzc09mUm9vdENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgdmNSZWYgPSBhcHBJbnN0YW5jZS52Y1JlZiB8fCBhcHBJbnN0YW5jZS52aWV3Q29udGFpbmVyUmVmIHx8IHRoaXMudmNSZWY7XHJcbiAgICAgICAgICAgICAgaWYgKHZjUmVmID09PSB0aGlzLnZjUmVmKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1lvdSBhcmUgdXNpbmcgY3BVc2VSb290Vmlld0NvbnRhaW5lciwgYnV0IHRoZSByb290IGNvbXBvbmVudCBpcyBub3QgZXhwb3Npbmcgdmlld0NvbnRhaW5lclJlZiEnICtcclxuICAgICAgICAgICAgICAgICAgJ1BsZWFzZSBleHBvc2UgaXQgYnkgYWRkaW5nIFxcJ3B1YmxpYyB2Y1JlZjogVmlld0NvbnRhaW5lclJlZlxcJyB0byB0aGUgY29uc3RydWN0b3IuJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBGYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoQ29sb3JQaWNrZXJDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmplY3RvciA9IFJlZmxlY3RpdmVJbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMoW10sIHZjUmVmLnBhcmVudEluamVjdG9yKTtcclxuICAgICAgICAgICAgdGhpcy5jbXBSZWYgPSB2Y1JlZi5jcmVhdGVDb21wb25lbnQoY29tcEZhY3RvcnksIDAsIGluamVjdG9yLCBbXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLnNldERpYWxvZyh0aGlzLCB0aGlzLmVsUmVmLCB0aGlzLmNvbG9yUGlja2VyLCB0aGlzLmNwUG9zaXRpb24sIHRoaXMuY3BQb3NpdGlvbk9mZnNldCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3BQb3NpdGlvblJlbGF0aXZlVG9BcnJvdywgdGhpcy5jcE91dHB1dEZvcm1hdCwgdGhpcy5jcFByZXNldExhYmVsLCB0aGlzLmNwUHJlc2V0RW1wdHlNZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcFByZXNldEVtcHR5TWVzc2FnZUNsYXNzLCB0aGlzLmNwUHJlc2V0Q29sb3JzLCB0aGlzLmNwTWF4UHJlc2V0Q29sb3JzTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcENhbmNlbEJ1dHRvbiwgdGhpcy5jcENhbmNlbEJ1dHRvbkNsYXNzLCB0aGlzLmNwQ2FuY2VsQnV0dG9uVGV4dCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3BPS0J1dHRvbiwgdGhpcy5jcE9LQnV0dG9uQ2xhc3MsIHRoaXMuY3BPS0J1dHRvblRleHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNwQWRkQ29sb3JCdXR0b24sIHRoaXMuY3BBZGRDb2xvckJ1dHRvbkNsYXNzLCB0aGlzLmNwQWRkQ29sb3JCdXR0b25UZXh0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcFJlbW92ZUNvbG9yQnV0dG9uQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNwSGVpZ2h0LCB0aGlzLmNwV2lkdGgsIHRoaXMuY3BJZ25vcmVkRWxlbWVudHMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNwRGlhbG9nRGlzcGxheSwgdGhpcy5jcFNhdmVDbGlja091dHNpZGUsIHRoaXMuY3BBbHBoYUNoYW5uZWwsIHRoaXMuY3BVc2VSb290Vmlld0NvbnRhaW5lcixcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyTmFtZSx0aGlzLnNhdmVCdG5UeHQsdGhpcy5jYW5jZWxCdG5UeHQpO1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZyA9IHRoaXMuY21wUmVmLmluc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudmNSZWYgIT09IHZjUmVmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlhbG9nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nLm9wZW5EaWFsb2codGhpcy5jb2xvclBpY2tlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY3BUb2dnbGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29sb3JDaGFuZ2VkKHZhbHVlOiBzdHJpbmcsIGlnbm9yZTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLmlnbm9yZUNoYW5nZXMgPSBpZ25vcmU7XHJcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlckNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xvckNhbmNlbGVkKCkge1xyXG4gICAgICB0aGlzLmNvbG9yUGlja2VyQ2FuY2VsLmVtaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xvclNlbGVjdGVkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyU2VsZWN0LmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXNldENvbG9yc0NoYW5nZWQodmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICB0aGlzLnByZXNldENvbG9yc0NoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH0gXHJcblxyXG4gICAgaW5wdXRGb2N1cygpIHtcclxuICAgICAgICBpZiAodGhpcy5jcElnbm9yZWRFbGVtZW50cy5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbSA9PT0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuZGlhbG9nKSB7XHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc2V0Q29sb3JGcm9tU3RyaW5nKHZhbHVlLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyID0gdmFsdWUgfHwgdGhpcy5jcEZhbGxiYWNrQ29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMSknO1xyXG5cclxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyQ2hhbmdlLmVtaXQodGhpcy5jb2xvclBpY2tlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dENoYW5nZWQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY3BJbnB1dENoYW5nZS5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzbGlkZXJDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNwU2xpZGVyQ2hhbmdlLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlckRyYWdFbmQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY3BTbGlkZXJEcmFnRW5kLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlckRyYWdTdGFydChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jcFNsaWRlckRyYWdTdGFydC5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxufSJdfQ==