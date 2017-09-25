import { User } from '../../../common/user.model';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export class ServerQueries
{
   public static GetAllUsers(): DocumentNode
   {
    return gql(`
        query Users($name: String) {
        users(name: $name) {
            firstName
            lastName
            emails {
            address
            verified
            }
        }
        }
    `);  
   }

   public static AddUser(user: User) {
    return gql(`
        mutation addUser(
            $firstName: String!
            $lastName: String!
            ) {
            addUser(
                firstName: $firstName
                lastName: $lastName
            ) {
                firstName
                lastName
                emails {
                address
                verified
                }
            }
        }
    
    `);
   }
}