import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpErrorResponse, HttpParams, HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://apiitt.shivrajdeopa.com';
  //public url = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  //get all users
  public getAllUsers() {
    let response = this.http.get(`${this.url}/api/v1/users/view/all?authToken=${Cookie.get('authtoken')}`);
    return response;
  }
  //get users details
  public getUserInfo(id) {
    let response = this.http.get(`${this.url}/api/v1/users/${id}/details?authToken=${Cookie.get('authtoken')}`);
    return response;
  }

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('type', data.type)
      .set('email', data.email)
      .set('password', data.password)


    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  } //end signup function



  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of signin function



  public logout(data): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))
      .set('userId', data)
    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function

  //////////////////////////Issue related api///////////////////////////////

  //upload Issue
  public createIssue(data) {

    // Creating a user obj for repoter info
    let reporter = [];
    let name = `${this.getUserInfoFromLocalStorage().firstName} ${this.getUserInfoFromLocalStorage().lastName}`
    let userId = this.getUserInfoFromLocalStorage().userId
    let reporterObj = {
      name: name,
      userId: userId
    }
    reporter.push(reporterObj);
    // stringify the object for sending
    let reporterArray = JSON.stringify(reporter)

    // stringify the object for sending
    let assigneeArray = JSON.stringify(data.assignee)
    const fd = new FormData();
    fd.append('image', data.screenshot)
    fd.append('title', data.title)
    fd.append('status', data.status)
    fd.append('description', data.description)
    fd.append('assignee', assigneeArray)
    fd.append('reporter', reporterArray)
    return this.http.post(`${this.url}/api/v1/issue/create`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  //upload Issue
  public editIssue(data) {
    // stringify the object for sending
    let assigneeArray = JSON.stringify(data.assignee)
    let reportArray = JSON.stringify(data.reporter)

    const fd = new FormData();
    fd.append('image', data.screenshot)
    fd.append('title', data.title)
    fd.append('status', data.status)
    fd.append('description', data.description)
    fd.append('assignee', assigneeArray)
    fd.append('reporter', reportArray)
    fd.append('previous', data.previous)
    return this.http.post(`${this.url}/api/v1/issue/${data.id}/edit`, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
  //get all Issue
  public getAllIssue(pageSize, pageIndex, sort) {
    let response = this.http.get(`${this.url}/api/v1/issue/all?pageSize=${pageSize}&pageIndex=${pageIndex}&sort=${sort}&authToken=${Cookie.get('authtoken')}`);
    return response;
  }
  //end of get all issue

  //search Issue
  public searchIssue(name) {
    let response = this.http.get(`${this.url}/api/v1/issue/${name}/search?authToken=${Cookie.get('authtoken')}`);
    return response;
  }

  //end of search issue
  //get users details

  public getIssueInfo(id) {
    let response = this.http.get(`${this.url}/api/v1/issue/${id}/view?authToken=${Cookie.get('authtoken')}`);
    return response;
  }
  /**

   * post a commet

   */

  public postComment(data) {
    // Creating a user obj for repoter info
    let reporter = [];
    let name = `${this.getUserInfoFromLocalStorage().firstName} ${this.getUserInfoFromLocalStorage().lastName}`
    let userId = this.getUserInfoFromLocalStorage().userId
    let reporterObj = {
      name: name,
      userId: userId,
      comment: data.comment
    }
    reporter.push(reporterObj);
    let reportArray = JSON.stringify(reporterObj)
    const params = new HttpParams()
      .set('comment', reportArray)
      .set('authToken', Cookie.get('authtoken'))
    return this.http.post(`${this.url}/api/v1/issue/${data.id}/addComment`, params);
  }
  /**

   * Add as watching

   */

  public addWatchee(id) {
    // Creating a user obj for repoter info

    let reporter = [];
    let name = `${this.getUserInfoFromLocalStorage().firstName} ${this.getUserInfoFromLocalStorage().lastName}`
    let userId = this.getUserInfoFromLocalStorage().userId

    let reporterObj = {
      name: name,
      userId: userId,
    }
    reporter.push(reporterObj);
    let reportArray = JSON.stringify(reporterObj)
    const params = new HttpParams()
      .set('watching', reportArray)
      .set('authToken', Cookie.get('authtoken'))
    return this.http.post(`${this.url}/api/v1/issue/${id}/addWatchee`, params);
  }
  /**

   * Add Assignee

   */
  public addAssignee(data) {
    let assigneeArray = JSON.stringify(data.assignee)
    const params = new HttpParams()
      .set('assignee', assigneeArray)
      .set('authToken', Cookie.get('authtoken'))
    return this.http.post(`${this.url}/api/v1/issue/${data.id}/addAssignee`, params);
  }

  /**

* Add as watching

*/
  public delete(id, pervious) {
    const params = new HttpParams()
      .set('previous', pervious)
      .set('authToken', Cookie.get('authtoken'))
    return this.http.post(`${this.url}/api/v1/issue/${id}/delete`, params);
  }

  //get notification for user
  public getUserNotification(id) {
    let response = this.http.get(`${this.url}/api/v1/issue/${id}/notification?authToken=${Cookie.get('authtoken')}`);
    return response;
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError
}
