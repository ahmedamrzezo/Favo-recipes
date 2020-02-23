import { Directive, HostListener, HostBinding, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click') dropToggle() {
    this.el.nativeElement.parentNode.classList.toggle('show');
    this.el.nativeElement.nextSibling.classList.toggle('show');
  }

}
