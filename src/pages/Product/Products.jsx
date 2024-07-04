import { deleteProduct, getProducts } from '../../features/product/productSlice';
import {  Pencil, Trash2 } from 'lucide-react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getProducts())
    
  }, [dispatch]);

  const {products, isLoading} = useSelector((state) => state.product);
  const error = useSelector((state) => state.product.message);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  },[error]);

  const handleProductDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      toast.success("Product deleted successfully");
      dispatch(getProducts());
    }).catch(() => {
      toast.error("Failed to delete product");
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  
  
  const data = products.map((product, index) => ({
    no: index + 1,
    img: product.images.length > 0 ? (
      <img src={product.images[0].url} width={50} height={50} alt="img" />
    ) : null,
    title: product.title,
    price: formatPrice(product.price),
    sold: product.sold,
    quantity: product.quantity,
    brand: product.brand,
    category: product.category,
    action: (
      <div className='flex gap-2'>
        <button>
          <Pencil onClick={() => navigate(`/admin/products/update-product/${product._id}`)} className='w-6 h-6 text-green-500 text-center hover:bg-gray-200 rounded p-[4px]' />
        </button>
        <Trash2
          onClick={() => handleProductDelete(product._id)}
          className='text-red-500 w-6 h-6 text-center hover:bg-gray-200 rounded p-[4px]'
        />
      </div>
    ),
  }));

  return (
    <div className="my-4">
      <div className='bg-white shadow-md rounded-sm border'>
      <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Active Products</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: data.length }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5"/></TableCell>
                  <TableCell><Skeleton className="h-10" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-24" /></TableCell>
                </TableRow>
              ))
            ) : (
              data.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.img}</TableCell>
                  <TableCell className="font-medium text-sm">{item.title}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.sold}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.action}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default Products;
