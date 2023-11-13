import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.highlightNavigationItem();

  }

  ngAfterViewInit() {
    const list = document.querySelectorAll('.navegation li') as NodeListOf<HTMLElement>;

    const toggleClass = (element: HTMLElement) => {
      list.forEach((item) =>
        item.classList.remove('hovered'));
      element.classList.add('hovered');
    }

    list.forEach((item) => {

      item.addEventListener('click', () => toggleClass(item));
    });
  }


  highlightNavigationItem() {
    const toggle = document.querySelector('.toggle') as HTMLElement;
    const navegation = document.querySelector('.navegation') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    toggle.onclick = () => {
      navegation.classList.toggle('active');
      main.classList.toggle('active');
      toggle.classList.toggle('active');
    }
  }
}