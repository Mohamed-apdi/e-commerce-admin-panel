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
import { useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const AddBlog = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e)
    }
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };
  return (
    <div>
    <Card className="w-full">
    
      <CardHeader>
        <CardTitle className=" text-center">Add Blog Detailes</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
            
          <div className="grid w-full items-center gap-4">
          <div className=" space-y-1.5">
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
                </p>
            </Dragger>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="title of your blog" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">technology</SelectItem>
                  <SelectItem value="sveltekit">ai</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className=" space-y-1.5">
            <ReactQuill theme="snow" value={desc} onChange={(e) => handleDesc(e)} placeholder="Enter description" />
            </div>
          </div>
          <div className="mt-4 w-full">
          <Button type="submit" className="w-full">Add Blog</Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}

export default AddBlog