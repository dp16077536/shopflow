import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import OutCall "http-outcalls/outcall";
import Stripe "stripe/stripe";
import Array "mo:core/Array";
import AccessControl "authorization/access-control";

actor {
  // ---------- Types ----------
  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : Text;
    stockQuantity : Nat;
    featured : Bool;
  };

  type OrderItem = {
    productId : Nat;
    quantity : Nat;
    price : Nat;
  };

  public type OrderStatus = {
    #pending;
    #paid;
    #shipped;
    #delivered;
  };

  public type Order = {
    id : Nat;
    user : Principal;
    items : [OrderItem];
    total : Nat;
    status : OrderStatus;
    timestamp : Int;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  // ---------- Mixins ----------
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ---------- Products ----------
  let products = Map.empty<Nat, Product>();
  var nextProductId = 1;

  module ProductInternal {
    public func compareById(a : Product, b : Product) : Order.Order {
      Nat.compare(a.id, b.id);
    };
    public func compareByName(a : Product, b : Product) : Order.Order {
      switch (Text.compare(a.name, b.name)) {
        case (#equal) { compareById(a, b) };
        case (order) { order };
      };
    };

    public func compareByPrice(a : Product, b : Product) : Order.Order {
      switch (Nat.compare(a.price, b.price)) {
        case (#equal) { compareById(a, b) };
        case (order) { order };
      };
    };
  };

  // ---------- Cart ----------
  let carts = Map.empty<Principal, List.List<CartItem>>();

  // ---------- Orders ----------
  let orders = Map.empty<Nat, Order>();
  var nextOrderId = 1;

  module OrderInternal {
    public func compare(a : Order, b : Order) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // ---------- User Profiles ----------
  let userProfiles = Map.empty<Principal, UserProfile>();

  // ---------- User Profile Management ----------
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ---------- Product Management ----------
  // Get all products with optional filtering, sorting, and pagination
  public query func getProductsByName() : async [Product] {
    products.values().toArray().sort(ProductInternal.compareByName);
  };

  public query func getProductsByPrice() : async [Product] {
    products.values().toArray().sort(ProductInternal.compareByPrice);
  };

  public query func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (?product) { product };
      case (null) { Runtime.trap("Product not found") };
    };
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(product) { product.category == category });
  };

  public type AddProductRequest = {
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : Text;
    stockQuantity : Nat;
    featured : Bool;
  };

  public shared ({ caller }) func addProduct(product : AddProductRequest) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let newProduct : Product = {
      id = nextProductId;
      name = product.name;
      description = product.description;
      price = product.price;
      imageUrl = product.imageUrl;
      category = product.category;
      stockQuantity = product.stockQuantity;
      featured = product.featured;
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
    newProduct.id;
  };

  public type UpdateProductRequest = {
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : Text;
    stockQuantity : Nat;
    featured : Bool;
  };

  public shared ({ caller }) func updateProduct(id : Nat, product : UpdateProductRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product does not exist! ");
    };
    let updatedProduct : Product = {
      id = id;
      name = product.name;
      description = product.description;
      price = product.price;
      imageUrl = product.imageUrl;
      category = product.category;
      stockQuantity = product.stockQuantity;
      featured = product.featured;
    };
    products.add(id, updatedProduct);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  // ---------- Cart Management ----------
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };
    if (not products.containsKey(productId)) {
      Runtime.trap("Product not found");
    };
    let cart = switch (carts.get(caller)) {
      case (?cart) { cart };
      case (null) { List.empty<CartItem>() };
    };
    let existing = cart.findIndex(func(item) { item.productId == productId });
    switch (existing) {
      case (?index) {
        let currentQuantity = cart.at(index).quantity;
        cart.put(index, {
          productId;
          quantity = currentQuantity + quantity;
        });
      };
      case (null) {
        cart.add({ productId; quantity = quantity });
      };
    };
    carts.add(caller, cart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access cart");
    };
    switch (carts.get(caller)) {
      case (?cart) { cart.toArray() };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    switch (carts.get(caller)) {
      case (?cart) {
        let filtered = cart.filter(func(item) { item.productId != productId });
        if (filtered.size() == 0) {
          carts.remove(caller);
        } else {
          carts.add(caller, filtered);
        };
      };
      case (null) { Runtime.trap("No cart to remove from") };
    };
  };

  public shared ({ caller }) func updateCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };
    switch (carts.get(caller)) {
      case (?cart) {
        let index = cart.findIndex(func(item) { item.productId == productId });
        switch (index) {
          case (?i) {
            cart.put(i, { productId; quantity = quantity });
            carts.add(caller, cart);
          };
          case (null) { Runtime.trap("Item not found in cart") };
        };
      };
      case (null) { Runtime.trap("No cart to update") };
    };
  };

  public type ClearCartResponse = {
    cleared : Bool;
    message : Text;
  };

  public shared ({ caller }) func clearCart() : async ClearCartResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    if (carts.containsKey(caller)) {
      carts.remove(caller);
      {
        cleared = true;
        message = "Cart cleared successfully";
      };
    } else {
      {
        cleared = false;
        message = "Cart already empty";
      };
    };
  };

  // ---------- Order Management ----------
  public shared ({ caller }) func createOrder() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };
    let cart = switch (carts.get(caller)) {
      case (?cart) { cart.toArray() };
      case (null) { Runtime.trap("Your cart is empty") };
    };

    if (cart.size() == 0) { Runtime.trap("Your cart is empty") };

    var total : Nat = 0;
    let orderItems = cart.map(
      func(item) {
        switch (products.get(item.productId)) {
          case (?product) {
            if (product.stockQuantity < item.quantity) {
              Runtime.trap("Not enough stock for product: " # product.name);
            };
            total += product.price * item.quantity;
            { productId = item.productId; quantity = item.quantity; price = product.price };
          };
          case (null) { Runtime.trap("Product not found") };
        };
      }
    );

    let order : Order = {
      id = nextOrderId;
      user = caller;
      items = orderItems;
      total;
      status = #pending;
      timestamp = Time.now();
    };

    orders.add(nextOrderId, order);
    carts.remove(caller);
    nextOrderId += 1;
    order.id;
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    orders.values().toArray().filter(func(order) { order.user == caller });
  };

  public query ({ caller }) func getOrder(id : Nat) : async Order {
    switch (orders.get(id)) {
      case (?order) {
        if (order.user == caller or AccessControl.isAdmin(accessControlState, caller)) {
          order;
        } else {
          Runtime.trap("Not authorized to view this order");
        };
      };
      case (null) { Runtime.trap("Order not found") };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray().sort();
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };
    switch (orders.get(id)) {
      case (?order) {
        let updatedOrder = {
          order with
          status;
        };
        orders.add(id, updatedOrder);
      };
      case (null) { Runtime.trap("Order not found") };
    };
  };

  public query ({ caller }) func isProductFeatured(productId : Nat) : async Bool {
    switch (products.get(productId)) {
      case (?product) { product.featured };
      case (null) { Runtime.trap("Product not found") };
    };
  };

  // Seed some sample products on deployment (constructor)
  func seedProducts() {
    // Check if already seeded by IDs
    let existingIds : [Nat] = [1, 2, 3, 4, 5, 6];
    if (existingIds.all(func(id) { products.containsKey(id) })) {
      // Already seeded, skip
      return;
    };

    let sampleProducts : [Product] = [
      {
        id = nextProductId;
        name = "T-Shirt";
        description = "A cool t-shirt";
        price = 2000;
        imageUrl = "https://example.com/tshirt.jpg";
        category = "Clothing";
        stockQuantity = 10;
        featured = false;
      },
      {
        id = nextProductId + 1;
        name = "Mug";
        description = "A coffee mug";
        price = 1000;
        imageUrl = "https://example.com/mug.jpg";
        category = "Home";
        stockQuantity = 20;
        featured = false;
      },
      {
        id = nextProductId + 2;
        name = "Book";
        description = "A great book";
        price = 1500;
        imageUrl = "https://example.com/book.jpg";
        category = "Books";
        stockQuantity = 5;
        featured = false;
      },
      {
        id = nextProductId + 3;
        name = "Headphones";
        description = "Awesome headphones";
        price = 5000;
        imageUrl = "https://example.com/headphones.jpg";
        category = "Electronics";
        stockQuantity = 8;
        featured = false;
      },
      {
        id = nextProductId + 4;
        name = "Backpack";
        description = "A sturdy backpack";
        price = 3000;
        imageUrl = "https://example.com/backpack.jpg";
        category = "Bags";
        stockQuantity = 12;
        featured = false;
      },
      {
        id = nextProductId + 5;
        name = "Sneakers";
        description = "Cool sneakers";
        price = 4000;
        imageUrl = "https://example.com/sneakers.jpg";
        category = "Shoes";
        stockQuantity = 15;
        featured = false;
      },
    ];

    for (p in sampleProducts.values()) {
      products.add(p.id, p);
    };

    nextProductId += sampleProducts.size();
  };

  // Seed products once when canister is deployed or upgraded
  system func preupgrade() { () };
  system func postupgrade() {
    seedProducts();
  };

  // --- Stripe Integration ---
  var configuration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
