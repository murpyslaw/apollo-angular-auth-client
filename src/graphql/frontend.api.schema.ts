//  This file was automatically generated and should not be edited.
/* tslint:disable */

export interface AddUserMutationVariables {
    firstName: string;
    lastName: string;
  }
  
  export interface AddUserMutation {
    addUser: {
      firstName: string | null,
      lastName: string | null,
      emails: Array< {
        address: string | null,
        verified: boolean | null,
      } > | null,
    } | null;
  }
  
  export interface UsersQueryVariables {
    name: string | null;
  }
  
  export interface UsersQuery {
    users: Array< {
      firstName: string | null,
      lastName: string | null,
      emails: Array< {
        address: string | null,
        verified: boolean | null,
      } > | null,
    } > | null;
  }
  /* tslint:enable */