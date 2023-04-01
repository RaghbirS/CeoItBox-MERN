import { Box, Button, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";


export default function TableRows({ data, userDataArr, setData, toast
}) {
    const { selected, setSelected, editing } = useContext(Context);
    const [check, setCheck] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const { customerName, customerPhone, salesPerson, course, coursePrice, customerEmail, formula, photo, PILink, PIDate, checkbox, welcomeNote, _id } = data;
    const [customerNameValue, setCustomerNameValue] = useState(customerName);
    const [salesPersonValue, setSalesPersonValue] = useState(salesPerson);
    const [courseValue, setCourseValue] = useState(course);
    const [coursePriceValue, setCoursePriceValue] = useState(coursePrice);
    const [customerEmailValue, setCustomerEmailValue] = useState(customerEmail);
    const [customerPhoneValue, setCustomerPhoneValue] = useState(customerPhone);
    const [formulaValue, setFormulaValue] = useState(formula);
    const [photoValue, setPhotoValue] = useState(photo);
    const [PILinkValue, setPILinkValue] = useState(PILink);
    const [PIDateValue, setPIDateValue] = useState(PIDate);
    const [checkboxValue, setCheckboxValue] = useState(checkbox);
    const [welcomeNoteValue, setWelcomeNoteValue] = useState(welcomeNote);

    useEffect(() => {
        let editedObject = {
            customerName: customerNameValue
            , salesPerson: salesPersonValue
            , course: courseValue
            , coursePrice: coursePriceValue
            , customerEmail: customerEmailValue
            , customerPhone: customerPhoneValue
            , formula: formulaValue
            , photo: photoValue
            , PILink: PILinkValue
            , PIDate: PIDateValue
            , checkbox: checkboxValue
            , welcomeNote: welcomeNoteValue
            , _id: _id
        }
        let temp = [...userDataArr];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]._id === _id) {
                temp[i] = editedObject;
                break
            }
        }
        setData(temp)
    }, [customerNameValue, salesPersonValue, courseValue, customerPhoneValue
        , coursePriceValue, customerEmailValue, formulaValue, photoValue, PILinkValue, PIDateValue, checkboxValue, welcomeNoteValue])
    return (
        <Box display={"flex"} minW={"100%"} background={check ? "lightgreen" : "none"}>
            <Box flexShrink={0} overflow={"hidden"} borderRadius={"none"} h={"30px"} type={"checkbox"} w={"90px"} border={"1px solid #dee2e6"} textAlign={"center"} >
                <Button className="select" h={"30px"} w={"90px"} onClick={e => {
                    if (editing) {
                        return toast({
                            title: `Cannot Select or Unselect while Editing`,
                            status: "error",
                            isClosable: true,
                            position: "top"
                        })
                    }
                    let value = !check;
                    if (value) {
                        setSelected(prev => [...prev, { _id, isReadOnly, setIsReadOnly, check, setCheck }])
                    }
                    else {
                        setSelected(selected.filter((i) => i._id !== _id))
                    }
                    setCheck(value)
                }
                }>
                    <input onChange={(e) => console.log()} type={"checkbox"} checked={check} />

                </Button>
            </Box>
            <Input flexShrink={0} w={"90px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} borderRadius={"none"} h={"30px"} border={"2px solid #dee2e6"}></Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setCustomerNameValue(e.target.value)} borderRadius={"none"} h={"30px"} value={customerNameValue} border={"2px solid #dee2e6"}></Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setSalesPersonValue(e.target.value)} borderRadius={"none"} h={"30px"} value={salesPersonValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setCourseValue(e.target.value)} borderRadius={"none"} h={"30px"} value={courseValue} border={"2px solid #dee2e6"}></Input>
            <Input flexShrink={0} w={"90px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setCoursePriceValue(Number(e.target.value))} type={"number"} borderRadius={"none"} h={"30px"} value={coursePriceValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setCustomerEmailValue(e.target.value)} borderRadius={"none"} h={"30px"} value={customerEmailValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setCustomerPhoneValue(Number(e.target.value))} type={"number"} borderRadius={"none"} h={"30px"} value={customerPhoneValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setFormulaValue(e.target.value)} borderRadius={"none"} h={"30px"} value={formulaValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setPhotoValue(e.target.value)} borderRadius={"none"} h={"30px"} value={photoValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setPILinkValue(e.target.value)} borderRadius={"none"} h={"30px"} value={PILinkValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setPIDateValue(e.target.value)} borderRadius={"none"} h={"30px"} type={"date"} value={PIDateValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setCheckboxValue(e.target.value)} borderRadius={"none"} h={"30px"} value={checkboxValue} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"150px"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setWelcomeNoteValue(e.target.value)} borderRadius={"none"} h={"30px"} value={welcomeNoteValue} border={"2px solid #dee2e6"}>{ }</Input>
        </Box>
    )
}