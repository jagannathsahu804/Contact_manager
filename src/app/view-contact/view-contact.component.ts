import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { iContact } from '../models/iContact';
import { iGroup } from '../models/iGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId : string | null = null;
  public contact:iContact = {} as iContact;
  public errorMessage: string |null =null;
  public group:iGroup = {} as iGroup;

  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    },(error)=>{
      this.errorMessage = error;
    });
    if(this.contactId){
      this.loading=true;
      this.contactService.getContact(this.contactId).subscribe((data:iContact)=>{
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data:iGroup)=>{
          this.group = data;
        })
      });
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
