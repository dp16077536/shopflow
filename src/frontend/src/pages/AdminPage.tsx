import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Loader2,
  Pencil,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { OrderStatus } from "../backend";
import type { Product } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProduct,
  useDeleteProduct,
  useGetAllOrders,
  useGetProductsByName,
  useIsAdmin,
  useIsStripeConfigured,
  useSetStripeConfiguration,
  useUpdateOrderStatus,
  useUpdateProduct,
} from "../hooks/useQueries";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  stockQuantity: "",
  featured: false,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.paid]: "bg-blue-100 text-blue-800",
  [OrderStatus.shipped]: "bg-purple-100 text-purple-800",
  [OrderStatus.delivered]: "bg-green-100 text-green-800",
};

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: products = [], isLoading: productsLoading } =
    useGetProductsByName();
  const { data: orders = [], isLoading: ordersLoading } = useGetAllOrders();
  const { data: stripeConfigured } = useIsStripeConfigured();

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const updateOrderStatus = useUpdateOrderStatus();
  const setStripeConfig = useSetStripeConfiguration();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteDialogId, setDeleteDialogId] = useState<bigint | null>(null);
  const [stripeDialogOpen, setStripeDialogOpen] = useState(false);
  const [stripeKey, setStripeKey] = useState("");
  const [stripeCountries, setStripeCountries] = useState("US,CA,GB");

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Login required</h2>
        <Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
      </main>
    );
  }

  if (adminLoading) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You do not have admin permissions.
        </p>
        <Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
      </main>
    );
  }

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: (Number(product.price) / 100).toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      stockQuantity: product.stockQuantity.toString(),
      featured: product.featured,
    });
    setDialogOpen(true);
  };

  const handleSaveProduct = () => {
    const req = {
      name: form.name,
      description: form.description,
      price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
      category: form.category,
      imageUrl: form.imageUrl,
      stockQuantity: BigInt(Number.parseInt(form.stockQuantity) || 0),
      featured: form.featured,
    };

    if (editingProduct) {
      updateProduct.mutate(
        { id: editingProduct.id, product: req },
        {
          onSuccess: () => {
            toast.success("Product updated!");
            setDialogOpen(false);
          },
          onError: () => toast.error("Failed to update product"),
        },
      );
    } else {
      addProduct.mutate(req, {
        onSuccess: () => {
          toast.success("Product added!");
          setDialogOpen(false);
        },
        onError: () => toast.error("Failed to add product"),
      });
    }
  };

  const handleDeleteProduct = (id: bigint) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        toast.success("Product deleted");
        setDeleteDialogId(null);
      },
      onError: () => toast.error("Failed to delete product"),
    });
  };

  const handleSaveStripe = () => {
    setStripeConfig.mutate(
      {
        secretKey: stripeKey,
        allowedCountries: stripeCountries.split(",").map((c) => c.trim()),
      },
      {
        onSuccess: () => {
          toast.success("Stripe configured!");
          setStripeDialogOpen(false);
        },
        onError: () => toast.error("Failed to configure Stripe"),
      },
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => setStripeDialogOpen(true)}
          data-ocid="admin.stripe.button"
        >
          <Settings className="w-4 h-4 mr-2" />
          {stripeConfigured ? "Stripe Configured ✓" : "Configure Stripe"}
        </Button>
      </div>

      <Tabs defaultValue="products" data-ocid="admin.tabs">
        <TabsList className="mb-6">
          <TabsTrigger value="products" data-ocid="admin.products.tab">
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" data-ocid="admin.orders.tab">
            Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="flex justify-end mb-4">
            <Button onClick={openAdd} data-ocid="admin.add.product.button">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>
          {productsLoading ? (
            <div
              className="flex justify-center py-8"
              data-ocid="admin.products.loading_state"
            >
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <Table data-ocid="admin.products.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground py-8"
                      >
                        No products yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product, idx) => (
                      <TableRow
                        key={product.id.toString()}
                        data-ocid={`admin.product.row.${idx + 1}`}
                      >
                        <TableCell>
                          <img
                            src={
                              product.imageUrl ||
                              `https://picsum.photos/seed/${product.id}/60/60`
                            }
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell className="font-medium max-w-[180px] truncate">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          ${(Number(product.price) / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {product.stockQuantity.toString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={product.featured ? "default" : "outline"}
                          >
                            {product.featured ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(product)}
                              data-ocid={`admin.product.${idx + 1}.edit_button`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => setDeleteDialogId(product.id)}
                              data-ocid={`admin.product.${idx + 1}.delete_button`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders">
          {ordersLoading ? (
            <div
              className="flex justify-center py-8"
              data-ocid="admin.orders.loading_state"
            >
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <Table data-ocid="admin.orders.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground py-8"
                      >
                        No orders yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order, idx) => (
                      <TableRow
                        key={order.id.toString()}
                        data-ocid={`admin.order.row.${idx + 1}`}
                      >
                        <TableCell className="font-mono text-sm">
                          #{order.id.toString()}
                        </TableCell>
                        <TableCell className="max-w-[120px] truncate text-xs">
                          {order.user.toString().substring(0, 12)}...
                        </TableCell>
                        <TableCell>{order.items.length}</TableCell>
                        <TableCell>
                          ${(Number(order.total) / 100).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(
                            Number(order.timestamp) / 1_000_000,
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(val) =>
                              updateOrderStatus.mutate(
                                { id: order.id, status: val as OrderStatus },
                                {
                                  onSuccess: () =>
                                    toast.success("Status updated"),
                                  onError: () =>
                                    toast.error("Failed to update status"),
                                },
                              )
                            }
                          >
                            <SelectTrigger
                              className={`w-32 h-8 text-xs ${STATUS_COLORS[order.status]}`}
                              data-ocid={`admin.order.${idx + 1}.status.select`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(OrderStatus).map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Product Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin.product.dialog">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="prod-name">Name</Label>
                <Input
                  id="prod-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  data-ocid="admin.product.name.input"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="prod-desc">Description</Label>
                <Textarea
                  id="prod-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  data-ocid="admin.product.description.textarea"
                />
              </div>
              <div>
                <Label htmlFor="prod-price">Price (USD)</Label>
                <Input
                  id="prod-price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  data-ocid="admin.product.price.input"
                />
              </div>
              <div>
                <Label htmlFor="prod-stock">Stock Quantity</Label>
                <Input
                  id="prod-stock"
                  type="number"
                  value={form.stockQuantity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stockQuantity: e.target.value }))
                  }
                  data-ocid="admin.product.stock.input"
                />
              </div>
              <div>
                <Label htmlFor="prod-cat">Category</Label>
                <Input
                  id="prod-cat"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  data-ocid="admin.product.category.input"
                />
              </div>
              <div>
                <Label htmlFor="prod-img">Image URL</Label>
                <Input
                  id="prod-img"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  data-ocid="admin.product.image.input"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="prod-featured"
                  checked={form.featured}
                  onCheckedChange={(checked) =>
                    setForm((f) => ({ ...f, featured: checked }))
                  }
                  data-ocid="admin.product.featured.switch"
                />
                <Label htmlFor="prod-featured">Featured</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.product.cancel.button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProduct}
              disabled={
                addProduct.isPending || updateProduct.isPending || !form.name
              }
              data-ocid="admin.product.save.button"
            >
              {addProduct.isPending || updateProduct.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={deleteDialogId !== null}
        onOpenChange={(o) => !o && setDeleteDialogId(null)}
      >
        <DialogContent data-ocid="admin.delete.dialog">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogId(null)}
              data-ocid="admin.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteDialogId && handleDeleteProduct(deleteDialogId)
              }
              disabled={deleteProduct.isPending}
              data-ocid="admin.delete.confirm_button"
            >
              {deleteProduct.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stripe Config Dialog */}
      <Dialog open={stripeDialogOpen} onOpenChange={setStripeDialogOpen}>
        <DialogContent data-ocid="admin.stripe.dialog">
          <DialogHeader>
            <DialogTitle>Configure Stripe Payments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="stripe-key">Stripe Secret Key</Label>
              <Input
                id="stripe-key"
                type="password"
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                placeholder="sk_live_..."
                data-ocid="admin.stripe.key.input"
              />
            </div>
            <div>
              <Label htmlFor="stripe-countries">
                Allowed Countries (comma-separated)
              </Label>
              <Input
                id="stripe-countries"
                value={stripeCountries}
                onChange={(e) => setStripeCountries(e.target.value)}
                placeholder="US,CA,GB"
                data-ocid="admin.stripe.countries.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStripeDialogOpen(false)}
              data-ocid="admin.stripe.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveStripe}
              disabled={!stripeKey || setStripeConfig.isPending}
              data-ocid="admin.stripe.save_button"
            >
              {setStripeConfig.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Configuration"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
