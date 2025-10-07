import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root', //the html nhung ung dung vao trang web chinh
  imports: [RouterOutlet, CommonModule], //routerOutlet: cho phep cac route cua ung dung hien thi noi dung, commonModule: cung cap cac directive co ban: @if, @for,..
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Ec');
}
//component goc
