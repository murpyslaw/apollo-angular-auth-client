import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideApollo  } from '../apollo/Apollo';
import { ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { apolloClient } from './client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule.forRoot(apolloClient)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }