import {Injectable} from '@angular/core';

@Injectable()
export class HeadStylesService {
  public sheet: Element;
  public tenantStyles: Element;

  setTenantStyles(css: string) {
    if (!this.tenantStyles) {
      this.tenantStyles = document.createElement('style');
      this.tenantStyles.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(this.tenantStyles);
    }
  }

  setTemplateStyles(css: string) {
    this.sheet.innerHTML = css;
  }

  createSheet() {
    if (!this.sheet) {
      this.sheet = document.createElement('style');
      document.getElementsByTagName('head')[0].appendChild(this.sheet);
    }
  }
}
