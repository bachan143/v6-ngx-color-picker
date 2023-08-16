import { Injectable } from '@angular/core';
import { Rgba, Hsla, Hsva } from './formats';
import * as i0 from "@angular/core";
export class ColorPickerService {
    constructor() {
        this.active = null;
    }
    setActive(active) {
        if (this.active && this.active !== active && this.active.cpDialogDisplay !== 'inline') {
            this.active.closeColorPicker();
        }
        this.active = active;
    }
    hsla2hsva(hsla) {
        let h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);
        if (l === 0) {
            return new Hsva(h, 0, 0, a);
        }
        else {
            let v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return new Hsva(h, 2 * (v - l) / v, v, a);
        }
    }
    hsva2hsla(hsva) {
        let h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            let l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    }
    rgbaToHsva(rgba) {
        let r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1), b = Math.min(rgba.b, 1), a = Math.min(rgba.a, 1);
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    }
    hsvaToRgba(hsva) {
        let h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        let r, g, b;
        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return new Rgba(r, g, b, a);
    }
    stringToHsva(colorString = '', allowHex8 = false) {
        let stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2]) / 255, parseInt(execResult[3]) / 255, parseInt(execResult[4]) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2]) / 360, parseInt(execResult[3]) / 100, parseInt(execResult[4]) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            }
        ];
        if (allowHex8) {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, parseInt(execResult[4] || 'FF', 16) / 255);
                }
            });
        }
        else {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            }, {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
                }
            });
        }
        colorString = (colorString || '').toLowerCase();
        let hsva = null;
        for (let key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                let parser = stringParsers[key];
                let match = parser.re.exec(colorString), color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    }
    outputFormat(hsva, outputFormat, alphaChannel) {
        switch (outputFormat) {
            case 'hsla':
                let hsla = this.hsva2hsla(hsva);
                let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                if (hsva.a < 1 || alphaChannel === 'always') {
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%,' + hslaText.a + ')';
                }
                else {
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                }
            case 'rgba':
                let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                if (hsva.a < 1 || alphaChannel === 'always') {
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + Math.round(rgba.a * 100) / 100 + ')';
                }
                else {
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                }
            default:
                return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)), alphaChannel === 'always' || alphaChannel === 'hex8');
        }
    }
    hexText(rgba, allowHex8) {
        let hexText = '#' + ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16).substr(1);
        /*if (hexText[1] === hexText[2] && hexText[3] === hexText[4] && hexText[5] === hexText[6] && !allowHex8) {
            hexText = '#' + hexText[1] + hexText[3] + hexText[5];
        }*/
        if (allowHex8) {
            hexText += ((1 << 8) | Math.round(rgba.a * 255)).toString(16).substr(1);
        }
        return hexText;
    }
    denormalizeRGBA(rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    }
}
ColorPickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: ColorPickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ColorPickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: ColorPickerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.1", ngImport: i0, type: ColorPickerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9saWIvc3JjL2xpYi9jb2xvci1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFHN0MsTUFBTSxPQUFPLGtCQUFrQjtJQUczQjtRQUZRLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFFTixDQUFDO0lBRWpCLFNBQVMsQ0FBQyxNQUFXO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxRQUFRLEVBQUU7WUFDckYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFVO1FBQ2hCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVCxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFD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WUFBWSxLQUFLLE1BQU0sQ0FBQyxDQUFDO1NBRTlIO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFVLEVBQUUsU0FBa0I7UUFDbEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRzs7V0FFRztRQUNILElBQUksU0FBUyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRTtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBVTtRQUN0QixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDOzsrR0E1TVEsa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJnYmEsIEhzbGEsIEhzdmEgfSBmcm9tICcuL2Zvcm1hdHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgYWN0aXZlID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGFueSkge1xyXG4gICAgICBpZiAodGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUgIT09IGFjdGl2ZSAmJiB0aGlzLmFjdGl2ZS5jcERpYWxvZ0Rpc3BsYXkgIT09ICdpbmxpbmUnKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUuY2xvc2VDb2xvclBpY2tlcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIGhzbGEyaHN2YShoc2xhOiBIc2xhKTogSHN2YSB7XHJcbiAgICAgICAgbGV0IGggPSBNYXRoLm1pbihoc2xhLmgsIDEpLCBzID0gTWF0aC5taW4oaHNsYS5zLCAxKSwgbCA9IE1hdGgubWluKGhzbGEubCwgMSksIGEgPSBNYXRoLm1pbihoc2xhLmEsIDEpO1xyXG4gICAgICAgIGlmIChsID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHN2YShoLCAwLCAwLCBhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdiA9IGwgKyBzICogKDEgLSBNYXRoLmFicygyICogbCAtIDEpKSAvIDI7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHN2YShoLCAyICogKHYgLSBsKSAvIHYsIHYsIGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoc3ZhMmhzbGEoaHN2YTogSHN2YSk6IEhzbGEge1xyXG4gICAgICAgIGxldCBoID0gaHN2YS5oLCBzID0gaHN2YS5zLCB2ID0gaHN2YS52LCBhID0gaHN2YS5hO1xyXG4gICAgICAgIGlmICh2ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHNsYShoLCAwLCAwLCBhKVxyXG4gICAgICAgIH0gZWxzZSBpZiAocyA9PT0gMCAmJiB2ID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHNsYShoLCAxLCAxLCBhKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsID0gdiAqICgyIC0gcykgLyAyO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEhzbGEoaCwgdiAqIHMgLyAoMSAtIE1hdGguYWJzKDIgKiBsIC0gMSkpLCBsLCBhKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZ2JhVG9Ic3ZhKHJnYmE6IFJnYmEpOiBIc3ZhIHtcclxuICAgICAgICBsZXQgciA9IE1hdGgubWluKHJnYmEuciwgMSksIGcgPSBNYXRoLm1pbihyZ2JhLmcsIDEpLCBiID0gTWF0aC5taW4ocmdiYS5iLCAxKSwgYSA9IE1hdGgubWluKHJnYmEuYSwgMSk7XHJcbiAgICAgICAgbGV0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgICAgICBsZXQgaDogbnVtYmVyLCBzOiBudW1iZXIsIHY6IG51bWJlciA9IG1heDtcclxuXHJcbiAgICAgICAgbGV0IGQgPSBtYXggLSBtaW47XHJcbiAgICAgICAgcyA9IG1heCA9PT0gMCA/IDAgOiBkIC8gbWF4O1xyXG5cclxuICAgICAgICBpZiAobWF4ID09PSBtaW4pIHtcclxuICAgICAgICAgICAgaCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtYXgpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgcjpcclxuICAgICAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGc6XHJcbiAgICAgICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgYjpcclxuICAgICAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGggLz0gNjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgSHN2YShoLCBzLCB2LCBhKVxyXG4gICAgfVxyXG5cclxuICAgIGhzdmFUb1JnYmEoaHN2YTogSHN2YSk6IFJnYmEge1xyXG4gICAgICAgIGxldCBoID0gaHN2YS5oLCBzID0gaHN2YS5zLCB2ID0gaHN2YS52LCBhID0gaHN2YS5hO1xyXG4gICAgICAgIGxldCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyO1xyXG5cclxuICAgICAgICBsZXQgaSA9IE1hdGguZmxvb3IoaCAqIDYpO1xyXG4gICAgICAgIGxldCBmID0gaCAqIDYgLSBpO1xyXG4gICAgICAgIGxldCBwID0gdiAqICgxIC0gcyk7XHJcbiAgICAgICAgbGV0IHEgPSB2ICogKDEgLSBmICogcyk7XHJcbiAgICAgICAgbGV0IHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoaSAlIDYpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgciA9IHYsIGcgPSB0LCBiID0gcDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByID0gcSwgZyA9IHYsIGIgPSBwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHIgPSBwLCBnID0gdiwgYiA9IHQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgciA9IHAsIGcgPSBxLCBiID0gdjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICByID0gdCwgZyA9IHAsIGIgPSB2O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHIgPSB2LCBnID0gcCwgYiA9IHE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUmdiYShyLCBnLCBiLCBhKVxyXG4gICAgfVxyXG5cclxuICAgIHN0cmluZ1RvSHN2YShjb2xvclN0cmluZzogc3RyaW5nID0gJycsIGFsbG93SGV4ODogYm9vbGVhbiA9IGZhbHNlKTogSHN2YSB7XHJcbiAgICAgICAgbGV0IHN0cmluZ1BhcnNlcnMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlOiAvKHJnYilhP1xcKFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccyolPyxcXHMqKFxcZHsxLDN9KVxccyolPyg/OixcXHMqKFxcZCsoPzpcXC5cXGQrKT8pXFxzKik/XFwpLyxcclxuICAgICAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbihleGVjUmVzdWx0OiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJnYmEocGFyc2VJbnQoZXhlY1Jlc3VsdFsyXSkgLyAyNTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbM10pIC8gMjU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzRdKSAvIDI1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNOYU4ocGFyc2VGbG9hdChleGVjUmVzdWx0WzVdKSkgPyAxIDogcGFyc2VGbG9hdChleGVjUmVzdWx0WzVdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlOiAvKGhzbClhP1xcKFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KSVcXHMqLFxccyooXFxkezEsM30pJVxccyooPzosXFxzKihcXGQrKD86XFwuXFxkKyk/KVxccyopP1xcKS8sXHJcbiAgICAgICAgICAgICAgICBwYXJzZTogZnVuY3Rpb24oZXhlY1Jlc3VsdDogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIc2xhKHBhcnNlSW50KGV4ZWNSZXN1bHRbMl0pIC8gMzYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzNdKSAvIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoZXhlY1Jlc3VsdFs0XSkgLyAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTmFOKHBhcnNlRmxvYXQoZXhlY1Jlc3VsdFs1XSkpID8gMSA6IHBhcnNlRmxvYXQoZXhlY1Jlc3VsdFs1XSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAoYWxsb3dIZXg4KSB7XHJcbiAgICAgICAgICAgIHN0cmluZ1BhcnNlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICByZTogLyMoW2EtZkEtRjAtOV17Mn0pKFthLWZBLUYwLTldezJ9KShbYS1mQS1GMC05XXsyfSkoW2EtZkEtRjAtOV17Mn0pPyQvLFxyXG4gICAgICAgICAgICAgICAgcGFyc2U6IGZ1bmN0aW9uKGV4ZWNSZXN1bHQ6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmdiYShwYXJzZUludChleGVjUmVzdWx0WzFdLCAxNikgLyAyNTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbMl0sIDE2KSAvIDI1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoZXhlY1Jlc3VsdFszXSwgMTYpIC8gMjU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzRdIHx8ICdGRicsIDE2KSAvIDI1NSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0cmluZ1BhcnNlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICByZTogLyMoW2EtZkEtRjAtOV17Mn0pKFthLWZBLUYwLTldezJ9KShbYS1mQS1GMC05XXsyfSkkLyxcclxuICAgICAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbihleGVjUmVzdWx0OiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJnYmEocGFyc2VJbnQoZXhlY1Jlc3VsdFsxXSwgMTYpIC8gMjU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzJdLCAxNikgLyAyNTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbM10sIDE2KSAvIDI1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmU6IC8jKFthLWZBLUYwLTldKShbYS1mQS1GMC05XSkoW2EtZkEtRjAtOV0pJC8sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2U6IGZ1bmN0aW9uKGV4ZWNSZXN1bHQ6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJnYmEocGFyc2VJbnQoZXhlY1Jlc3VsdFsxXSArIGV4ZWNSZXN1bHRbMV0sIDE2KSAvIDI1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbMl0gKyBleGVjUmVzdWx0WzJdLCAxNikgLyAyNTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzNdICsgZXhlY1Jlc3VsdFszXSwgMTYpIC8gMjU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgY29sb3JTdHJpbmcgPSAoY29sb3JTdHJpbmcgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGhzdmE6IEhzdmEgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdQYXJzZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJpbmdQYXJzZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJzZXIgPSBzdHJpbmdQYXJzZXJzW2tleV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSBwYXJzZXIucmUuZXhlYyhjb2xvclN0cmluZyksIGNvbG9yOiBhbnkgPSBtYXRjaCAmJiBwYXJzZXIucGFyc2UobWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yIGluc3RhbmNlb2YgUmdiYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoc3ZhID0gdGhpcy5yZ2JhVG9Ic3ZhKGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbG9yIGluc3RhbmNlb2YgSHNsYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoc3ZhID0gdGhpcy5oc2xhMmhzdmEoY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaHN2YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHN2YTtcclxuICAgIH1cclxuXHJcbiAgICBvdXRwdXRGb3JtYXQoaHN2YTogSHN2YSwgb3V0cHV0Rm9ybWF0OiBzdHJpbmcsIGFscGhhQ2hhbm5lbDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKG91dHB1dEZvcm1hdCkge1xyXG4gICAgICAgICAgICBjYXNlICdoc2xhJzpcclxuICAgICAgICAgICAgICAgIGxldCBoc2xhID0gdGhpcy5oc3ZhMmhzbGEoaHN2YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHNsYVRleHQgPSBuZXcgSHNsYShNYXRoLnJvdW5kKChoc2xhLmgpICogMzYwKSwgTWF0aC5yb3VuZChoc2xhLnMgKiAxMDApLCBNYXRoLnJvdW5kKGhzbGEubCAqIDEwMCksIE1hdGgucm91bmQoaHNsYS5hICogMTAwKSAvIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaHN2YS5hIDwgMSB8fCBhbHBoYUNoYW5uZWwgPT09ICdhbHdheXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdoc2xhKCcgKyBoc2xhVGV4dC5oICsgJywnICsgaHNsYVRleHQucyArICclLCcgKyBoc2xhVGV4dC5sICsgJyUsJyArIGhzbGFUZXh0LmEgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnaHNsKCcgKyBoc2xhVGV4dC5oICsgJywnICsgaHNsYVRleHQucyArICclLCcgKyBoc2xhVGV4dC5sICsgJyUpJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmdiYSc6XHJcbiAgICAgICAgICAgICAgICBsZXQgcmdiYSA9IHRoaXMuZGVub3JtYWxpemVSR0JBKHRoaXMuaHN2YVRvUmdiYShoc3ZhKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaHN2YS5hIDwgMSB8fCBhbHBoYUNoYW5uZWwgPT09ICdhbHdheXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyByZ2JhLnIgKyAnLCcgKyByZ2JhLmcgKyAnLCcgKyByZ2JhLmIgKyAnLCcgKyBNYXRoLnJvdW5kKHJnYmEuYSAqIDEwMCkgLyAxMDAgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncmdiKCcgKyByZ2JhLnIgKyAnLCcgKyByZ2JhLmcgKyAnLCcgKyByZ2JhLmIgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZXhUZXh0KHRoaXMuZGVub3JtYWxpemVSR0JBKHRoaXMuaHN2YVRvUmdiYShoc3ZhKSksIGFscGhhQ2hhbm5lbCA9PT0gJ2Fsd2F5cycgfHwgYWxwaGFDaGFubmVsID09PSAnaGV4OCcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGV4VGV4dChyZ2JhOiBSZ2JhLCBhbGxvd0hleDg6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBoZXhUZXh0ID0gJyMnICsgKCgxIDw8IDI0KSB8IChyZ2JhLnIgPDwgMTYpIHwgKHJnYmEuZyA8PCA4KSB8IHJnYmEuYikudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcclxuICAgICAgICAvKmlmIChoZXhUZXh0WzFdID09PSBoZXhUZXh0WzJdICYmIGhleFRleHRbM10gPT09IGhleFRleHRbNF0gJiYgaGV4VGV4dFs1XSA9PT0gaGV4VGV4dFs2XSAmJiAhYWxsb3dIZXg4KSB7XHJcbiAgICAgICAgICAgIGhleFRleHQgPSAnIycgKyBoZXhUZXh0WzFdICsgaGV4VGV4dFszXSArIGhleFRleHRbNV07XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgaWYgKGFsbG93SGV4OCkge1xyXG4gICAgICAgICAgICBoZXhUZXh0ICs9ICgoMSA8PCA4KSB8IE1hdGgucm91bmQocmdiYS5hICogMjU1KSkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhleFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGVub3JtYWxpemVSR0JBKHJnYmE6IFJnYmEpOiBSZ2JhIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJnYmEoTWF0aC5yb3VuZChyZ2JhLnIgKiAyNTUpLCBNYXRoLnJvdW5kKHJnYmEuZyAqIDI1NSksIE1hdGgucm91bmQocmdiYS5iICogMjU1KSwgcmdiYS5hKTtcclxuICAgIH1cclxuXHJcbn0iXX0=