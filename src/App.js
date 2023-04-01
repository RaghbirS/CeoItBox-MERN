import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import AddNewData from "./Components/AddNewData/AddNewData";
import LoginPage from "./Components/LoginPage/LoginPage";
import NavBar from "./Components/Nav/Nav";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import TablePage from "./Components/TablePage/TablePage";
import { Context } from "./context";

function App() {
  const { data,setData, isLogin, userDetails, setFilteredData, toast, newDataAdded } = useContext(Context);
  const { setSalesPersonOptions,
    setCourseOptions,
    setCustomerNameOptions,
    setCustomerEmailOptions } = useContext(Context);
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!isLogin) return
    axios.get(` http://localhost:3001/users/${userDetails._id}`).then(res => {
      console.log(res.data.data)
      setData(res.data.data)
      setFilteredData(res.data.data)
    })
  }, [isLogin])
  useEffect(() => {
    if (count == 1) {
      return setCount(prev => prev + 1)
    }
    if (isLogin) {
      setTimeout(() => {
        toast({
          title: `Login Successful`,
          status: "success",
          isClosable: true,
          position: "top",
        })
      }, 200);
    }
    else {
      toast({
        title: `Logout Successful`,
        status: "success",
        isClosable: true,
        position: "top",
      })
    }
  }, [isLogin]);
  useEffect(()=>{
    if (count == 1) {
      return setCount(prev => prev + 1)
    }
    let temp1 = new Set();
    let temp2 = new Set();
    let temp3 = new Set();
    let temp4 = new Set();
    for (let i of data) {
      temp1.add(i.salesPerson);
      temp2.add(i.course);
      temp3.add(i.customerName);
      temp4.add(i.customerEmail);
    }
    setSalesPersonOptions([...temp1])
    setCourseOptions([...temp2])
    setCustomerNameOptions([...temp3])
    setCustomerEmailOptions([...temp4])
  },[data])

  useEffect(() => {
    if (count == 1) {
      return setCount(prev => prev + 1)
    }
    if (newDataAdded) {
      setTimeout(() => {
        toast({
          title: `New Entry Added Successful`,
          status: "success",
          isClosable: true,
          position: "top",
        })
      }, 200);
    }
  }, [newDataAdded]);

  return (
    <div className="App">
      <ChakraProvider>
        <NavBar />
      </ChakraProvider>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/addNewData" element={<ChakraProvider> <AddNewData /></ChakraProvider>} />
        <Route path="/login" element={<ChakraProvider> <LoginPage /></ChakraProvider>} />
        <Route path="/register" element={<ChakraProvider><RegisterPage /></ChakraProvider>} />
      </Routes>
    </div>
  );
}

export default App;
