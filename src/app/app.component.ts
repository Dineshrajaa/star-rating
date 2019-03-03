import { Component } from '@angular/core';
import { StarProperties } from './star-rating/star-rating.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'star-rating';
  currentRating = '3.5';
  public starProperty: StarProperties = new StarProperties();
  constructor() {
    this.starProperty.color = 'green';
    this.starProperty.margin = 0;
  }

  ratingOutPut(rating) {
    console.warn('The new rating value is:', rating);
  }
}
