import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context';

const TableHeader = ({ sort }) => {
    const { selected, setSelected } = useContext(Context);
    let arr;
    let [selectAll, setSelectAll] = useState(false)
    useEffect(() => {
        arr = document.querySelectorAll(".select");
    })
    return (
        <Box display={"flex"} minW={"100%"}>
            <Box flexShrink={0}  cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"} w={"90px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !selectAll;
                if (value) {
                    for (let i of arr) {
                        i.click()
                    }
                }
                else {
                    for (let i of selected) {
                        i.setCheck(false)
                        i.setIsReadOnly(true)
                    }
                    setSelected([])
                }
                console.log(selected)
                setSelectAll(value)
            }}>Checkbox</Box>
            <Box flexShrink={0} w={"90px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Record</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("customerName")}>Customer Name</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("salesPerson")}>Sales Person</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("course")}>Course</Box>
            <Box flexShrink={0} w={"90px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("coursePrice")}>Course Price</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("customerEmail")}>Customer Email</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("customerPhone")}>Customer Phone</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("formula")}>Formula</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("photo")}>Photo</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("PILink")}>PI Link</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("PIDate")}>PI Date</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Checkbox</Box>
            <Box flexShrink={0} w={"150px"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"30px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("welcomeNote")}>Welcome Note</Box>
        </Box>
    )
}

export default TableHeader