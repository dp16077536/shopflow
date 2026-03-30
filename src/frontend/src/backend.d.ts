import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateProductRequest {
    stockQuantity: bigint;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ClearCartResponse {
    message: string;
    cleared: boolean;
}
export interface OrderItem {
    productId: bigint;
    quantity: bigint;
    price: bigint;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    total: bigint;
    user: Principal;
    timestamp: bigint;
    items: Array<OrderItem>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface AddProductRequest {
    stockQuantity: bigint;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    stockQuantity: bigint;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface UserProfile {
    name: string;
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    paid = "paid",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: AddProductRequest): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<ClearCartResponse>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(): Promise<bigint>;
    deleteProduct(id: bigint): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(id: bigint): Promise<Order>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getProductsByName(): Promise<Array<Product>>;
    getProductsByPrice(): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isProductFeatured(productId: bigint): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeFromCart(productId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCart(productId: bigint, quantity: bigint): Promise<void>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<void>;
    updateProduct(id: bigint, product: UpdateProductRequest): Promise<void>;
}
