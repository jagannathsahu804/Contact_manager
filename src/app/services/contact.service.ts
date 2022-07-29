import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { iContact } from '../models/iContact';
import { iGroup } from '../models/iGroup';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  serverUrl: string = `http://localhost:9000`; //json-server url

  constructor(private httpClient:HttpClient) { }

  public getAllContacts(): Observable<iContact[]>{
    let dataUrl:string = `${this.serverUrl}/contacts`
    return this.httpClient.get<iContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //GET single contact
  public getContact(contactId: string) :Observable<iContact>{
    let dataUrl :string = `${this.serverUrl}/contacts/${contactId}`; 
    return this.httpClient.get<iContact>(dataUrl).pipe(catchError(this.handleError));
  }
  //Create a Contact
  public createContact(contact: iContact): Observable<iContact>{
    let dataUrl:string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<iContact>(dataUrl, contact).pipe(catchError(this.handleError))
  }

  //Update a Contact
  public updateContact(contact: iContact, contactId : string): Observable<iContact>{
    let dataUrl:string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<iContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }

  //Delete a Contact
  public deleteContact(contactId: string): Observable<{}>{
    let dataUrl:string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }

  //GET All Groups
  public getAllGroups(): Observable<iGroup[]>{
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<iGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //GET Single Group
  public getGroup(contact: iContact): Observable<iGroup>{
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<iGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      //client Error
      errorMessage = `Error : ${error.error.message} `
    }else{
      //server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage);
  }

}
