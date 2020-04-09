import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  paperModel =
    {
      article: '',
      type: '',
      blog: '',
      tag: ''

    };

  constructor(private location: Location,
              ) {
  }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back();
  }

  onSubmit(): void {
    console.log(this.paperModel);
    //this.paperService.create(this.paperService);
  }
}
