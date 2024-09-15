import { useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import { Button } from "../shadcn/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../shadcn/ui/dialog";
import axios from "axios";
import { BACKEND_URL } from "../config";


type Turf = {
  id: number;
  turfName: string;
  area: string;
  city: string;
  likes: number;
  state: string;
  images: string,
  adminId: number;
  Sports: string[];
};

type Slot = {
  id: number[];
  date: string;
  slot: string[];
  price: number[];
  turfId: number;
};

type Slots = Slot[];

const temp: Slot = {
  id: [0],
  date: "",
  slot: [""],
  price: [0],
  turfId: 0,
};

export function Details() {
  const [isEditTurfOpen, setIsEditTurfOpen] = useState(false);
  const [isEditSlotOpen, setIsEditSlotOpen] = useState(false);
  const [isAddSlotOpen,setIsAddSlotOpen]=useState(false)

  const [slotToEdit, setSlotToEdit] = useState<Slot>(temp);
  const [newSlot, setNewSlot] = useState<Slot>(temp);
  const [turfSlots, setTurfSlots] = useState<Slots>([]);

  const [turfDetails, setTurfDetails] = useState<Turf>();
  const [newTurfDetails, setNewTurfDetails] = useState<Turf>();



  useEffect(() => {
    let final = new Date().toISOString().split("T")[0];
    axios.get(`${BACKEND_URL}/api/admin/getTurf?filter=${final}`, {
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
      })
      .then((data) => {
        temp.turfId=data.data.turf.id
        console.log(data.data)
        setTurfDetails(data.data.turf);
        setTurfSlots(data.data.turfSlots);
      });
  }, []);

  const handleSaveTurfDetails = async () => {
    await axios.post(
      `${BACKEND_URL}/api/admin/updateTurfDetails`,
      {
        details: newTurfDetails,
      },
      {
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
      }
    );
    setTurfDetails(newTurfDetails);
    setIsEditTurfOpen(false);
  };

  const handleSaveSlot = async () => {
    console.log(slotToEdit)
    await axios.post(
      `${BACKEND_URL}/api/admin/updateTurfSlots`,
      {
        slot: slotToEdit,
      },
      {
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
      }
    );
    setTurfSlots(turfSlots.map((slot) => (slot.date === slotToEdit.date ? slotToEdit : slot)));
    setIsEditSlotOpen(false);
  };

  const handleAddSlot = async () => {
    console.log(newSlot)
     await axios.post(
      `${BACKEND_URL}/api/admin/addTurfSlots`,
      {
        slots: newSlot,
      },
      {
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
      }
    );
    setTurfSlots([...turfSlots, newSlot]);
    setNewSlot(temp);

    setIsAddSlotOpen(false)
    // window.location.reload()
  };

  if (!turfDetails) {
    return <></>;
  }

  return (
    <>
      <NavBar val="home" />
      <div className="w-full mt-16">
        <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
          <img src={turfDetails.images[0]} alt="Turf Field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{turfDetails.turfName}</h1>
          </div>
        </section>
        <div className= "bg-white">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">Turf Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <span className="text-sm text-black">Turf Name</span>
                  <span className="font-medium ">{turfDetails.turfName}</span>
                </div>
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground ">Area</span>
                  <span className="font-medium ">{turfDetails.area}</span>
                </div>
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground ">City</span>
                  <span className="font-medium " >{turfDetails.city}</span>
                </div>
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground ">State</span>
                  <span className="font-medium ">{turfDetails.state}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <Button size="lg" onClick={() => setIsEditTurfOpen(true)}>
                Edit
              </Button>
              <Dialog open={isEditTurfOpen}>
                <DialogContent>
                  <DialogTitle>Edit Turf Details</DialogTitle>
                  <DialogDescription>Update the details of the turf below.</DialogDescription>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-1">
                      <span className="text-sm text-muted-foreground">Turf Name</span>
                      <input
                        type="text"
                        placeholder={turfDetails.turfName}
                        onChange={(e) => setNewTurfDetails({ ...turfDetails, turfName: e.target.value })}
                        className="border p-2 rounded"
                      />
                    </div>
                    <div className="grid gap-1">
                      <span className="text-sm text-muted-foreground">Area</span>
                      <input
                        type="text"
                        placeholder={turfDetails.area}
                        onChange={(e) => setNewTurfDetails({ ...turfDetails, area: e.target.value })}
                        className="border p-2 rounded"
                      />
                    </div>
                    <div className="grid gap-1">
                      <span className="text-sm text-muted-foreground">City</span>
                      <input
                        type="text"
                        placeholder={turfDetails.city}
                        onChange={(e) => setNewTurfDetails({ ...turfDetails, city: e.target.value })}
                        className="border p-2 rounded"
                      />
                    </div>
                    <div className="grid gap-1">
                      <span className="text-sm text-muted-foreground">State</span>
                      <input
                        type="text"
                        placeholder={turfDetails.state}
                        onChange={(e) => setNewTurfDetails({ ...turfDetails, state: e.target.value })}
                        className="border p-2 rounded"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setIsEditTurfOpen(false)}>Back</Button>
                    <Button onClick={handleSaveTurfDetails}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Available Slots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {turfSlots.map((slot, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-medium">{slot.date}</div>
                  <Button size="sm" onClick={() => {setIsEditSlotOpen(true); setSlotToEdit(slot);}}>
                    Edit
                  </Button>
                </div>
                <div className="space-y-1">
                  {slot.slot.map((slotTime, idx) => (
                    <div key={idx} className="flex justify-between p-2">
                      <span className="col-span-1 ">{slotTime}</span>
                      <span className="col-span-1">{slot.price[idx]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            
            <Dialog open={isEditSlotOpen}>
              <DialogContent>
                <DialogTitle>Edit/Add Slot</DialogTitle>
                <DialogDescription>Enter the date and its slots with prices.</DialogDescription>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-1">
                    <span className="text-lg font-bold">Date  {slotToEdit.date}</span>
                    
                  </div>
                  <div className="grid gap-1">
                    <span className="text-sm text-muted-foreground">Slots</span>
                    
                    {slotToEdit.slot.map((slotTime, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={slotTime}
                          onChange={(e) => {
                            const updatedSlots = slotToEdit.slot.map((time, sidx) =>
                              sidx === idx ? e.target.value : time
                            );
                            setSlotToEdit({ ...slotToEdit, slot: updatedSlots });
                          }}
                          className="border p-2 rounded flex-1"
                        />
                        <input
                          type="text"
                          value={slotToEdit.price[idx]}
                          onChange={(e) => {
                            const updatedPrices = slotToEdit.price.map((price, sidx) =>
                              sidx === idx ? Number(e.target.value) : price
                            );
                            setSlotToEdit({ ...slotToEdit, price: updatedPrices });
                          }}
                          className="border p-2 rounded w-20"
                        />
                      </div>
                    ))}
                    
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsEditSlotOpen(false)}>Back</Button>
                  <Button onClick={handleSaveSlot}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-8">
          <Button size={"lg"} className="text-lg" onClick={()=>{setIsAddSlotOpen(true)}}>Add New Date</Button>
            <Dialog open={isAddSlotOpen}>
              
              <DialogContent>
                <DialogTitle>Add New Date</DialogTitle>
                <DialogDescription>
                  Enter the new date and its slots.
                </DialogDescription>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-1">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <input
                      type="date"
                      value={newSlot.date}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, date: e.target.value })
                      }
                      className="border p-2 rounded"
                    />
                  </div>
                  <div className="grid gap-1">
                    <span className="text-sm text-muted-foreground">Slots</span>
                    {newSlot.slot.map((timeSlot, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={timeSlot}
                          onChange={(e) => {
                            const updatedSlots = newSlot.slot.map((slot, sidx) =>
                              sidx === idx ? e.target.value : slot
                            );
                            setNewSlot({ ...newSlot, slot: updatedSlots });
                          }}
                          className="border p-2 rounded flex-1"
                        />
                        <input
                          type="text"
                          value={newSlot.price[idx]}
                          onChange={(e) => {
                            const updatedPrice = newSlot.price.map((price, sidx) =>
                              sidx === idx ? Number(e.target.value) : price
                            );
                            setNewSlot({ ...newSlot, price: updatedPrice });
                          }}
                          className="border p-2 rounded flex-1"
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setNewSlot({ ...newSlot, slot: [...newSlot.slot, ""],price:[...newSlot.price,0] })
                      }
                    >
                      Add Slot
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                <Button onClick={()=>{setIsAddSlotOpen(false)}}>Back</Button>
                  <Button onClick={handleAddSlot}>Add Date</Button>
                  
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          </section>
          </div>
      </div>
        
    </>
  );
}
