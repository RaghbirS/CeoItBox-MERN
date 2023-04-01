import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useContext, useState } from 'react';
  import { NavLink } from 'react-router-dom';
  import { uid } from 'uid';
  import { Context } from '../../context';
  
  export default function AddNewData() {
    const [customerName, setCustomerName] = useState("")
    const [salesPerson, setSalesPerson] = useState("")
    const [course, setCourse] = useState("")
    const [coursePrice, setCoursePrice] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState(0)
    const [formula, setFormula] = useState("")
    const [photo, setPhoto] = useState("")
    const [PILink, setPILink] = useState("")
    const [PIDate, setPIDate] = useState("")
    const [checkbox, setCheckbox] = useState("")
    const [welcomeNote, setWelcomeNote] = useState("");
    const { data, setData,userDetails, setNewDataAdded,filteredData,setFilteredData } = useContext(Context);
    
    function handleSubmit() {
      let obj = {
        customerName,
        salesPerson,
        course,
        coursePrice,
        customerEmail,
        customerPhone,
        formula,
        photo,
        PILink,
        PIDate,
        checkbox,
        welcomeNote,
        _id:uid(24)+""
      }
  
      axios.patch(`http://localhost:3001/users/${userDetails._id}`, {
        data: [...data,obj]
      })
      axios.post(`http://localhost:3001/AllData`, {
        ...obj,
        userID: userDetails._id
      })
      setData([...data,obj])
      setFilteredData([...data,obj])
      console.log([...data,obj])
      setNewDataAdded(prev=>!prev);
      setTimeout(() => {
        setNewDataAdded(prev=>!prev);
      }, 200);
    }
    return (
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
  >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Add New Data</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'white'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Customer Name</FormLabel>
                <Input onChange={(e) => setCustomerName(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Sales Person</FormLabel>
                <Input onChange={(e) => setSalesPerson(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Course</FormLabel>
                <Input onChange={(e) => setCourse(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Course Price</FormLabel>
                <Input  onChange={(e) => setCoursePrice(Number(e.target.value))} type="number" />
              </FormControl>
              <FormControl>
                <FormLabel>Customer Email</FormLabel>
                <Input onChange={(e) => setCustomerEmail(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Customer Phone</FormLabel>
                <Input onChange={(e) => setCustomerPhone(Number(e.target.value))} type="number" />
              </FormControl>
              <FormControl>
                <FormLabel>Formula</FormLabel>
                <Input onChange={(e) => setFormula(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Photo</FormLabel>
                <Input onChange={(e) => setPhoto(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>PI Link</FormLabel>
                <Input onChange={(e) => setPILink(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>PI Date</FormLabel>
                <Input onChange={(e) => setPIDate(e.target.value)} type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>Checkbox</FormLabel>
                <Input onChange={(e) => setCheckbox(e.target.value)} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Welcome Note</FormLabel>
                <Input onChange={(e) => setWelcomeNote(e.target.value)} type="text" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                </Stack>
                <NavLink to={"/"}>
                  <Button
                    onClick={handleSubmit}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Submit
                  </Button>
                </NavLink>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  