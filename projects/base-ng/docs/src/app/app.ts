import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TocComponent } from './layout/toc/toc.component';

@Component({
  selector: 'docs-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, TocComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
