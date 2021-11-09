import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss'],
})
export class ProductBannerComponent implements OnInit {
  slides = [
    { image: '../../assets/images/banner1.jpg' },
    { image: '../../assets/images/banner2.jpg' },
    { image: '../../assets/images/banner3.jpg' },
    { image: '../../assets/images/banner4.jpg' },
    { image: '../../assets/images/banner7.jpg' },
  ];

  //https://picsum.photos/seed/picsum/1200/300

  constructor() {}

  ngOnInit(): void {}
}
