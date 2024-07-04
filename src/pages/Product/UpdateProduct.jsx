import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "@/features/brand/brandSlice";
import { getColors } from "@/features/ProductColor/colorSlice";
import { getProductCategorys } from "@/features/productCategory/pCategorySlice";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getProductById, resetState, updateProduct } from "@/features/product/productSlice";
import { deleteImg, uploadImg } from "@/features/upload/uploadSlice";
import { X } from "lucide-react";
import AnimatedMulti from "@/components/AnimatedMulti";
import TagsInput from "@/components/TagsInput";
import Dropzone from "react-dropzone";
import "react-widgets/styles.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.array().min(1, "Pick at least one tag").required("Tag is Required"),
  color: Yup.array().min(1, "Pick at least one color").required("Color is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colorOptions, setColorOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getColors());
    dispatch(getProductCategorys());
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const brandState = useSelector((state) => state.brand.brands);
  const colorState = useSelector((state) => state.pcolor.color);
  const productCategoryState = useSelector((state) => state.pcategory.productCategorys);
  const imageState = useSelector((state) => state.upload.images);
  const productState = useSelector((state) => state.product.product);
  const { isSuccess, isError, update } = useSelector((state) => state.product);

  useEffect(() => {
    if (isSuccess && update) {
      toast.success('Product updated successfully');
        navigate("/admin/products");
        dispatch(resetState());
    } else if (isError) {
      toast.error('Error updating product');
      dispatch(resetState());
    }
  }, [isSuccess, isError, update, navigate, dispatch]);

  useEffect(() => {
    if (colorState.length > 0) {
      setColorOptions(colorState.map((color) => ({
        value: color._id,
        label: color.title,
      })));
    }
  }, [colorState]);

  useEffect(() => {
    if (productState) {
      setTags(productState.tags.map(tag => ({ value: tag, label: tag })));
      setImages(productState.images.map(img => ({ public_id: img.public_id, url: img.url })));
      formik.setValues({
        title: productState.title || "",
        description: productState.description || "",
        price: productState.price || "",
        brand: productState.brand || "",
        category: productState.category || "",
        tags: productState.tags || [],
        color: productState.color?._id || [],
        quantity: productState.quantity || "",
        images: productState.images || [],
      });
    }
  }, [productState]);

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
    },
    validationSchema: schema,
    onSubmit: (values) => {
        console.log(values)
        console.log(id)
      if (images.length === 0) {
        toast.error('Please upload at least one image');
        return;
      }
      values.images = images;
      dispatch(updateProduct({ id, data: values }));
      formik.handleReset();
      setTags([]);
    },
  });

  const handleColorChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    formik.setFieldValue('color', selectedValues);
  };

  const handleTagsChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setTags(selectedOptions);
    formik.setFieldValue('tags', selectedValues);
  };

  const handleImageDelete = (publicId) => {
    dispatch(deleteImg(publicId));
    setImages(images.filter(image => image.public_id !== publicId));
  };

  const handleDrop = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
  };

  useEffect(() => {
    if (imageState) {
      setImages(imageState.map(image => ({
        public_id: image.public_id,
        url: image.url
      })));
    }
  }, [imageState]);

  const tagOptions = [
    { value: 'new', label: 'New' },
    { value: 'sale', label: 'Sale' },
    { value: 'popular', label: 'Popular' },
    { value: 'featured', label: 'Featured' },
    { value: 'limited', label: 'Limited' },
    { value: 'exclusive', label: 'Exclusive' },
    { value: 'special', label: 'Special' },
  ];

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Update Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="title of product"
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
                <Input
                  id="price"
                  placeholder="price of product"
                  name="price"
                  onChange={formik.handleChange("price")}
                  onBlur={formik.handleBlur("price")}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className='text-xs text-red-500'>{formik.errors.price}</div>
                ) : null}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="quantity of product"
                  name="quantity"
                  onChange={formik.handleChange("quantity")}
                  onBlur={formik.handleBlur("quantity")}
                  value={formik.values.quantity}
                />
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
                  value={formik.values.category}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {productCategoryState.map((item, key) => (
                      <SelectItem key={key} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.category && formik.errors.category ? (
                  <div className='text-xs text-red-500'>{formik.errors.category}</div>
                ) : null}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tags">Tags</Label>
                <TagsInput
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
                  options={colorOptions}
                  value={colorOptions.filter(color => formik.values.color.includes(color.value))}
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
                  value={formik.values.brand}
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {brandState.map((item, key) => (
                      <SelectItem key={key} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.brand && formik.errors.brand ? (
                  <div className='text-xs text-red-500'>{formik.errors.brand}</div>
                ) : null}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <ReactQuill
                  theme="snow"
                  placeholder="Enter description"
                  name="description"
                  onChange={(content) => formik.setFieldValue('description', content)}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className='text-xs text-red-500'>{formik.errors.description}</div>
                ) : null}
              </div>

              <div className="flex flex-col space-y-1.5 border-dashed border-[1.5px] border-blue-400 bg-white p-5 text-center">
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag & drop some files here, or click to select files</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>

              <div className="flex flex-wrap gap-3">
                {images.map((item, key) => (
                  <div key={key} className="relative">
                    <button onClick={() => handleImageDelete(item.public_id)} className="absolute top-[2px] right-[4px] text-red-500">
                      <X className="w-4" />
                    </button>
                    <img src={item.url} alt="img" width={80} height={80} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 w-full">
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-500/80">Update Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UpdateProduct;
