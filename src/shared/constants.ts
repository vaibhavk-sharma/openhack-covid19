export class ApiRoutes {
    public static FindUserByEmail =  getLocalDomain() + "api/user/findUserByEmail";
    public static RegisterUser =  getLocalDomain() + "api/user/registerUser";
    public static FilterCommunityBySearchTerm =  getLocalDomain() + "api/community/filterCommunitybySearchTerm";
    public static RegisterCommunity =  getLocalDomain() + "api/community/registerCommunity";
}

function getLocalDomain(){
    return "http://localhost:8080/";
}