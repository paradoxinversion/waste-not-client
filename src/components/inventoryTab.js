import React, { useState } from "react";
import { Button } from "./button";
import axios from "axios";
const InventoryTab = ({
  tabName,
  inventory,
  inventoryFilter,
  setSelectedItem,
  setInventoryFormCreate,
  toggle,
  getInventory,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div className="border rounded p-2 mb-8 bg-gray-200">
      <header>
        <p className="text-lg" onClick={toggleCollapsed}>{tabName}</p>
      </header>
      {!collapsed &&
      
        <div className="">
          {inventory
            .filter((item) => {
              let pass = true;
              if (inventoryFilter.includes("unexpired") && (item.expirationDate > new Date(Date.now()) || !!item.expirationDate)){
                pass = false;
              }
              if (inventoryFilter.includes("unused") && item.used) {
                pass = false;
              }
              if (inventoryFilter.includes("used") && !item.used) {
                pass = false;
              }
              return pass;
            })
            .map((item) => (
              <div key={item._id} className="mb-4 rounded border-slate-400 p-2 bg-gray-100 text-slate-700">
                <p className="">{item.name}</p>
                {item.expirationDate && (
                  <p className="text-sm">
                    Expiration: {item.expirationDate?.slice(0, 10)}
                  </p>
                )}
                {item.useOrFreezeDate && (
                  <p className="text-sm">
                    Use or Freeze By: {item.useOrFreezeDate?.slice(0, 10)}
                  </p>
                )}
                <p className="text-sm">{item.opened ? "Opened" : "Closed/Sealed"}</p>
                {item.notes &&
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Notes</p>
                    <p className="text-sm italic text-slate-500">{item.notes}</p>
                  </div>
                }
                <Button
                  additonalStyles="mr-4"
                  onClick={() => {
                    setSelectedItem(item);
                    setInventoryFormCreate(false);
                    toggle();
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={async () => {
                    await axios.delete(
                      `${process.env.REACT_APP_API_URL}/api/v1/inventory`,
                      {
                        data: {
                          inventoryItemId: item._id,
                        },
                      }
                    );
                    getInventory && getInventory();
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
      }
    </div>
  );
};

export default InventoryTab;
