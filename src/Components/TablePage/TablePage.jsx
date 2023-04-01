import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Context } from "../../context";
import Filters from "./Filters";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import { ChakraProvider } from "@chakra-ui/react";
import BasicUsage from "./Modal";

export default function TablePage() {
    const { data, setData, isLogin, userDetails, selected, setSelected, filteredData, setFilteredData,editing, setEditing,toast } = useContext(Context);

    function sort(param) {
        const temp = [...data]
        const sortedData = [...temp].sort((a, b) => {
            if (a[param] > b[param]) {
                return 1;
            }
            if (a[param] < b[param]) {
                return -1;
            }
            return 0;
        });
        setFilteredData(sortedData);
    }

    if (!isLogin) return <Navigate to={"/login"} />
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box w={"100%"} h={"150px"} display={"flex"}>
                <ChakraProvider>
                    <Box display={"flex"} alignItems={"center"} h={"100%"} p={"30px"} width={"30%"} gap={"10px"}>
                        <NavLink to={"/addNewData"}>
                            <Button _hover={{ background: "#6262ff" }} color={"white"} background={"#7f7fff"} cursor={"pointer"} display={"flex"} gap={"10px"} alignItems="center" fontWeight={"500"}>
                                <svg style={{ width: "30px", fill: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                                <Text>Add New Data</Text>
                            </Button>
                        </NavLink>
                        <Button disabled={selected.length === 0} _hover={{ background: "#00af00" }} color={"white"} background={"green"} display={editing ? "none" : "flex"} onClick={() => {
                            if (selected.length === 0) {
                                return toast({
                                    title: `Please Select Data to Edit`,
                                    status: "error",
                                    isClosable: true,
                                    position:"top"
                                })
                            }
                            setEditing(true)
                            for (let i of selected) {
                                i.setIsReadOnly(false)
                            }
                        }}>Edit</Button>
                        <Button _hover={{ background: "green" }} color={"white"} background={"lightgreen"} display={editing ? "flex" : "none"} onClick={() => {
                            setEditing(false)
                            if (selected.length === 0) {
                                return toast({
                                    title: `Please Select Data to Edit`,
                                    status: "error",
                                    isClosable: true,
                                    position:"top"
                                })
                            }
                            for (let i of selected) {
                                i.setCheck(false)
                                i.setIsReadOnly(true)
                            }
                            setSelected([])
                            axios.patch(`http://localhost:3001/users/${userDetails._id}`, {
                                data: data
                            })
                            for (let i of data) {
                                axios.patch(`http://localhost:3001/AllData/${i._id}`, {
                                    ...i
                                })
                            }
                            toast({
                                title: `Data Edited Successfully`,
                                status: "success",
                                isClosable: true,
                                position:"top"
                            })
                        }}>Save</Button>
                        {/* <Button _hover={{background:"#ff6868"}} color={"white"} background={"red"} onClick={() => {
                        if(selected.length==0 || editing==true) return
                        for(let i of selected){
                            axios.delete(`http://localhost:3001/AllData/${i._id}`);
                        }
                        let filterData = [...data];
                        for(let i of selected){
                            filterData = filterData.filter(e=>e._id!=i._id)
                        }
                        console.log(filterData)
                        axios.patch(`http://localhost:3001/users/${userDetails._id}`, {
                            data: filterData
                        })
                        setData(filterData)
                        setSelected([])
                    }}>

                        Delete</Button> */}
                        <BasicUsage funcClose={() => {
                            for (let i of selected) {
                                i.setCheck(false)
                                i.setIsReadOnly(true)
                            }
                            setSelected([])
                        }}
                            selected={selected} openModelFunc={()=>{
                                if (selected.length === 0) {
                                    toast({
                                        title: `Please Select Data to Delete`,
                                        status: "error",
                                        isClosable: true,
                                        position:"top"
                                    })
                                    return false
                                }
                                if (editing === true) {
                                    toast({
                                        title: `Cannot Delete while Editing`,
                                        status: "error",
                                        isClosable: true,
                                        position:"top"
                                    })
                                    return false
                                }
                                return true
                            }} onClick={() => {
                                
                                for (let i of selected) {
                                    axios.delete(`http://localhost:3001/AllData/${i._id}`);
                                }
                                let filterData = [...data];
                                for (let i of selected) {
                                    filterData = filterData.filter(e => e._id != i._id)
                                }
                                console.log(filterData)
                                axios.patch(`http://localhost:3001/users/${userDetails._id}`, {
                                    data: filterData
                                })
                                setFilteredData(filterData)
                                setData(filterData)
                                setSelected([])
                                toast({
                                    title: `Data Deleted Successfully`,
                                    status: "success",
                                    isClosable: true,
                                    position:"top"
                                })
                            }}>

                        </BasicUsage>
                    </Box>
                </ChakraProvider>
                <Box h={"100%"} w={"70%"}>
                    <Filters />
                </Box>
            </Box>
            <ChakraProvider>
                <Box display={"flex"} flexDir={"column"} height={"80vh"} overflow="scroll">
                <TableHeader sort={sort} />
                    {
                        filteredData.map((i, index) => (
                            <TableRows toast={toast} key={index + i._id} setData={setData} userDataArr={data} data={i} index={index} />
                        ))
                    }
                </Box>
            </ChakraProvider>
        </Box>
    )
}