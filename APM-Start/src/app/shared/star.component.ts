import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
  selector: "pm-star",
  styleUrls: ['./star.component.css'],
  templateUrl: './star.component.html'
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 0;
  cropWidth: number = 75;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();


  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
  }

  onClick(): void {
    console.log(`star sating ${this.rating}`)
    this.ratingClicked.emit("The rating is"+this.rating);
  }
}

