import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  assignmentForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.assignmentForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.forbidProjectNames.bind(CustomValidators)], [CustomValidators.asyncForbidProjectNamesAsync.bind(CustomValidators)]),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'project-status': new FormControl("Critical")
    })
  }

  onSubmit() {
    console.log(this.assignmentForm)
    this.assignmentForm.reset();
  }

}
