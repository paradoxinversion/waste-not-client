import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Button } from "./button";

const newItemSchema = Yup.object().shape({
    name: Yup.string().required().min(1, "Too short"),
    purchaseDate: Yup.date().required(),
    expirationDate: Yup.date(),
    useOrFreezeDate: Yup.date(),
});

const updateItemSchema = Yup.object().shape({
    name: Yup.string().min(1),
    purchaseDate: Yup.date(),
    expirationDate: Yup.date(),
    useOrFreezeDate: Yup.date(),
});

export const InventoryItemForm = (props) =>{
    const {
        _id,
        name: InventoryItemName,
        purchaseDate,
        expirationDate,
        useOrFreezeDate
    }= props;

    const onSubmitUpdate = async (values) =>{
        const body = {
            inventoryItemId: _id,
            updateFields:{
                ...values
            }
        }
        const result = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/inventory`, body);
        props.cb && props.cb()
        props.close && props.close()
    }

    const onSubmitNew = async (values) =>{
        const body = {
            createFields: {
                ...values
            }
        }
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/inventory`, body)
        props.cb && props.cb()
        props.close && props.close()
    }

    const initialFormValues = props.create === true ? {
        name: "",
        purchaseDate: "",
        expirationDate: "",
        useOrFreezeDate: "",
    } : 
    {
        name: InventoryItemName,
        purchaseDate: purchaseDate ? purchaseDate.slice(0,10) : "",
        expirationDate: expirationDate ? expirationDate.slice(0,10) : "",
        useOrFreezeDate: useOrFreezeDate ? useOrFreezeDate.slice(0,10) : "",
    }
    

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={async (values)=>{
                props.create ? await onSubmitNew(values) : await onSubmitUpdate(values)
            }}
            validationSchema={props.create ?  newItemSchema : updateItemSchema}
        >
            <Form className="flex flex-col">
                <section className="flex flex-col mb-4">
                    <label htmlFor="name">Item*</label>
                    <Field id="name" name="name" placeholder="name" className="input" />
                    <ErrorMessage name="name" />

                    <label htmlFor="purchaseDate">Purchase Date</label>
                    <Field id="purchaseDate" name="purchaseDate" type="date" className="input" />
                    <ErrorMessage name="purchaseDate" />

                    <label htmlFor="expirationDate">Expiration Date</label>
                    <Field id="expirationDate" name="expirationDate" type="date" className="input" />
                    <ErrorMessage name="expirationDate" />

                    <label htmlFor="useOrFreezeDate">Use or Freeze Date</label>
                    <Field id="useOrFreezeDate" name="useOrFreezeDate" type="date" className="input" />
                    <ErrorMessage name="useOrFreezeDate" />

                    <label htmlFor="opened">Has the item been opened?</label>
                    <Field id="opened" name="opened" type="checkbox" className="input" />
                    <ErrorMessage name="opened" />

                    <label htmlFor="used">Has the item been used?</label>
                    <Field id="used" name="used" type="checkbox" className="input" />
                    <ErrorMessage name="used" />
                </section>

                {/* <button type="submit">Save</button> */}
                <Button type="submit">Save</Button>
            </Form>
        </Formik>
    )
}