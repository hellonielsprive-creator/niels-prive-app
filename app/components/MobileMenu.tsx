interface MobileMenuProps {
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
}

export default function MobileMenu({
  mobileMenu,
  setMobileMenu,
}: MobileMenuProps) {

  if (!mobileMenu) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col p-8">

      <div className="flex items-center justify-between mb-10">

        <h2 className="text-3xl font-semibold">
          Menu
        </h2>

        <button
          onClick={() => setMobileMenu(false)}
          className="text-4xl"
        >
          ✕
        </button>

      </div>

      <div className="flex flex-col gap-6 text-xl">

        <button>Sign In</button>
        <button>Create Account</button>
        <button>My Trips</button>
        <button>Saved Hotels</button>
        <button>Destinations</button>
        <button>Hotel Dashboard</button>
        <button>Partner With Us</button>
        <button>Support</button>

      </div>

    </div>
  );
}