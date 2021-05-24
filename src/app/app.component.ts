import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'property-management-system2';
  constructor(
    public dialog: MatDialog,
    private appService: AppService
    ){

  }
  properties = []

  ngOnInit(): void {
    this.appService.getPropertyList().subscribe(
      data => {
        console.log(data)
        this.properties = data.records
      }
    )
  }

  createProperty(name, description, size, unit){
    let data = {
      name: name,
      description: description,
      size: size,
      unit: unit
    }
    return data;
  }

  addProperty(){
    const dialogRef = this.dialog.open(AddPropertyComponent);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          console.log(data)
          data = data.data;
          let t = this.createProperty(data.get("name").value, data.get("description").value, data.get("size").value, data.get("unit").value)
          this.appService.addProperty(t).subscribe(
            data => {
              console.log(data)
              this.properties.push(data.records[0])
            }
          )

        }
      }
    )
  }
  deleteProperty(property, i){
    let id = property.id
    this.appService.deleteProperty(id).subscribe(
      data => {
        console.log(data);
      }
    )
    for(let j=i;j<this.properties.length-1;j++){
      this.properties[j] = this.properties[j+1]
    }
    this.properties.pop();
  }
}
