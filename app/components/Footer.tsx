export default function Footer() {
  return (
    <footer id="support"className="bg-[#0a0a0a] text-white pt-28 pb-14 px-6 mt-32 border-t border-white/10">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* BRAND */}
          <div>

            <h2 className="text-4xl font-semibold">
              Niels <span className="text-[#E7C58A]">Privé</span>
            </h2>

            <p className="text-white/60 mt-6 leading-relaxed">
              Luxury hospitality platform delivering curated premium stays
              and elegant travel experiences worldwide.
            </p>

          </div>

          {/* COMPANY */}
          <div>

            <h3 className="text-lg font-medium mb-6">
              Company
            </h3>

            <div className="space-y-4 text-white/60">

              <p className="hover:text-white transition cursor-pointer">
                About
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Careers
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Partner With Us
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Press
              </p>

            </div>

          </div>

          {/* SUPPORT */}
          <div >

            <h3 className="text-lg font-medium mb-6">
              Support
            </h3>

            <div className="space-y-4 text-white/60">

              <p className="hover:text-white transition cursor-pointer">
                Help Center
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Cancellation Options
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Refund Support
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Contact Support
              </p>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-lg font-medium mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-white/60">

              <p>
                hello.nielsprive@gmail.com
              </p>

              <p>
                +91 7204157984
              </p>

              <p>
                @nielsprive.co
              </p>

              <p>
                Bangalore, India
              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-white/40 text-sm">
            ©️ 2026 Niels Privé. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-white/40 text-sm">

            <p className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Terms
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Cookies
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}