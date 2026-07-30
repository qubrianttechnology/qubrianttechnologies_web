import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/94722616616?text=Hello%20Qubriant%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project.';

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Qubriant Technologies on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,.32)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
    >
      <MessageCircle size={25} fill="currentColor" className="transition duration-300 group-hover:rotate-6" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-white/10 bg-slate-950/95 px-3 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md sm:block">
        Message us on WhatsApp
      </span>
    </a>
  );
}

export default WhatsAppButton;
