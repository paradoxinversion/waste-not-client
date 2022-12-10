import React, { useState } from "react";
import Modal from "../components/modal";
import useModal from "../hooks/useModal";
import { InventoryItemForm } from "../components/inventoryItemForm";
import { Button } from "../components/button";
import axios from "axios";
import InventoryTab from "../components/inventoryTab";

export const Inventory = (props) => {
  const { isShowing, toggle } = useModal();
  const [inventoryFormCreate, setInventoryFormCreate] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUnexpiredFood, setShowUnexpiredFood] = useState(true);
  const { inventory } = props;

  return (
    <div className="overflow-y-auto">
      <Modal isShowing={isShowing} hide={toggle}>
        <InventoryItemForm
          create={inventoryFormCreate}
          close={toggle}
          cb={props.getInventory}
          {...selectedItem}
        />
      </Modal>

      <header className="mb-4">
        <h1 className="text-xl font-bold">Inventory</h1>
      </header>
      <div className="mb-4">
        <Button onClick={()=>{
            setInventoryFormCreate(true);
            toggle();
        }}>

            <div>

                New Item
            </div>
        </Button>
      </div>
      <div>

        <InventoryTab
            tabName="Unexpired Food"
            inventory={inventory}
            inventoryFilter={["unexpired", "unused"]}
            setSelectedItem={setSelectedItem}
            setInventoryFormCreate={setInventoryFormCreate}
            toggle={toggle}
            getInventory={props.getInventory}
        />
        <InventoryTab
            tabName="Used Items"
            inventory={inventory}
            inventoryFilter={["used"]}
            setSelectedItem={setSelectedItem}
            setInventoryFormCreate={setInventoryFormCreate}
            toggle={toggle}
            getInventory={props.getInventory}
        />
        <InventoryTab
            tabName="Full Inventory"
            inventory={inventory}
            inventoryFilter={[]}
            setSelectedItem={setSelectedItem}
            setInventoryFormCreate={setInventoryFormCreate}
            toggle={toggle}
            getInventory={props.getInventory}
        />
      </div>
    </div>
  );
};
