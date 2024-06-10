import { useState, useRef, useEffect } from "react";
import CalendarComponent from "@/components/calendar/CalendarComponent";
import { useDispatch } from "react-redux";
import { setUserBooking } from "@/components/slices/dateSlice";
import { AppDispatch } from "@/store";
import { SlotGet } from "@/Models/Slot";
import { slotGetAPI } from "@/Services/SlotService";
import { toast } from "react-toastify";
import BookingForm from "@/components/appointment/BookingForm";
import { ArrowRightFromLine } from "lucide-react";
import { useNavigate } from "react-router";
import CustomerSelect from "@/components/appointment/CustomerSelect";
import { Button } from "@nextui-org/react";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const BookingPageEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [slots, setSlots] = useState<SlotGet[] | null>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotGet | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);

  const getSlots = async (date: string) => {
    slotGetAPI(date)
      .then((res) => {
        if (res?.data) {
          setSlots(res?.data);
        }
      })
      .catch(() => {
        toast.warning("Could not get slot data");
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleBookingCancel = () => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleDateChange = (value: Value) => {
    if (!Array.isArray(value)) {
      setSelectedDate(value);
      setSelectedSlot(null);
      getSlots(String(value?.toLocaleDateString().replace(/\//g, "-")));
    }
  };

  const handleSlotClick = (slot: SlotGet) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = () => {
    if (selectedSlot && selectedDate && selectedCustomer) {
      dispatch(
        setUserBooking({
          date: selectedDate.toString(),
          slot: selectedSlot.slotId.toString(),
          user: selectedCustomer.toString(),
        })
      );
      bookRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleCustomerSelect = (customer: string) => {
    setSelectedCustomer(customer);
    dateRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const isSlotInThePast = (slot: SlotGet): boolean => {
    const [month, day, year] = String(
      selectedDate?.toLocaleDateString().replace(/\//g, "-")
    ).split("-");
    const [hour, minute] = slot.startTime.split(":");
    const slotDateTime = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
    const now = new Date();

    if (!slot.available) {
      return true;
    }
    return slotDateTime < now;
  };

  const renderTimeSlots = () => {
    return slots?.map((slot, index) => {
      const isPast = isSlotInThePast(slot);
      slot.available = !isPast; // Update availability based on the current time
      return (
        <div
          key={index}
          className={`p-2 rounded-md cursor-pointer ${
            slot.available
              ? "bg-custom-pink hover:bg-custom-blue text-white"
              : "bg-custom-gray text-white"
          }`}
          onClick={() => handleSlotClick(slot)}
        >
          {slot.startTime}
        </div>
      );
    });
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  return (
    <div className="bg-cover bg-center min-h-screen w-full overflow-y-hidden">
      <div className="w-full">
        {/* First div */}
        <div
          ref={containerRef}
          className="w-full flex-shrink-0 flex justify-center h-screen"
        >
          <div className="pt-20 flex justify-center">
            <CustomerSelect onSelectCustomer={handleCustomerSelect} />
          </div>
        </div>

        {/* Second div */}
        <div
          ref={dateRef}
          className="w-full flex-shrink-0 flex justify-center h-screen"
        >
          <div className="mt-20 pt-20 flex justify-center">
            <div className="bg-white rounded-md shadow-md p-6 mr-8">
              <CalendarComponent onDateChange={handleDateChange} />
              <Button
                className="mt-4 text-white text-md bg-custom-darkBlue"
                onClick={handleBookingCancel}
              >
                Back To Customer Selection
              </Button>
            </div>
            <div className="bg-white rounded-md shadow-md p-6 max-w-md mx-auto">
              {selectedDate ? (
                <div className="p-6">
                  <div className="flex justify-between items-center gap-5 mb-4">
                    <h2 className="text-lg font-semibold">
                      Available Time Slots
                    </h2>
                    <ArrowRightFromLine
                      className="h-6 w-6 text-gray-500 cursor-pointer transform hover:scale-110"
                      onClick={handleReset}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {renderTimeSlots()}
                  </div>
                  {selectedSlot && (
                    <button
                      className="bg-custom-darkBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={handleBooking}
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-10">
                  <h2 className="text-lg font-semibold">Date Selection </h2>
                  <p className="mt-4">
                    Please select a date to <br />
                    view available time slots.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Third div */}
        <div
          ref={bookRef}
          className="w-full flex-shrink-0 flex justify-center h-screen"
        >
          {selectedDate && selectedSlot && (
            <div className="flex justify-center w-full">
              <BookingForm
                date={selectedDate}
                slot={selectedSlot.slotId}
                userName={String(selectedCustomer)}
                onCancel={handleBookingCancel}
              />
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default BookingPageEmployee;