export class ApiRoutes {
    public static FindUserByEmail =  getLocalDomain() + "api/user/findUserByEmail";
    public static RegisterUser =  getLocalDomain() + "api/user/registerUser";
    public static UpdateUserAsVerified =  getLocalDomain() + "api/user/updateUserAsVerified";
    public static DeleteRejectedUser =  getLocalDomain() + "api/user/deleteRejectedUser";    
    public static GetAllUsers = getLocalDomain() + "api/user/getAllUsers";

    public static FilterCommunityBySearchTerm =  getLocalDomain() + "api/community/filterCommunitybySearchTerm";
    public static RegisterCommunity =  getLocalDomain() + "api/community/registerCommunity";
    public static ViewAllPost = getLocalDomain() + "api/forum/viewAllPost";
    public static CreatePost = getLocalDomain() + "api/forum/createPost";
    public static DeletePost = getLocalDomain() + "api/forum/deletePost";
    public static GetSupplier = getLocalDomain() + "api/order/getSupplier";
    public static GetSupplierItems = getLocalDomain() + "api/order/getSupplierItems";
    public static CreateOrder = getLocalDomain() + "api/order/createOrder";
        
    public static GetSupplierInfoBySupplierId =  getLocalDomain() + "api/supplier/GetSupplierInfoBySupplierId";
    public static SaveSupplierItemInfo = getLocalDomain() + "api/supplier/SaveSupplierItemInfo";
    public static GetOrders = getLocalDomain() + "api/order/getOrders";
    public static UpdateOrderStatus = getLocalDomain() + "api/order/updateOrderStatus";
}

function getLocalDomain(){
    return "http://localhost:8080/";
}

export class OrderStatus {
    public static Initiated = 'initiated';
    public static Confirmed = 'confirmed';
    public static NotConfirmed = 'notconfirmed';
    public static PaymentInitiated = 'paymentinitiated';
    public static PaymentVerified = 'paymentverified';
    public static Cancelled = 'cancelled';
    public static Completed = 'completed';
}