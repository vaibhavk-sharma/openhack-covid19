import { Address } from './user.model';

export class Community {
    public communityId?: string;
    public name: string;
    public address: Address;
}

export class RegisterCommunityInput {
    public community: Community;
}