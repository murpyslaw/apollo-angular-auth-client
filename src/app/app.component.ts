import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Subject } from 'rxjs/Subject';
import { DocumentNode } from 'graphql';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import { ServerQueries } from '../graphql/server.queries'
import { User } from '../../../common/user.model';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AddUserMutation, UsersQuery } from '../graphql/frontend.api.schema';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  // Observable with GraphQL result
  public users: ApolloQueryObservable<UsersQuery>;
  public firstName: string;
  public lastName: string;
  public nameControl = new FormControl();
  // Observable variable of the graphql query
  public nameFilter: Subject<string> = new Subject<string>();
  private apollo: Apollo;

  // Inject Angular2Apollo service
  constructor(apollo: Apollo) {
    this.apollo = apollo;
  }

  public ngOnInit() {
    // Query users data with observable variables
    this.users = this.apollo.watchQuery<UsersQuery>({
      query: ServerQueries.GetAllUsers(),
      variables: {
        name: this.nameFilter,
      },
    })
      // Return only users, not the whole ApolloQueryResult
      .map(result => result.data.users) as any;

    // Add debounce time to wait 300 ms for a new change instead of keep hitting the server
    this.nameControl.valueChanges.debounceTime(300).subscribe(name => {
      this.nameFilter.next(name);
    });
  }

  public ngAfterViewInit() {
    // Set nameFilter to null after NgOnInit happend and the view has been initated
    this.nameFilter.next(null);
  }

  public newUser(firstName: string) {
    let user = new User(firstName, "", "", "", "USA", "TAMU", "1");
    // Call the mutation called addUser
    this.apollo.mutate<AddUserMutation>({
      mutation: ServerQueries.AddUser(user),
      variables: {
        firstName,
        lastName: this.lastName,
      },
    })
    .subscribe(
        (user) => {
          let data = user.data.addUser;
          console.log('got a new user', data.firstName + data.lastName);
        }
      );
  }
}