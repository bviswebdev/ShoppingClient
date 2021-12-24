import { Component, Input, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/Services/GlobalService/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  @Input('breakpoint')
  viewWidth: string = '';

  constructor(public breakPoint: BreakpointService) {}

  ngOnInit(): void {}
}
