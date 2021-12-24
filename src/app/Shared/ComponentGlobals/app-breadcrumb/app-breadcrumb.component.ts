import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IBreadCrumb } from './breadcrumb.interface';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './app-breadcrumb.component.html',
  styleUrls: ['./app-breadcrumb.component.scss'],
})
export class AppBreadcrumbComponent implements OnInit {
  @Input('singleColPage')
  singleColumn: boolean = false;

  public breadcrumbs!: IBreadCrumb[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadCrumbService: BreadcrumbService
  ) {
    //this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    this.buildBreadCrumb(this.activatedRoute.root).then((b) => {
      this.breadcrumbs = b;
    });
    /*this.breadcrumbs = [
      {
        label: 'Dashboard',
        url: '/dashboard',
      },
      {
        label: 'IT Helpdesk',
        url: '/dashboard/it-helpdesk',
      },
      {
        label: 'Issue Log',
        url: '/dashboard/it-helpdesk/issue-log',
      },
      {
        label: 'plfOR05NXxQ1',
        url: '/dashboard/it-helpdesk/issue-log/plfOR05NXxQ1',
      },
    ];*/
  }

  ngOnInit(): void {
    /*this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        
        //this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });*/
    //this.MatBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
  }

  async buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadCrumb[] = []
  ): Promise<IBreadCrumb[]> {
    //If no routeConfig is avalailable we are on the root path
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : '';
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    let labelDynamickey =
      route.routeConfig &&
      route.routeConfig.data &&
      route.routeConfig.data.breadcrumbkey
        ? route.routeConfig.data.breadcrumbkey
        : '';

    if (label === undefined) label = '';
    if (path === undefined) path = '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();

    if (lastRoutePart) {
      const isDynamicRoute = lastRoutePart.startsWith(':');

      if (isDynamicRoute && !!route.snapshot) {
        const paramName = lastRoutePart?.split(':')[1];

        if (paramName) {
          path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
          if (labelDynamickey) {
            if (labelDynamickey === 'category') {
              label = route.snapshot.params[paramName];
              /*label = await this.breadCrumbService.getCategoryNameById(
                route.snapshot.params[paramName],
                labelDynamickey
              );*/
            }
            if (labelDynamickey === 'product') {
              label = await this.breadCrumbService.getProductNameById(
                route.snapshot.params[paramName],
                labelDynamickey
              );
            }
          } else {
            label = route.snapshot.params[paramName];
          }
        }
      }
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
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
