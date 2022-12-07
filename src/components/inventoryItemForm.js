import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import useModal from "../hooks/useModal";
import { Button } from "./button";

const newItemSchema = Yup.object().shape({
    name: Yup.string().required().min(1, "Too short"),
    purchaseDate: Yup.date().required(),
    expirationDate: Yup.date(),
    useOrFreezeDate: Yup.date(),
    opened: Yup.boolean(),
    used: Yup.boolean(),
    notes: Yup.string()
});

const updateItemSchema = Yup.object().shape({
    name: Yup.string().min(1),
    purchaseDate: Yup.date(),
    expirationDate: Yup.date(),
    useOrFreezeDate: Yup.date(),
    opened: Yup.boolean(),
    used: Yup.boolean(),
    notes: Yup.string()
});

/**
 * 
 * @param {Object} params 
 * @param {string} params.fieldName - The name of the field (for label and error association)
 * @param {string} params.label - The text of the HTML label for the form field.
 * @param {string} params.type - The input type of the field
 * @param {string} params.fieldAs - How formik should render the field
 * @param {Object} params.container
 * @param {string} params.container.className - The html class string to use for this field's container. Defaults to `"mb-4 flex flex-col"`
 * @param {string} params.field.className - The html class string to use for this field input. Defaults to `"input"`
 * @returns 
 */
const inventoryFormField = (params) => {
    const { 
        fieldName,
        label, 
        type,
        fieldAs
    } = params;

    const containerClass = params.container?.className;
    const fieldClass = params.container?.className;
    if (type === "checkbox") {
        return (
            <div className={`${containerClass || "mb-4 flex flex-col"}`}>
                <div className="flex justify-between">
                    <label htmlFor={fieldName}>{label}</label>
                    <Field id={fieldName} name={fieldName} type="checkbox" className={`${fieldClass || "input"}`} />
                </div>
                <ErrorMessage name={fieldName} />
            </div>
        )
    }
    return (
        <div className={`${containerClass || "mb-4 flex flex-col"}`}>
            <label htmlFor={fieldName}>{label}</label>
            <Field id={fieldName} name={fieldName} type={type || "text"} className={`${fieldClass || "input"}`} as={fieldAs || undefined} />
            <ErrorMessage name={fieldName} />
        </div>
    )
}

export const InventoryItemForm = (props) => {
    const { isShowing, toggle } = useModal();
    const {
        _id,
        name: InventoryItemName,
        purchaseDate,
        expirationDate,
        useOrFreezeDate,
        opened,
        used,
        notes
    } = props;

    const onSubmitUpdate = async (values) => {
        const body = {
            inventoryItemId: _id,
            updateFields: {
                ...values
            }
        }
        const result = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/inventory`, body);
        props.cb && props.cb()
        props.close && props.close()
    }

    const onSubmitNew = async (values) => {
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
        opened: false,
        used: false,
        notes: ""
    } :
        {
            name: InventoryItemName,
            purchaseDate: purchaseDate ? purchaseDate.slice(0, 10) : "",
            expirationDate: expirationDate ? expirationDate.slice(0, 10) : "",
            useOrFreezeDate: useOrFreezeDate ? useOrFreezeDate.slice(0, 10) : "",
            opened: opened ? opened : false,
            used: used ? used: false,
            notes: notes ? notes : ""
        }


    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={async (values) => {
                props.create ? await onSubmitNew(values) : await onSubmitUpdate(values)
            }}
            validationSchema={props.create ? newItemSchema : updateItemSchema}
        >
            <Form className="flex flex-col">
                <section className="flex flex-col mb-4">
                    { inventoryFormField({ fieldName: "name", label: "Item*" }) }
                    { inventoryFormField({ fieldName: "purchaseDate", label: "Purchase Date", type: "date" }) }
                    { inventoryFormField({ fieldName: "expirationDate", label: "Expiration Date", type: "date" }) }
                    { inventoryFormField({ fieldName: "useOrFreezeDate", label: "Use or Freeze Date", type: "date" }) }
                    { inventoryFormField({ fieldName: "notes", label: "Notes", type: "textarea", fieldAs: "textarea" }) }
                    { inventoryFormField({ fieldName: "opened", label: "Has the item been opened?", type: "checkbox" }) }
                    { inventoryFormField({ fieldName: "used", label: "Has the item been used?", type: "checkbox" }) }
                </section>
                <Button type="submit">Save</Button>
            </Form>
        </Formik>
    )
}