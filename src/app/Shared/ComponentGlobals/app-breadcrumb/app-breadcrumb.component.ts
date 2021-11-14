import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-breadcrumb',
  templateUrl: './app-breadcrumb.component.html',
  styleUrls: ['./app-breadcrumb.component.scss'],
})
export class AppBreadcrumbComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const breadcrumb = {
      customText: 'This is Custom Text',
      dynamicText: 'Level 2 ',
    };
    //this.MatBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
  }
}

/*
updateBreadcrumb(): void {
  const breadcrumbs  =  [
    {
      label: 'page {{pageOneID}}',
      url: '/page1/:pageOneID'
    },
    {
      label: 'page {{pageTwoID}}',
      url: 'page1/:pageOneID/page2/:pageTwoID'
    },
    {
      label: 'page {{pageThreeID}}',
      url: 'page1/:pageOneID/page2/:pageTwoID/page3/:pageThreeID'
    },
    {
      label: 'Update Breadcrumb',
      url: ''
    }
  ];
  this.MatBreadcrumbService.updateBreadcrumb(breadcrumbs);
}*/
