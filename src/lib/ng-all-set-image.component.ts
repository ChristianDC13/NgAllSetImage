import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgAllSetImageService } from './ng-all-set-image.service';

@Component({
  selector: 'NgAllSetImage',
  templateUrl: `ng-all-set-image.component.html`,
  styleUrls: ['./ng-all-set-image.component.css'],
})
export class NgAllSetImageComponent implements OnInit, OnDestroy {
  @Input() src: string = '';
  @Input() defaultImage: string = '';
  @Input() alt: string = '';
  @Input() conainerClass: string = '';
  @Input() imageClass: string = '';
  @Input() containerStyles: string = '';
  @Input() imageStyle: string = '';
  @Input() captionStyle: string = '';
  @Input() captionClass: string = '';
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() caption: string = '';

  @Output() onImageLoaded: EventEmitter<any> = new EventEmitter();
  constructor(private ngAllSetImageService: NgAllSetImageService) {
    if (!this.defaultImage) {
      this.defaultImage = this.ngAllSetImageService.defaultImage;
    }
  }

  ngOnInit(): void {
    this.checkRequiredFields(this.src, 'src');
    this.checkRequiredFields(this.alt, 'alt');
    document.addEventListener('DOMContentLoaded', this.lazyLoadImage);
  }

  checkRequiredFields(input: any, tag: string) {
    if (!input) {
      throw new Error(`Attribute '${tag}' is required`);
    }
  }

  lazyLoadImage = () => {
    const src = this.src;
    const lazyImages: any = [].slice.call(
      document.getElementsByClassName(this.id)
    );

    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage: any = entry.target;
              lazyImage.src = src;
              // lazyImage.classList.remove(this.id);
              lazyImageObserver.unobserve(lazyImage);
              this.onImageLoaded.emit(lazyImage);
            }
          });
        }
      );
      lazyImages.forEach((lazyImage: any) => {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // this.handleError();
    }
  };

  handleError() {
    const element: any = document.getElementById(this.id);

    if (element) {
      const currentSrc = element.src;
      if (currentSrc !== this.defaultImage) {
        element.src = this.defaultImage;
      }
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('DOMContentLoaded', this.lazyLoadImage);
  }
}
