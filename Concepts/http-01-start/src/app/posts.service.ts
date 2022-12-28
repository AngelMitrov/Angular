import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { tap } from "rxjs/internal/operators/tap";
import { map } from "rxjs/operators";
import { Post } from "./posts.model";

@Injectable({ providedIn: 'root' })
export class PostsService {
    private url: string = 'https://ng-complete-guide-4956b-default-rtdb.europe-west1.firebasedatabase.app';
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post =
        {
            title: title,
            content: content
        }

        this.http
            .post<{ name: string }>(this.url + '/posts.json', postData, {
                headers: new HttpHeaders({
                    "Custom-Header": "Hello"
                }),
                observe: 'response'
            })
            .subscribe((data) => {
                console.log(data);
            }, error => {
                this.error.next(error.message);
            })
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('customKey', 'key');
        return this.http
            .get<{ [key: string]: Post }>(this.url + '/posts.json',
                {
                    headers: new HttpHeaders({ "Custom-Header": "Hello" }),
                    params: searchParams,
                    responseType: 'json'
                }
            )
            .pipe(
                map((resData) => {
                    const postsArray: Post[] = [];

                    for (const key in resData) {
                        if (resData.hasOwnProperty(key))
                            postsArray.push({ ...resData[key], id: key });
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            )
    }

    deletePosts() {
        return this.http.delete(this.url + '/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(tap(event => {
            if (event.type === HttpEventType.Sent) {
                //...
            }
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }))
    }
}