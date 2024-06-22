import  { useEffect, useState } from 'react';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse  } from "react-icons/bs";
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { AiOutlineDashboard,AiFillProduct } from "react-icons/ai";
import {  Outlet, useNavigate } from 'react-router-dom';
import {  LogOut, Settings, User } from 'lucide-react';
import { MdOutlineAddBusiness,MdCategory } from "react-icons/md";
import { IoColorPaletteOutline} from "react-icons/io5";
import { BsFillDatabaseFill } from "react-icons/bs";
import { IoMdNotificationsOutline  } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import { RiFileList3Fill  } from "react-icons/ri";
import { FaBlog,FaQuestionCircle  } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";
import { Badge } from 'antd';
import { Separator } from './ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';



const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const dispatch = useDispatch()

  // logout handle
 const handleLogout = async () => {
  try {
    await dispatch(logout()).unwrap();
    navigate('/');
  } catch (error) {
    console.error('Failed to logout:', error);
  }
  };

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    setUser(JSON.parse(getUser))
  }, [])

  return (
    <Layout>
    <Sider  trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <h2 className='text-white text-xl text-center py-3 mb-0'>
          <span className='sm-logo font-bold'>M</span>
          <span className='lg-logo'>Themoh</span>
        </h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['']}
        className=' space-y-4'
        onClick={({key}) => {
          if (key == "signout"){ 
            //
          }else{
            navigate(key);
          }
        }}
        items={[
          {
            key: '',
            icon: <AiOutlineDashboard className='w-6 h-6'/>,
            label: 'Dashboard',
          },
          {
            key: 'customer',
            icon: <User className='w-6 h-6'/>,
            label: 'Customer',
          },
          {
            key: 'catalog',
            icon: <BsFillDatabaseFill  className='w-6 h-6' />,
            label: 'Catalog',
            children: [
              {
                key: 'products',
                icon: <AiFillProduct className='w-5 h-5'/>,
                label: 'Product list',
              },
              {
                key: 'products/add-product',
                icon:<MdOutlineAddBusiness className='w-5 h-5'/>,
                label: 'Add Product',
              },
              {
                key: 'product-brands',
                icon: <SiBrandfolder className='w-5 h-5'/> ,
                label: 'Product Brand',
              },
              {
                key: 'product-categorys',
                icon: <MdCategory className='w-5 h-5' />,
                label: 'Product Categorys',
              },
              {
                key: 'product-colors',
                icon:<IoColorPaletteOutline  className='w-5 h-5' />,
                label: 'Product Colors',
              },
            ]
          },
          {
            key: 'orders',
            icon: <RiFileList3Fill className='w-6 h-6'/>,
            label: 'Orders'
          },
          {
            icon: <FaBlog className='w-6 h-6'/>,
            label: 'Blog',
            children:[
              {
                key: 'blogs',
                icon: <GrBlog className='w-6 h-6'/>,
                label: 'Blogs'
              },
              {
                key: 'blog-categorys',
                icon: <MdCategory className='w-6 h-6'/>,
                label: 'Blog Category'
              },
            ]
          },
          {
            key: 'enquiries',
            icon: <FaQuestionCircle  className='w-6 h-6'/>,
            label: 'Enquiries'
          },
        ]}
      />
    </Sider>
    <Layout>
      <Header
        className='flex justify-between items-center'
        style={{
          background: colorBgContainer,
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <BsLayoutSidebarInset /> : <BsLayoutSidebarInsetReverse />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '22px',
            width: 30,
            height: 30,
          }}
        />
        <div className='flex items-center gap-4'>
         <div className='flex items-center gap-4'>
          <div className='flex gap-4 items-center'>
            <div className='mt-3'>
            <Badge count={3} size="small" showZero>
            <IoMdNotificationsOutline  size={25}/>
            </Badge>
            </div>
            <Separator className="h-[35px] w-[1px]" orientation="vertical" />
          </div>
         
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <div className='flex gap-3 items-center hover:bg-gray-200 cursor-pointer h-[63.4px] p-1'>
                  <span className='bg-gray-300 py-1.5 text-muted-foreground px-1.5 rounded-full w-10 h-10 text-center font-bold text-xl'>
                  {user ? getInitials(user.fastname, user.lastname) : 'AZ'}
                  </span>
                    <div>
                    <h5 className='mb-0 text-sm'>{user ? user.fastname: ""}</h5>
                    <p className='mb-0 text-xs'>{user ? user.email: ""}</p>
                    </div>
                </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
         
         </div>
        </div>
      </Header>
      <Content
        style={{
          margin: '0px 4px 16px',
          padding: 4,
          minHeight: 280,
          background: "#f9f7f3",
          borderRadius:borderRadiusLG,
        }}
      >
        <Outlet/>
      </Content>
    </Layout>
  </Layout>
  )
}

export default MainLayout