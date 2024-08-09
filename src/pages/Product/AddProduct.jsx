import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState} from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import { getBrands } from "@/features/brand/brandSlice"
import { getColors } from "@/features/ProductColor/colorSlice"
import { getProductCategorys } from "@/features/productCategory/pCategorySlice"
import "react-widgets/styles.css";
import AnimatedMulti from "@/components/AnimatedMulti"
import Dropzone from "react-dropzone"
import { uploadImg } from "@/features/upload/uploadSlice"
import { X } from "lucide-react"
import { createProduct, resetState } from "@/features/product/productSlice"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import Selects from 'react-select';
import makeAnimated from 'react-select/animated';


let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.array().min(1, "Pick at least one tag").required("Tag is Required"),
  color: Yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});


const AddProduct = () => {

    const dispatch = useDispatch();
    const [color, setColor] = useState([]);
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    //  dispatch
     useEffect(() => {
      dispatch(getBrands());
      dispatch(getColors());
      dispatch(getProductCategorys());
     },[dispatch]);

     
     const brandState = useSelector((state) => state.brand.brands);
     const colorState = useSelector((state) => state.pcolor.color);
     const productCategoryState = useSelector((state) => state.pcategory.productCategorys);
     const imageState = useSelector((state) => state.upload.images);
     const newProduct = useSelector((state) => state.product);
     const {isSuccess, isError, createdProduct} = newProduct;

     useEffect(() => {
      if (isSuccess && createdProduct && img.length > 0) {
        toast.success('Product added successfully');

          navigate("/admin/products")
          
        dispatch(resetState());
      } else if (isError) {
        toast.error('Error adding product');
        dispatch(resetState());
      }
    }, [isSuccess, isError, createdProduct, navigate, dispatch]);

     const colors = colorState.map((color) => ({
      value: color._id,
      label: color.title,
    }));
    const img = imageState.map((image) => ({
      public_id: image.public_id,
      url: image.url,
    }));
    

    useEffect(() => {
      formik.values.color = color;
      formik.values.images = img;
     },[color, img])

    const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        tags: [],
        color: [],
        quantity: "",
        images: [],
      },validationSchema: schema,
      onSubmit: values => {

        if (files.length === 0) {
          toast.error('Please upload at least one image');
          return;
        }

       dispatch(createProduct(values));
      
       formik.handleReset();
       setColor([])
      },
    });

    const handleColorChange = (selectedOptions) => {
      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
      setColor(selectedOptions);
      formik.setFieldValue('color', selectedValues);
    };

    const handleTagsChange = (selectedOptions) => {
      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
      setTags(selectedOptions);
      formik.setFieldValue('tags', selectedValues);
    };


    const handleDrop = (acceptedFiles) => {
      if (files.length + acceptedFiles.length > 5) {
        toast.error('You can only upload up to 5 images.');
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      dispatch(uploadImg(acceptedFiles));
    };

    const tagOptions = [
      'new', 'sale', 'popular', 'featured', 'limited', 'exclusive', 'special'
    ].map(tag => ({ value: tag, label: tag }));
    
  

  return (
    <div>
    <Card className="w-full">
    
      <CardHeader>
        <CardTitle className="text-center">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="title of product"
              name="title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
               />
               {formik.touched.title && formik.errors.title ? (
              <div className='text-xs text-red-500'>{formik.errors.title}</div>
            ) : null}
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="price of product" 
              name="price"
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
              value={formik.values.price} />
            {formik.touched.price && formik.errors.price ? (
              <div className='text-xs text-red-500'>{formik.errors.price}</div>
            ) : null}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">quantity</Label>
              <Input id="quantity" placeholder="quantity of product" 
              name="quantity"
              onChange={formik.handleChange("quantity")}
              onBlur={formik.handleBlur("quantity")}
              value={formik.values.quantity} />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className='text-xs text-red-500'>{formik.errors.quantity}</div>
            ) : null}
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select 
              name="category"
              onValueChange={(value) => formik.setFieldValue('category', value)}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {productCategoryState.map((item,key) => {
                    return (
                      <SelectItem key={key} value={item.title}>{item.title}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category ? (
              <div className='text-xs text-red-500'>{formik.errors.category}</div>
            ) : null}
            </div>

            <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tags">Tags</Label>
                  <Selects
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={tagOptions}
                      value={tags}
                      onChange={handleTagsChange}
                    />
                  {formik.touched.tags && formik.errors.tags ? (
                    <div className='text-xs text-red-500'>{formik.errors.tags}</div>
                  ) : null}
                </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="color">Color</Label>
              <AnimatedMulti 
                  options={colors}
                  value={color}
                  onChange={handleColorChange}
                  onBlur={formik.handleBlur}
                />
              {formik.touched.color && formik.errors.color ? (
              <div className='text-xs text-red-500'>{formik.errors.color}</div>
            ) : null}
            </div>

            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Select 
                name="brand"
                onValueChange={(value) => formik.setFieldValue('brand', value)}
                onBlur={formik.handleBlur("brand")}
                value={formik.values.brand}>

                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {
                    brandState.map((item,key) => {
                     return (
                      <SelectItem key={key} value={item.title}>{item.title}</SelectItem>
                     )
                    })
                  }
                </SelectContent>
              </Select>
              {formik.touched.brand && formik.errors.brand ? (
              <div className='text-xs text-red-500'>{formik.errors.brand}</div>
            ) : null}
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <ReactQuill theme="snow" placeholder="Enter description"
                  name="description"
                  onChange={(content) => formik.setFieldValue('description', content)}
                  value={formik.values.description} />
                {formik.touched.description && formik.errors.description ? (
                  <div className='text-xs text-red-500'>{formik.errors.description}</div>
                ) : null}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="images">Images</Label>
                <Dropzone onDrop={handleDrop} accept="image/*" multiple>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="flex justify-center items-center p-4 border-2 border-dashed border-gray-300 cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p>Drag & drop images here, or click to select files</p>
                    </div>
                  )}
                </Dropzone>
                {files.length > 0 && (
                  <div className="flex flex-wrap mt-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative w-20 h-20 mr-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                          onClick={() => {
                            const updatedFiles = [...files];
                            updatedFiles.splice(index, 1);
                            setFiles(updatedFiles);
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {formik.touched.images && formik.errors.images ? (
                  <div className='text-xs text-red-500'>{formik.errors.images}</div>
                ) : null}
              </div>

          </div>
          <div className="mt-4 w-full">
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-500/80">Add Product</Button>
          </div>
        </form>
      </CardContent>
    </Card>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    </div>
  )
}

export default AddProduct
