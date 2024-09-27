import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Reset from '../src/pages/Auth/Reset';
import Dashboard from './pages/User/UserDash';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDash';
import AllCourse from './pages/Admin/AllCourse';
import Users from './pages/Admin/Users';
import AddLecture from './pages/Admin/AddLecture';
import Profile from './pages/User/Profile';
import Order from './pages/User/Order';
import Courses from './pages/Courses';
import Payment from './pages/Payment';

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Order />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/All-Course' element={<AllCourse />} />
          <Route path='admin/add-lecture' element={<AddLecture />} />
          <Route path='admin/users' element={<Users />} />  
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Reset' element={<Reset />} />
        <Route path='/about' element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
   
  );
};

export default App;