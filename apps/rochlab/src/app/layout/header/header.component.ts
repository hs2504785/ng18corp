import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@lib/services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private renderer = inject(Renderer2);
  private ngbModal = inject(NgbModal);
  authService = inject(AuthService);

  @ViewChild('navmenu') navmenu!: ElementRef;

  toggleMenu() {
    if (document.body.classList.contains('mobile-nav-active')) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.renderer.addClass(document.body, 'mobile-nav-active');
    // Listen for clicks outside to close the menu
    this.renderer.listen('window', 'click', this.onClickOutside.bind(this));
  }

  closeMenu() {
    this.renderer.removeClass(document.body, 'mobile-nav-active');
  }

  onClickOutside(event: Event) {
    // Check if the click was outside the menu and not on a navigation link
    if (!this.navmenu.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  async openLoginModal() {
    const { LoginComponent } = await import(
      '../../shared/components/login/login.component'
    );

    return this.ngbModal.open(LoginComponent, {
      centered: true,
    });
  }
}
