import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css',
    imports: [RouterOutlet, RouterLink, FooterComponent]
})
export class NavBarComponent {
    menuActive = false;

    toggleMenu() {
        this.menuActive = !this.menuActive;
    }
}
