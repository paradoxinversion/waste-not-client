import { useState } from "react";
import Modal from "../components/modal";
import useModal from "../hooks/useModal";
import { InventoryItemForm } from "../components/inventoryItemForm";
import { Button } from "../components/button";
import axios from "axios";


export const Inventory = (props) => {
    const {isShowing, toggle} = useModal();
    const [inventoryFormCreate, setInventoryFormCreate] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null);
    const { inventory } = props;

    return (
        <div className="overflow-y-auto min-h-1/2 min-w-screen text-blue-50">
            <Modal
                isShowing={isShowing}
                hide={toggle}
            >
                <InventoryItemForm create={inventoryFormCreate} cb={props.getInventory} {...selectedItem}/>
            </Modal>

            <header className="mb-4">
                <h1 className="text-3xl font-bold">Inventory</h1>
            </header>
            <div className="mb-4">
                <Button 
                    onClick={()=>{
                        setInventoryFormCreate(true);
                        toggle();
                }}>
                    New Item
                </Button>
            </div>

            <div>
                {(!inventory || (inventory && inventory.length === "0")) ?
                    <p>No items</p> : 
                    <div>
                        <table className=" table-fixed border-separate border rounded border-slate-500 bg-blue-300 p-2">
                            <thead>

                                <tr>
                                    <th className="border border-slate-600 p-1">Name</th>
                                    <th className="border border-slate-600 p-1">Purchase Date</th>
                                    <th className="border border-slate-600 p-1">Expiration Date</th>
                                    <th className="border border-slate-600 p-1">Use or Freeze Date</th>
                                    <th className="border border-slate-600 p-1">Opened</th>
                                    <th className="border border-slate-600 p-1">Used</th>
                                </tr>
                            </thead>
                            <tbody>

                                {inventory.map(inventoryItem => (
                                    <tr key={inventoryItem._id} className={inventoryItem.expirationDate && new Date(inventoryItem.expirationDate) < new Date(Date.now()) ? "text-red-500" : ""}>
                                        <td className="border border-slate-600 p-1 p-1">{inventoryItem.name}</td>
                                        <td className="border border-slate-600 p-1">{inventoryItem.purchaseDate?.slice(0,10)}</td>
                                        <td className="border border-slate-600 p-1">{inventoryItem.expirationDate?.slice(0,10)}</td>
                                        <td className="border border-slate-600 p-1">{inventoryItem.useOrFreezeDate ? new Date(inventoryItem.useOrFreezeDate).toLocaleDateString() : "---"}</td>
                                        <td className="border border-slate-600 p-1 p-1">{inventoryItem.opened ? "Yes" : "No"}</td>
                                        <td className="border border-slate-600 p-1 p-1">{inventoryItem.used ? "Yes" : "No"}</td>
                                        <td className="border border-slate-600 p-1">
                                            <Button onClick={()=>{
                                                setSelectedItem(inventoryItem);
                                                setInventoryFormCreate(false);
                                                toggle();
                                            }} >
                                                Edit
                                            </Button>
                                            
                                        </td>
                                        <td className="border border-slate-600 p-1">
                                            <Button onClick={async ()=>{
                                                await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/inventory`, {
                                                    inventoryItemId: inventoryItem._id
                                                })
                                                props.getInventory && props.getInventory();
                                            }} >Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}