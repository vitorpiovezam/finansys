import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-pane',
  templateUrl: './navigation-pane.component.html',
  styleUrls: ['./navigation-pane.component.less']
})
export class NavigationPaneComponent implements OnInit {

  @Input()
  public collapsed = false;

  constructor() { }

  ngOnInit() {
  }

  collapse() {
    this.collapsed = !this.collapsed;
  }

}
