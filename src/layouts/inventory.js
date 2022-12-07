import React, { useState } from "react";
import Modal from "../components/modal";
import useModal from "../hooks/useModal";
import { InventoryItemForm } from "../components/inventoryItemForm";
import { Button } from "../components/button";
import axios from "axios";


export const Inventory = (props) => {
    const { isShowing, toggle } = useModal();
    const [inventoryFormCreate, setInventoryFormCreate] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null);
    const [showUnexpiredFood, setShowUnexpiredFood] = useState(true)
    const { inventory } = props;

    return (
        <div className="overflow-y-auto">
            <Modal
                isShowing={isShowing}
                hide={toggle}
            >
                <InventoryItemForm
                    create={inventoryFormCreate}
                    close={toggle}
                    cb={props.getInventory}
                    {...selectedItem} />
            </Modal>

            <header className="mb-4 text-cafeAuLait">
                <h1 className="text-3xl font-bold">Inventory</h1>
            </header>
            <div className="mb-4">
                <Button
                    onClick={() => {
                        setInventoryFormCreate(true);
                        toggle();
                    }}>
                    New Item
                </Button>
            </div>
            <div>
                <header>Unexpired Food</header>
                <div className="border rounded border-slate-500 p-2">
                    {inventory.filter(item => !item.used).map(item => (
                        <div key={item._id} className="mb-4 border p-2">
                            <p className="">{item.name}</p>
                            {item.expirationDate && <p className="">Expiration: {item.expirationDate?.slice(0, 10)}</p>}
                            
                            {item.opened && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            <p>{item.notes}</p>
                            <Button additonalStyles="mr-4" onClick={()=>{
                                setSelectedItem(item);
                                setInventoryFormCreate(false);
                                toggle();
                            }}>Edit</Button>
                            <Button onClick={async ()=>{
                                    await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/inventory`, {
                                        data: {
                                            inventoryItemId: item._id
                                        }
                                    })
                                props.getInventory && props.getInventory();
                            }}>Delete</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}