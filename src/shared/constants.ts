export class ApiRoutes {
    public static FindUserByEmail =  getLocalDomain() + "api/user/findUserByEmail";
    public static RegisterUser =  getLocalDomain() + "api/user/registerUser";
    public static UpdateUserAsVerified =  getLocalDomain() + "api/user/updateUserAsVerified";
    public static DeleteRejectedUser =  getLocalDomain() + "api/user/deleteRejectedUser";
    
    public static FilterCommunityBySearchTerm =  getLocalDomain() + "api/community/filterCommunitybySearchTerm";
    public static RegisterCommunity =  getLocalDomain() + "api/community/registerCommunity";
    public static GetAllUsers = getLocalDomain() + "api/user/getAllUsers";
    public static ViewAllPost = getLocalDomain() + "api/forum/viewAllPost";
    public static CreatePost = getLocalDomain() + "api/forum/createPost";
    public static DeletePost = getLocalDomain() + "api/forum/deletePost";
    public static GetSupplier = getLocalDomain() + "api/order/getSupplier";
    public static GetSupplierItems = getLocalDomain() + "api/order/getSupplier";
    public static CreateOrder = getLocalDomain() + "api/order/createOrder";
    
   
 

}

function getLocalDomain(){
    return "http://localhost:8080/";
}