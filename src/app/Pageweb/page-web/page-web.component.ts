import { Component } from '@angular/core';

@Component({
  selector: 'app-page-web',
  templateUrl: './page-web.component.html',
  styleUrls: ['./page-web.component.css']
})
export class PageWebComponent {
  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
 

  ngOnInit() {
    this.toggleDropdown();

  }

  // creando la clase para que el menu la despliegue 
  toggleDropdown() {
  const toggleBtn = document.querySelector('.toggle_btn') as HTMLElement;
  const dropdownMenu = document.querySelector('.dropdown_menu') as HTMLElement;
  const toggleBtnIcon = document.querySelector('.toggle_btn i') as HTMLElement;

  toggleBtn.onclick = () => {
    dropdownMenu.classList.toggle('open');
    const isOpen = dropdownMenu.classList.contains('open');
    toggleBtnIcon.classList.toggle('fa-xmark', isOpen);
    toggleBtnIcon.classList.toggle('fa-bars', !isOpen);
  };}

 
}