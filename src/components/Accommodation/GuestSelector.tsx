interface GuestSelectorType {
  onGuestSelect: (guestNumber: number) => void;
  setGuestOpen: (open: boolean) => void;
}

const GuestSelector = ({ onGuestSelect, setGuestOpen }: GuestSelectorType) => {
  const guestNumbers = [1, 2, 3, 4, 5, 6];

  const handleGuestClick = (number: number) => {
    onGuestSelect(number);
    setGuestOpen(false);
  };

  return (
    <div className="guest-selector">
      {guestNumbers.map((number) => (
        <div className="guest-number" onClick={() => handleGuestClick(number)} key={number}>
          {number}명
        </div>
      ))}
    </div>
  );
};

export default GuestSelector;
