import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { iContact } from '../models/iContact';
import { iGroup } from '../models/iGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading:boolean =false;
  public contactId: string|null = null;
  public errorMessage : string | null =null;
  public contact : iContact = {} as iContact;
  public groups: iGroup[] = [] as iGroup[];

  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.contactId = param.get('contactId');
    });
    if(this.contactId){
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data:iContact)=>{
        this.contact = data;
        this.loading = false;
        this.contactService.getAllGroups().subscribe((data:iGroup[]) => {
          this.groups = data;
        });
      },(error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  public submitUpdate(){
    if(this.contactId){
      this.contactService.updateContact(this.contact,this.contactId).subscribe((data:iContact)=>{
        this.router.navigate(['/']).then();
      },(error)=>{
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      });
    }
  }
}
