import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';


export interface data {
  id: string;
}

@Component({
  selector: 'app-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppComponent>,
  ) { }

  submited = false;
  propertyData: FormGroup;
  units = ["sq. mm","sq. cm","sq. m","sq. km"]

  ngOnInit(): void {
    this.propertyData = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      size: ['', Validators.required],
      unit: [this.units[0]]
    })
  }

  addProperty(){
    if(!this.propertyData.valid){
      return false;
    }
    this.submited = true;
    this.dialogRef.close({data: this.propertyData});
  }

}
