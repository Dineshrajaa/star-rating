import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input()
  starProperty: StarProperties = new StarProperties();

  @Input()
  rating = 0.5;

  @Output()
  ratingChange: EventEmitter<number> = new EventEmitter();

  public starList: Star[];

  public starStyles: { [key: string]: string | number } = {};

  constructor() { }

  ngOnInit() {
    /**
     * Configure star properties
     */
    this.initializeStars();
  }

  /**
   * Configure star properties and initialize rating
   */
  initializeStars() {
    this.starStyles = {
      color: this.starProperty.color,
      'margin-right.px': this.starProperty.margin,
      'font-size.px': this.starProperty.size
    };

    this.starList = Array.from(new Array(this.starProperty.count)).map((elem, index) => new Star(index));
    this.setRating(this.rating);
  }

  /**
   * Method to set the rating by rounding of and filling the stars
   * @param rating - Rating value selected
   */
  setRating(rating: number) {
    this.rating = Math.round(rating * 2) / 2;
    this.starList.forEach(star => {
      const starNumber = star.position + 1;
      if (this.rating >= starNumber) {
        star.className = 'fa-star';
      } else if (this.rating > starNumber - 1 && this.rating < starNumber) {
        star.className = 'fa-star-half-o';
      } else {
        star.className = 'fa-star-o';
      }
    });
  }

  onStarClick(event: MouseEvent, clickedStar: Star) {
    // lock in current rating
    if (this.starProperty.readOnly) {
      return;
    }
    const starIcon = event.target as HTMLElement;
    const clickedInFirstHalf = event.pageX < starIcon.getBoundingClientRect().left + starIcon.offsetWidth / 2;
    this.rating = clickedStar.position + (clickedInFirstHalf ? 0.5 : 1);
    this.setRating(this.rating);
    this.ratingChange.emit(this.rating);
  }

}

export class Star {
  position: number;
  className: string;

  constructor(position: number) {
    this.position = position;
    this.className = 'fa-star-o';
  }
}

export class StarProperties {
  public readOnly?: boolean;
  public count?: number;
  public margin?: number;
  public color?: string;
  public size?: number;
  constructor() {
    this.initializeDefaultProperties();
  }

  initializeDefaultProperties() {
    this.readOnly = false;
    this.count = 5;
    this.margin = 25;
    this.color = 'red';
    this.size = 24;
  }
}
